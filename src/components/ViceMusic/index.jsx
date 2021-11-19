import React, { useState } from "react";
import { Checkbox, Card, Button, message } from 'antd'
import ViceTitle from "./ViceTitle";
import SubTrack from "./SubTrack";
import { SS } from '@/util'
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

  const handleChange = (checkedValue) => {
    setSelect(checkedValue);
  }
  const viceMusicArr = SS.getItem('audio') || [];

  const handleMergeAudio = () => {
    if (!selectSubTrack.length) {
      message.destroy()
      message.info(tips.subTrack);
      return;
    }
    setVisible(true)
  }

  return (
    <div className="vice-music-container">
      <Card
        style={{ height: '100%' }}
        title={<ViceTitle />}
        actions={[
          <Button type="primary" danger><DeleteOutlined />删除</Button>,
          <Button className='btn-success' onClick={handleMergeAudio} loading={visible} ><FullscreenExitOutlined />合成</Button>
        ]}
      >
        <div className="vice-music-panel">
          <Group onChange={handleChange}>
            {
              viceMusicArr.map((_, i) => {
                return (
                  <SubTrack {...props} subTrack={_} index={i} key={JSON.stringify(_)} />
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
      />
    </div>
  )
}

export default ViceMusic;