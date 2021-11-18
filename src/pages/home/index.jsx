import React from "react";
import Switch from  '@/components/Switch'

import A48 from '@/static/songs/a48.mp3'

function Home() {
  return (
    <div>
      <Switch src={ A48 } id={123}/>
    </div>
  )
}

export default Home;