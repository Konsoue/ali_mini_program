import React, { useState, useMemo } from "react";
import Switch from '@/components/Switch'
import MainTrack from "@/components/MainTrack";
import { Layout } from 'antd';
import ViceMusic from '@/components/ViceMusic'
import A48 from '@/static/songs/a48.mp3'
import A52 from '@/static/songs/a52.mp3'
import { SS } from '@/util'
import './index.scss';

const { Sider } = Layout;

function Home() {
  const [flash, setFlash] = useState(false); // 重新渲染页面

  const mainTracks = useMemo(() => {
    return SS.getItem('mainTrack') || [];
    // return [{ name: '1', urls: [A48, A52] }, { name: '2', urls: [A52] }]
  }, [flash])

  return (
    <div>
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