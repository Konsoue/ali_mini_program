import React, { useState, memo, createRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Progress, Checkbox, Card } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { SS } from '@/util'
import './index.scss'


function Panel(props) {
  const { name, percent } = props;

  return (
    <div className="panel-container">
      <p style={{ textAlign: 'center' }}>{name}</p>
      <div><Progress percent={percent} /></div>
    </div>
  )
}

function PlaySong(props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = createRef(null);
  const { url, setPercent } = props;

  const changePercent = (e) => {
    const event = e || window.event;
    const res = Math.floor(event.target.currentTime / event.target.duration * 100);
    setPercent(res);
  }

  return (
    <div>
      {
        playing ?
          <PauseCircleOutlined onClick={() => { setPlaying(false); audioRef.current.pause(); }} />
          : <PlayCircleOutlined onClick={() => { setPlaying(true); audioRef.current.play(); }} />
      }
      <audio ref={audioRef} src={url} onTimeUpdate={changePercent} onEnded={() => { setPlaying(false); }} />
    </div>
  )
}

function SubTrack(props) {
  const { subTrack: { url, name }, flash, setFlash } = props;
  const [percent, setPercent] = useState(0);

  const deleteViceMusic = (e, url) => {
    const subTracks = SS.getItem('audio');
    const newTracks = subTracks.filter(track => track.url !== url);
    SS.setItem('audio', newTracks);
    setFlash(!flash)
  }

  return (
    <Card
      actions={[
        <Checkbox key={url} value={url} />,
        <PlaySong url={url} setPercent={setPercent} />,
        <DeleteOutlined key={url} data-url={url} onClick={(e) => { deleteViceMusic(e, url) }} />
      ]}
    >
      <Panel url={url} name={name} percent={percent} />
    </Card>
  )
}

export default memo(SubTrack);