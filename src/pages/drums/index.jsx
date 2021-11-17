import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Drum from './drum'
import Arranger from './Arranger'
import './index.less'
import animateCSS from '../../util/animate'
import BigRackTom from '@/static/songs/BigRackTom.mp3'
import Crash from '@/static/songs/Crash.mp3'
import FloorTom from "@/static/songs/FloorTom.mp3"
import Kick from "@/static/songs/Kick.mp3"
import HiHatClosed from "@/static/songs/HiHatClosed.mp3"
import Snare from "@/static/songs/Snare.mp3"
import SmallRackTom from "@/static/songs/SmallRackTom.mp3"
import Enum from '../../util/Enum'
import { debounce } from '../../util/index'
const instrumentsType = new Enum({ 0: 'Crash', 1: 'Hi-Hat', 2: 'Snare', 3: 'Tom-Right', 4: 'Tom-Left', 5: 'Floor-Tom', 6: 'Kick' })
const instrumentsKey = new Enum({ 'f': 'Crash', 'j': 'Hi-Hat', 'h': 'Snare', 'y': 'Tom-Right', 't': 'Tom-Left', 'g': 'Floor-Tom', 'b': 'Kick' })
function Drums() {

  const [beat, setbeat] = useState(Array.from({ length: 12 }, () => new Array(7).fill(0)))
  const navigate = useNavigate(); // 跳转到别的页面 navigate('xxxpath')
  let arr = new Array(7).fill(0)
  let param;
  // 设置按键
  document.onkeydown = function (e) {
    const thisKeyID = 'Key-' + e.key;
    if (instrumentsKey[e.key]) {
      clickDom(instrumentsKey[e.key])
      animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
      arr[instrumentsType[instrumentsKey[e.key]]] = 1
      _addCheck()
    }
  };

  const clickDom = (domId) => {
    clearTimeout(param)
    if (domId === 'Drums') { return 0 }
    const audio = document.querySelector(`#${domId}-Audio`)
    audio.currentTime = 0
    audio.play()
    animateCSS(`#${domId}`, 'headShake', 'animate__faster')
  }

  const addCheck = () => {
    beat.pop()
    beat.unshift(arr)
    setbeat(beat)
    arr = new Array(7).fill(0)

    const dom = document.querySelector('#sequencer')

    const rowLength = dom.children.length;
    const labelLength = dom.children[0].children.length;

    for (let i = 0; i < rowLength; i++) {
      for (let j = 1; j < labelLength; j++) {
        dom.children[i].children[j].children[0].checked = beat[j - 1][i]
      }
    }
  }

  const clearCheck = () => {
    const dom = document.querySelector('#sequencer')
    const rowLength = dom.children.length;
    const labelLength = dom.children[0].children.length;
    for (let i = 0; i < rowLength; i++) {
      for (let j = 1; j < labelLength; j++) {
        dom.children[i].children[j].children[0].checked = 0
      }
    }
  }

  const _addCheck = debounce(addCheck, 100)

  const playRow = (num) => {
    param = setTimeout(() => {
      if (num === beat.length) return 0;
      const doms = document.querySelectorAll(`.row-${num}`)
      for (let i = 0; i < beat[num].length; i++) {
        if (beat[num][i]) {
          clickDom(instrumentsType[i])
          animateCSS(`#${doms[i].id}`, 'tada', 'animate__faster',)
          animateCSS(`#${doms[i].id} span`, 'tada', 'animate__faster', 'linear-gradient(315deg, #0e4aa7, #1058c7)')
        }
      }
      playRow(++num)
    }, 500)
  }

  return (
    <div className='drum-box'>
      <button style={{ position: 'absolute', left: '2%', top: '2%', width: '50px', transform: 'translate(-2%,-2%)', zIndex: '100' }} onClick={() => {
        console.log(123)
        navigate('home')
      }}>返回</button>
      <Drum
        clickDom={clickDom}
      />
      <button style={{ position: 'absolute', left: '50%', bottom: '20%', width: '50px', transform: 'translate(-50%,20%)' }} onClick={() => {
        clearTimeout(param)
        playRow(0)
      }}>播放</button>
      <button style={{ position: 'absolute', left: '50%', bottom: '15%', width: '50px', transform: 'translate(-50%,20%)' }} onClick={() => {
        clearCheck()
      }}>重置</button>
      <button style={{ position: 'absolute', left: '50%', bottom: '10%', width: '50px', transform: 'translate(-50%,20%)' }} onClick={() => {
        clearCheck()
        setbeat(Array.from({ length: (beat.length === 12) ? 8 : 12 }, () => new Array(7).fill(0)))
      }}>切换</button>
      <Arranger
        beat={beat}
        clickDom={clickDom}
        setbeat={setbeat}
        instrumentsType={instrumentsType}
      />

      <div className="audio-box">
        <audio id="Tom-Left-Audio" preload="auto">
          <source src={BigRackTom} type="audio/mp3" />
        </audio>
        <audio id="Crash-Audio" preload="auto">
          <source src={Crash} type="audio/mp3" />
        </audio>
        <audio id="Floor-Tom-Audio" preload="auto">
          <source src={FloorTom} type="audio/mp3" />
        </audio>
        <audio id="Hi-Hat-Audio" preload="auto">
          <source src={HiHatClosed} type="audio/mp3" />
        </audio>
        <audio id="Kick-Audio" preload="auto">
          <source src={Kick} type="audio/mp3" />
        </audio>
        <audio id="Tom-Right-Audio" preload="auto">
          <source src={SmallRackTom} type="audio/mp3" />
        </audio>
        <audio id="Snare-Audio" preload="auto">
          <source src={Snare} type="audio/mp3" />
        </audio>
      </div>

      <button style={{ position: 'absolute', right: '2%', top: '2%', width: '50px', transform: 'translate(2%,-2%)' }} onClick={() => {
        console.log(123)

      }}>完成</button>
    </div>
  )
}

export default Drums;