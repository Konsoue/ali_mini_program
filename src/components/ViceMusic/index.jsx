import React, { useState } from "react";
import { Checkbox, Card, Button, Modal, Input, message } from 'antd'
import ViceTitle from "./ViceTitle";
import SubTrack from "./SubTrack";
import Crunker from 'crunker';
import { LS } from '@/util'
import './index.scss'
import {
  DeleteOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
const tips = {
  'merge': '合并成功'
}
const { Group } = Checkbox;

function WriteModal(props) {
  const { visible, setVisible, selectSubTrack } = props;
  const [name, setName] = useState('');

  const handleOk = async () => {
    const crunker = new Crunker();
    const buffers = await crunker.fetchAudio(...selectSubTrack)
    const merged = crunker.mergeAudio(buffers);
    const output = crunker.export(merged, 'audio/mp3');
    const mainTrack = LS.getItem('mainTrack');
    if (mainTrack) {
      LS.setItem('mainTrack', [...mainTrack, { url: output.url, name, }])
    } else {
      LS.setItem('mainTrack', [{ url: output.url, name, }])
    }
    setVisible(false);
    message(tips.merge)
  }
  const handleCancel = () => {
    setVisible(false);
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setName(value)
  }

  return (
    <Modal visible={visible} maskClosable={false} onCancel={handleCancel} onOk={handleOk}>
      输入主音轨的名称：<Input onChange={handleChange}></Input>
    </Modal>
  )
}

function ViceMusic(props) {
  const [selectSubTrack, setSelect] = useState([])
  const [visible, setVisible] = useState(false);

  const handleChange = (checkedValue) => {
    setSelect(checkedValue);
  }

  // const viceMusicArr = LS.getItem('subTrack') || [];
  const viceMusicArr = JSON.parse(localStorage.getItem('audio')) || [];

  const handleMergeAudio = () => {
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
                  <SubTrack subTrack={_} index={i} key={JSON.stringify(_)} />
                )
              })
            }
          </Group>
        </div>
      </Card >
      <WriteModal selectSubTrack={selectSubTrack} setVisible={setVisible} visible={visible} />
    </div >
  )
}

export default ViceMusic;