import React from 'react';
import { Modal, Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SS } from '@/util'
// import { Button, notification } from 'antd'

const PubModal = (props) => {
  const { onCancel, visible } = props
  const navigate = useNavigate();

  let read = SS.getItem('audio') || [];

  const onFinish = (values) => {
    if (read?.length) {
      for (let i in read) {
        if (read[i].name === values.audioName) {
          return (notification.error({
            placement: 'topRight',
            duration: 3,
            message: '该副音轨命名已存在'
          }))
        }
      }
    }
    // 更新localStorage
    read.push({ name: values.audioName, url: visible })
    SS.setItem('audio', read);
    onCancel()

    // 通知
    let paramNot = setTimeout(() => {
      navigate('/')
    }, 2000)
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
      // key={props?.key}
      visible={visible}
      // onOk={() => setVisible(false)}
      // onCancel={onCancel}
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
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      // initialValues={{ audioName: `Audio-${read?.length || 0}` }}
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
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 1, span: 16
          }}
        >
          <audio id="modal-audio" preload="auto" controls >
            <source src={visible} type="audio/mp3" />
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