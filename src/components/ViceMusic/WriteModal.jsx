import React, { useState, memo, useEffect } from "react";
import { Modal, Input, message, Form, Button, notification } from 'antd'
import { audioDB, audioControl } from '@/util'
import Crunker from 'crunker'
import './index.scss'

const { Item } = Form;

function WriteModal(props) {
  const {
    visible,
    setVisible,
    selectSubTrack,
    subTracks,
    setFlash,
    flash,
    tips
  } = props;
  const [read, setRead] = useState([]);

  useEffect(() => {
    audioDB.mainTrack?.getAll('mainTrack')
      ?.then(res => setRead(res.map(item => item.name) || []))
  }, [])

  const mergeAudio = async (selectTrack, subTracks) => {
    const crunker = new Crunker();
    const tracks = subTracks.filter(track => selectTrack.map(_ => _.name).includes(track.name));
    const audioBuffers = await audioControl.blobToAudioBuffer(tracks.map(item => item.blob));
    const merged = crunker.mergeAudio(audioBuffers);
    const output = crunker.export(merged, 'audio/mp3');
    return output;
  }

  const handleOk = async (values) => {
    if (read?.length) {
      for (let i in read) {
        if (read[i] === values.audioName) {
          return (notification.error({
            placement: 'topRight',
            duration: 3,
            message: '该副音轨命名已存在'
          }))
        }
      }
    }

    const output = await mergeAudio(selectSubTrack, subTracks);
    await audioDB.mainTrack.add('mainTrack', { name: values.audioName, blob: output.blob })

    setVisible(false);
    setFlash(!flash)
    message.success(tips.merge)
  }

  const handleCancel = () => setVisible(false)


  return (
    <Modal
      title={'合成主音轨'}
      visible={visible}
      maskClosable={false}
      okText="确定"
      cancelText="取消"
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        onFinish={handleOk}
      >
        <Item
          label="音轨名"
          name="audioName"
          rules={[{
            required: true,
            message: '请输入主音轨命名',
          }]}
          initialValue={`Audio-${read?.length || 0}`}
        >
          <Input maxLength={20} />
        </Item>
        <Form.Item
          wrapperCol={{
            offset: 8, span: 16
          }}
        >
          <Button type="default" style={{ marginRight: '8px', }} onClick={handleCancel}>
            取消
          </Button>
          <Button type="primary" style={{ marginRight: '8px', }} htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </Modal >
  )
}


export default memo(WriteModal);