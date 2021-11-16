import React from "react";
import { useNavigate } from 'react-router-dom';
import Drum from './drum'
import './index.less'

function Drums() {
  const navigate = useNavigate(); // 跳转到别的页面 navigate('xxxpath')

  return (
    <div className='drum-box'>
      <Drum


      />
    </div>
  )
}

export default Drums;