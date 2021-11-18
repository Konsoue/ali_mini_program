import React, { useState, useMemo, memo } from "react";
import { useNavigate } from 'react-router-dom';
import { Progress, Checkbox, Card } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.scss'


function Panel(props) {
  const { name, url } = props;
  const [percent, setPercent] = useState(0);
  const changePercent = (e) => {
    const event = e || window.event;
    const res = event.target.currentTime / event.target.totalTime;
    setPercent(res);
  }

  return (
    <div>
      <p style={{ textAlign: 'center' }}>{name}</p>
      <Progress percent={percent} />
      <audio src={url} onTimeUpdate={changePercent} />
    </div>
  )
}

function SubTrack(props) {
  const [playing, setPlaying] = useState(false);
  const { subTrack: { url, name } } = props;

  const playBtn = useMemo(() => {
    return playing ?
      <PauseCircleOutlined onClick={() => setPlaying(!playing)} />
      : <PlayCircleOutlined onClick={() => setPlaying(!playing)} />
  }, [playing])

  const deleteViceMusic = (e) => {
    console.log(e);
  }

  return (
    <Card
      actions={[
        <Checkbox key={url} value={url} />,
        playBtn,
        <DeleteOutlined key={url} data-url={url} onClick={deleteViceMusic} />
      ]}
    >
      <Panel url={url} name={name} />
    </Card>
  )
}

export default memo(SubTrack);