import React from "react";
import './Arranger.less'

import TomRight from '@/static/images/drums/TomRight.jpg'
import Crash from '@/static/images/drums/Crash.jpg'
import FloorTom from "@/static/images/drums/FloorTom.jpg"
import Kick from "@/static/images/drums/Kick.jpg"
import HiHat from "@/static/images/drums/HiHat.jpg"
import Snare from "@/static/images/drums/Snare.jpg"
import TomLeft from "@/static/images/drums/TomLeft.jpg"


function Arranger(props) {
  const { beat, clickDom, setbeat, instrumentsType } = props
  let rhythm = beat

  const returnCheckbox = (str) => {
    return (
      rhythm.map((item, index) => {
        const key = `${str}-${index}`
        return (
          <label className={`row-${index}`} key={key} id={key}><input type="checkbox" /><span></span></label>
        )
      })
    )
  }

  return (
    <div className="content">
      <div id="container-sequencer" className="container-sequencer">
        <div id="sequencer" className="sequencer" onClick={(e) => { // 阻止默认事件
          if (e?.target.parentNode.tagName !== 'LABEL') return 0;
          e.stopPropagation()
          e.preventDefault();
          const parentDom = e?.target.parentNode
          parentDom.children[0].checked = !parentDom.children[0].checked

          let str = ''
          const idList = parentDom.id.split('-')
          if (idList.length === 2) {
            str = idList[0]
          } else if (idList.length === 3) {
            str = `${idList[0]}-${idList[1]}`
          }
          parentDom.children[0].checked && clickDom(str)

          rhythm[parseInt(idList[idList.length - 1])][instrumentsType[str]] = + parentDom.children[0].checked
          setbeat(rhythm)
        }}>
          <div className="row" data-target-drum="crash">
            <img src={Crash} alt="Crash" />
            {returnCheckbox('Crash')}
          </div>
          <div className="row" data-target-drum="hiHat">
            <img src={HiHat} alt="Hihat" />
            {returnCheckbox('Hi-Hat')}
          </div>
          <div className="row" data-target-drum="snare">
            <img src={Snare} alt="Snare" />
            {returnCheckbox('Snare')}
          </div>
          <div className="row" data-target-drum="rightTom">
            <img src={TomRight} alt="Righttom" />
            {returnCheckbox('Tom-Right')}
          </div>
          <div className="row" data-target-drum="leftTom">
            <img src={TomLeft} alt="Lefttom" />
            {returnCheckbox('Tom-Left')}
          </div>
          <div className="row" data-target-drum="floorTom">
            <img src={FloorTom} alt="Floortom" />
            {returnCheckbox('Floor-Tom')}
          </div>
          <div className="row" data-target-drum="kick">
            <img src={Kick} alt="Kick" />
            {returnCheckbox('Kick')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Arranger;