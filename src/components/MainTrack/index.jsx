import React, { memo, useState } from "react";
import { Button } from 'antd';
import Switch from '@/components/Switch'
import { LS } from '@/util'
import './index.scss'

function MainTrackComponent(props) {
  const { mainTracks, setFlash, flash } = props;
  const [selectAudioUrl, setSelect] = useState([]);
  const deleteAudios = () => {
    const newTracks = mainTracks.filter(track => {
      return !selectAudioUrl.includes(track.url)
    })
    LS.setItem('mainTrack', newTracks);
    setFlash(!flash)
  }


  return (
    <div className={`main-track-container `}>
      <div className="main-track-header">
        <span className="title">主音轨</span>
        <span className="delete-main-track">
          <Button type="primary" danger onClick={deleteAudios}>删除</Button>
        </span>
      </div>
      <div className="main-track-content">
        {mainTracks.map(track => {
          return (
            <Switch
              key={track.url}
              src={track.url}
              name={track.name}
              selectAudioUrl={selectAudioUrl}
              setSelect={setSelect}
            />
          )
        })}
      </div>
    </div>
  )
}

export default memo(MainTrackComponent);