import React, { useState, memo } from "react";
import { Modal, Input, message, Form, Button, notification } from 'antd'
import { SS } from '@/util'
import './index.scss'

const { Item } = Form;

function WriteModal(props) {
  const { visible, setVisible, selectSubTrack, setFlash, flash, tips } = props;
  let mainTrack = SS.getItem('mainTrack') || [];

  const handleOk = (values) => {
    if (mainTrack?.length) {
      for (let i in mainTrack) {
        if (mainTrack[i].name === values.audioName) {
          return (notification.error({
            placement: 'topRight',
            duration: 3,
            message: '该副音轨命名已存在'
          }))
        }
      }
    }

    if (mainTrack) {
      SS.setItem('mainTrack', [...mainTrack, { name: values.audioName, urls: selectSubTrack }])
    } else {
      SS.setItem('mainTrack', [{ urls: selectSubTrack, name: values.audioName, }])
    }
    setVisible(false);
    setFlash(!flash)
    message.success(tips.merge)

  }

  const handleCancel = () => {
    setVisible(false);
  }

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
          initialValue={`Audio-${mainTrack?.length || 0}`}
        >
          <Input maxLength={20}/>
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