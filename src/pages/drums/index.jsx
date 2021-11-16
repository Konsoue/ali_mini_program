import React from "react";
import { useNavigate } from 'react-router-dom';
import Drum from './drum'
import Arranger from './Arranger'
import './index.less'

function Drums() {
  const navigate = useNavigate(); // 跳转到别的页面 navigate('xxxpath')

  const clickDom = (id) => {
    console.log(id)
  }

  const rhythm = new Array(12).fill(0)

  return (
    <div className='drum-box'>
      <Drum
        clickDom={clickDom}
      />
      <Arranger
        rhythm={rhythm}
      />
    </div>
  )
}

export default Drums;