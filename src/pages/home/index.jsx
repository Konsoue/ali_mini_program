import React, { useState } from "react";
import Switch from '@/components/Switch'
import { Layout } from 'antd';
import ViceMusic from '@/components/ViceMusic'
import A48 from '@/static/songs/a48.mp3'
import './index.scss';

const { Header, Footer, Sider, Content } = Layout;

function Home() {

  return (
    <div>
      <Layout>
        <Sider>
          <ViceMusic />
        </Sider>
        <Layout className="site-layout">
          <Switch src={A48} />
        </Layout>
      </Layout>
    </div>
  )
}

export default Home;