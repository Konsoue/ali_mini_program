import React, { useState, useLayoutEffect } from "react";
import MainTrack from "@/components/MainTrack";
import { Layout } from 'antd';
import ViceMusic from '@/components/ViceMusic'
import { audioDB } from '@/util'
import './index.scss';

const { Sider } = Layout;

function Home() {
  const [flash, setFlash] = useState(false); // 重新渲染页面
  const [mainTracks, setMainTracks] = useState([]);

  useLayoutEffect(() => {
    for (let url of Object.entries(audioDB.urls.mainTrack)) URL.revokeObjectURL(url);
    audioDB.mainTrack?.getAll('mainTrack').then(tracks => {
      tracks.forEach(track => {
        track.url = URL.createObjectURL(track.blob);
        audioDB.urls.mainTrack[track.name] = track.url;
      })
      setMainTracks(tracks);
    }).catch(err => console.error(err))
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