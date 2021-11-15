import React from "react";
import { useNavigate } from 'react-router-dom';


function Drums() {
  const navigate = useNavigate(); // 跳转到别的页面 navigate('xxxpath')

  return (
    <div>
      drums
    </div>
  )
}

export default Drums;