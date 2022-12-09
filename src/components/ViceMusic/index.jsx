import React, { useState, useEffect } from "react";
import { Checkbox, Card, Button, message } from 'antd'
import ViceTitle from "./ViceTitle";
import SubTrack from "./SubTrack";
import { audioDB } from '@/util'
import WriteModal from "./WriteModal";
import './index.scss'
import {
  DeleteOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
const tips = {
  merge: '合并成功',
  subTrack: '请选择副音轨',
}
const { Group } = Checkbox;

function ViceMusic(props) {
  const [selectSubTrack, setSelect] = useState([])
  const [visible, setVisible] = useState(false);
  const [viceMusicArr, setViceMusic] = useState([]);
  const { flash, setFlash } = props;
  const handleChange = (checkedValue) => {
    setSelect(checkedValue);
  }

  useEffect(() => {
    // 释放已有链接
    for (let url of Object.entries(audioDB.urls.subTrack)) URL.revokeObjectURL(url);
    audioDB.subTrack.getAll('subTrack').then(tracks => {
      tracks.forEach(track => {
        track.url = URL.createObjectURL(track.blob);
        audioDB.urls.subTrack[track.name] = track.url;
      })
      setViceMusic(tracks);
    }).catch(err => console.error(err))
  }, [flash])

  const handleMergeAudio = () => {
    if (!selectSubTrack.length) {
      message.destroy()
      message.info(tips.subTrack);
      return;
    }
    setVisible(true)
  }

  const handleDeleteAudio = () => {
    if (!selectSubTrack.length) {
      message.destroy()
      message.info(tips.subTrack);
      return;
    }
    const newTracks = viceMusicArr.filter(track => {
      URL.revokeObjectURL(audioDB.urls.subTrack[track.name] || '');
      return !selectSubTrack.map(item => item.url).includes(track.url)
    })
    audioDB.subTrack.clear('subTrack');
    newTracks.forEach(track => {
      const newTracks = {
        name: track.name,
        blob: track.blob
      }
      audioDB.subTrack.add('subTrack', newTracks)
    })
    setFlash(!flash);
  }

  return (
    <div className="vice-music-container">
      <Card
        style={{ height: '100%' }}
        title={<ViceTitle />}
        actions={[
          <Button type="primary" danger onClick={handleDeleteAudio} ><DeleteOutlined />删除</Button>,
          <Button className='btn-success' onClick={handleMergeAudio} loading={visible} ><FullscreenExitOutlined />合成</Button>
        ]}
      >
        <div className="vice-music-panel">
          <Group onChange={handleChange}>
            {
              viceMusicArr.map((_, i) => {
                return (
                  <SubTrack {...props} subTrack={_} index={i} key={JSON.stringify(_.name)} />
                )
              })
            }
          </Group>
        </div>
      </Card>
      <WriteModal
        {...props}
        selectSubTrack={selectSubTrack}
        setVisible={setVisible}
        visible={visible}
        tips={tips}
        subTracks={viceMusicArr}
      />
    </div>
  )
}

export default ViceMusic;