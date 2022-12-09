import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { audioDB } from '@/util'

const PubModal = (props) => {
  const { onCancel, visible, audioData } = props;
  const [read, setRead] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    audioDB.subTrack?.getAll('subTrack')?.then(res => {
      setRead(res.map(item => item.name) || []);
    })
  }, [])

  const onFinish = async (values) => {
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

    // 更新indexedDB
    await audioDB.subTrack.add('subTrack', { name: values.audioName, blob: audioData.blob })
    onCancel()
    // 通知
    let paramNot = setTimeout(() => navigate('/'), 2000);
    const key = `open${Date.now()}`;
    notification.success({
      placement: 'topRight',
      message: '添加成功',
      description: '页面将在2秒后跳转至主页',
      duration: 2,
      key,
      btn: (
        <Button type="primary" size="small" onClick={() => {
          clearTimeout(paramNot)
          notification.close(key)
        }}>
          取消跳转
        </Button>
      )
    })

  };

  return (
    <Modal
      title="编辑副音轨"
      centered
      visible={visible}
      footer={false}
      width={400}
      destroyOnClose={true}
      style={{
        padding: '10px'
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="音轨名"
          name="audioName"
          rules={[
            {
              required: true,
              message: '请输入副音轨命名',
            },
          ]}

          initialValue={`Audio-${read?.length || 0}`}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 1, span: 16
          }}
        >
          <audio id="modal-audio" preload="auto" controls >
            <source src={audioData.url} type="audio/mp3" />
          </audio>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8, span: 16
          }}
        >
          <Button type="default" style={{ marginRight: '8px', }} onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" style={{ marginRight: '8px', }} htmlType="submit">
            确认
          </Button>
        </Form.Item>

      </Form >

    </Modal >
  );
};

export default PubModal;