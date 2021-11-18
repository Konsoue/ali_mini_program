import React, { memo } from 'react';
import drumPng from '@/static/images/drum.png';
import pianoPng from '@/static/images/piano.png';
import './index.scss'


function Select(props) {
  return (
    <div className="select-container">
      <div className="panel-head">
        <div className="select-instrument">选择乐器</div>
        <button className="btn-close">×</button>
      </div>
      <div className="panel-body">
        <input type="radio" id="piano" name="select" style={{ display: 'none' }} />
        <img id="aa" src={pianoPng} />
        <input type="radio" id="piano" name="select" style={{ display: 'none' }} />
        <img id="bb" src={drumPng} />
      </div>
      <div className="panel-foot">
        <div className="cancel">
          <button className="btn-cancel" >取消</button>
        </div>
        <div className="comfirm">
          <button className="btn-comfirm" >确认</button>
        </div>
      </div>
    </div>
  )
}
export default memo(Select);