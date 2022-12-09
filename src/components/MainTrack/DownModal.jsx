import React, { useState, memo } from "react";
import { Modal, Input, message, Form, Button } from 'antd'
import JSzip from 'jszip';
import Crunker from 'crunker'
import './index.scss'

const { Item } = Form;

function DownModal(props) {
  const { visible, setVisible, mainTracks, selectAudioName } = props;

  const handleCancel = () => setVisible(false);

  const saveAS = (file, fileName) => {
    let src = URL.createObjectURL(file);
    let a = document.createElement("a");
    a.setAttribute("href", src);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(src)
  }

  const downLoadTrack = async (zipName) => {
    if (!selectAudioName.length) {
      message.info('请选择要删除的主音轨');
      return;
    }
    const zip = new JSzip();
    const tracks = mainTracks.filter(track => selectAudioName.includes(track.name))
    for (let i = 0, len = tracks.length; i < len; i++) {
      const trackUrls = tracks[i].urls;
      const crunker = new Crunker();
      const buffers = await crunker.fetchAudio(...trackUrls);
      const merged = crunker.mergeAudio(buffers);
      const output = crunker.export(merged);
      const reader = new FileReader();
      reader.onload = function () {
        zip.file(`${tracks[i].name}.wav`, this.result, { binary: true });
      }
      reader.readAsArrayBuffer(output.blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAS(content, zipName + '.zip');
  }

  const handleOk = async (values) => {
    await downLoadTrack(values.zipName);
    message.success('打包成功');
    setVisible(false);
  }

  return (
    <Modal
      title={'下载主音轨'}
      visible={visible}
      okText="确定"
      cancelText="取消"
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        onFinish={handleOk}
      >
        <Item
          label="压缩包名称"
          name="zipName"
          rules={[{
            required: true,
            message: '请输入压缩包名称',
          }]}
          initialValue={`mainTrack`}
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


export default memo(DownModal);