import React, { useState } from "react";
import Switch from '@/components/Switch'
import ViceMusic from '../../components/ViceMusic'

import A48 from '@/static/songs/a48.mp3'

function Home() {

  return (
    <div>
      <ViceMusic />

      <Switch src={A48} id={123} />

    </div>
  )
}

export default Home;