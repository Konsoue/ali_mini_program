import React from "react";
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

function Drums() {
  const navigate = useNavigate(); // 跳转到别的页面 navigate('xxxpath')
  const rhythm = new Array(12).fill(0)

  // 设置按键
  document.onkeydown = function (e) {
    const thisKeyID = 'Key-' + e.key;
    switch (e.key) {
      case 'b':
        clickDom(document.querySelector(`#Kick`))
        animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
        break;
      case 'h':
        clickDom(document.querySelector(`#Snare`))
        animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
        break;
      case 'j':
        clickDom(document.querySelector(`#Hi-Hat`))
        animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
        break;
      case 'g':
        clickDom(document.querySelector(`#Floor-Tom`))
        animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
        break;
      case 'f':
        clickDom(document.querySelector(`#Crash`))
        animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
        break;
      case 't':
        clickDom(document.querySelector(`#Tom-Left`))
        animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
        break;
      case 'y':
        clickDom(document.querySelector(`#Tom-Right`))
        animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
        break;
      default:
        break;
    }
  };

  const clickDom = (dom) => {
    if (dom.id === 'Drums') { return 0 }
    const audio = document.querySelector(`#${dom.id}-Audio`)
    audio.currentTime = 0
    audio.play()
    animateCSS(`#${dom.id}`, 'headShake', 'animate__faster')
  }

  return (
    <div className='drum-box'>
      <Drum
        clickDom={clickDom}
      />
      <Arranger
        rhythm={rhythm}
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
    </div>
  )
}

export default Drums;