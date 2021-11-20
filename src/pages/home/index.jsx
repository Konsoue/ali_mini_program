import React, { useState, useMemo } from "react";
import MainTrack from "@/components/MainTrack";
import { Layout } from 'antd';
import ViceMusic from '@/components/ViceMusic'
import { SS } from '@/util'
import './index.scss';

const { Sider } = Layout;

function Home() {
  const [flash, setFlash] = useState(false); // 重新渲染页面

  const mainTracks = useMemo(() => {
    return SS.getItem('mainTrack') || [];
  }, [flash])

  return (
    <div id='homePage'>
      <Layout>
        <Sider>
          <ViceMusic setFlash={setFlash} flash={flash} />
        </Sider>
        <Layout className="site-layout">
          <MainTrack mainTracks={mainTracks} setFlash={setFlash} flash={flash} />
        </Layout>
      </Layout>
    </div>
  )
}

export default Home;