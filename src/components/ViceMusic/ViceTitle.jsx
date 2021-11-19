import React, { memo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Space } from 'antd'
import drumPng from '@/static/images/drum.png'
import pianoPng from '@/static/images/piano.png'


function ViceTitle(props) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [pageUrl, setPageUrl] = useState('/');
  const selectPage = () => setVisible(true)
  const handleCancel = () => setVisible(false)
  const handleOk = () => navigate(pageUrl);

  return (
    <div className="vice-title-container">
      <h1 className="vice-music-title">副音轨</h1>
      <span className="vice-make"><Button type="primary" onClick={selectPage}>制作</Button></span>
      <Modal title="选择乐器"
        maskClosable={false}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <div className="page-content">
          <Space size="large">
            <div className={`page-check ${pageUrl === '/drum' ? 'active' : ''}`}>
              <img src={drumPng} alt="drum" onClick={() => { setPageUrl('/drum') }} />
            </div>
            <div className={`page-check ${pageUrl === '/piano' ? 'active' : ''}`}>
              <img src={pianoPng} alt="piano" onClick={() => { setPageUrl('/piano') }} />
            </div>
          </Space>
        </div>
      </Modal>
    </div>
  )
}

export default memo(ViceTitle)