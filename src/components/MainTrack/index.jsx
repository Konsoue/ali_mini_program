import React, { memo, useState } from "react";
import { Button, message } from 'antd';
import Switch from '@/components/Switch'
import { SS } from '@/util'
import './index.scss'
import DownModal from './DownModal'
import {
  DeleteOutlined,
} from '@ant-design/icons';

function MainTrackComponent(props) {
  const { mainTracks, setFlash, flash } = props;
  const [visible, setVisible] = useState(false);
  const [selectAudioName, setSelect] = useState([]);
  const deleteAudios = () => {
    if (!selectAudioName.length) {
      message.info('请选择要删除的主音轨');
      return;
    }
    const newTracks = mainTracks.filter(track => {
      return !selectAudioName.includes(track.name)
    })
    SS.setItem('mainTrack', newTracks);
    setFlash(!flash)
  }

  return (
    <div className={`main-track-container `}>
      <div className="main-track-header">
        <span className="title">主音轨</span>
        {/* <span className="download-main-track">
          <Button type="primary" onClick={() => setVisible(true)}>下载主音轨</Button>
        </span> */}
        <span className="delete-main-track">
          <Button type="primary" danger onClick={deleteAudios}><DeleteOutlined />删除主音轨</Button>
        </span>
        <DownModal
          visible={visible}
          setVisible={setVisible}
          mainTracks={mainTracks}
          selectAudioName={selectAudioName}
        />
      </div>
      <div className="main-track-content">
        {mainTracks.map(track => {
          return (
            <Switch
              key={track.name}
              urls={track.urls}
              name={track.name}
              selectAudioName={selectAudioName}
              setSelect={setSelect}
            />
          )
        })}
      </div>

    </div>
  )
}

export default memo(MainTrackComponent);