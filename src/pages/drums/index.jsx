import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Drum from './drum'
import Arranger from './Arranger'
import './index.less'
import { debounce, audioControl } from '../../util/index'
import Crunker from 'crunker'
import Enum from '../../util/Enum'
import animateCSS from '../../util/animate'
import { Button, notification } from 'antd'
import PubModal from '../../components/PubModal'

import BigRackTom from '@/static/songs/BigRackTom.mp3'
import Crash from '@/static/songs/Crash.mp3'
import FloorTom from "@/static/songs/FloorTom.mp3"
import Kick from "@/static/songs/Kick.mp3"
import HiHatClosed from "@/static/songs/HiHatClosed.mp3"
import Snare from "@/static/songs/Snare.mp3"
import SmallRackTom from "@/static/songs/SmallRackTom.mp3"

import {
  PlayCircleOutlined,
  RetweetOutlined,
  SwapOutlined,
  CheckOutlined,
  SwapLeftOutlined
} from '@ant-design/icons';

const instrumentsType = new Enum({ 0: 'Crash', 1: 'Hi-Hat', 2: 'Snare', 3: 'Tom-Right', 4: 'Tom-Left', 5: 'Floor-Tom', 6: 'Kick' })
const instrumentsKey = new Enum({ 'f': 'Crash', 'j': 'Hi-Hat', 'h': 'Snare', 'y': 'Tom-Right', 't': 'Tom-Left', 'g': 'Floor-Tom', 'b': 'Kick' })
const TomMp3 = new Enum({ 'Crash': Crash, 'Hi-Hat': HiHatClosed, 'Snare': Snare, 'Tom-Right': SmallRackTom, 'Tom-Left': BigRackTom, 'Floor-Tom': FloorTom, 'Kick': Kick })

function Drums() {
  // 设置曲谱beat，用作记录旋律
  const [beat, setbeat] = useState(Array.from({ length: 12 }, () => new Array(7).fill(0)))
  const [visible, setVisible] = useState(false);
  // 跳转到别的页面 navigate('xxxpath')
  const navigate = useNavigate();
  // 防抖暂存区arr，多次点击
  let arr = new Array(7).fill(0)
  // param设置定时器的key，用于暂停定时器
  let param;

  // 设置按键
  document.onkeydown = function (e) {
    const thisKeyID = 'Key-' + e.key;
    // 根据instrumentsKey来返回key对应的乐器id
    if (instrumentsKey[e.key]) {
      clickDom(instrumentsKey[e.key])
      // css动画
      animateCSS(`#${thisKeyID}`, 'shakeY', 'animate__faster')
      // 设置暂存区
      arr[instrumentsType[instrumentsKey[e.key]]] = 1
      // 刷新函数防抖
      _refreshCheck()
    }
  };

  // 点击架子鼓事件
  const clickDom = (domId) => {
    // 清除定时器
    clearTimeout(param)
    // 误点return0
    if (domId === 'Drums') { return 0 }
    // 获取音频
    const audio = document.querySelector(`#${domId}-Audio`)
    // 音频重新播放
    audio.currentTime = 0
    audio.play()
    // 设置css动画
    animateCSS(`#${domId}`, 'headShake', 'animate__faster')
  }

  // 刷新函数
  const refreshCheck = () => {
    // 更新beat数组
    beat.shift()
    beat.push(arr)
    setbeat(beat)
    // 重置暂存arr
    arr = new Array(7).fill(0)

    // 获取曲谱区dom
    const dom = document.querySelector('#sequencer')
    const rowLength = dom.children.length;
    const labelLength = dom.children[0].children.length;

    // 遍历添加
    for (let i = 0; i < rowLength; i++) {
      for (let j = 1; j < labelLength; j++) {
        dom.children[i].children[j].children[0].checked = beat[j - 1][i]
      }
    }
  }

  // 重置函数
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

  // 防抖函数
  const _refreshCheck = debounce(refreshCheck, 100)

  // 播放事件
  const playRow = (num) => {
    // 设置定时器param
    param = setTimeout(() => {
      // 如果到最后则结束
      if (num === beat.length) return 0;
      // 获取所在行元素
      const doms = document.querySelectorAll(`.row-${num}`)
      // 遍历判断并播放事件添加动画
      for (let i in beat[num]) {
        if (beat[num][i]) {
          clickDom(instrumentsType[i])
          animateCSS(`#${doms[i].id} span`, 'tada', 'animate__faster', 'linear-gradient(315deg, #0e4aa7, #1058c7)')
        }
        animateCSS(`#${doms[i].id}`, 'tada', 'animate__faster',)
      }
      // 回调
      playRow(++num)
    }, 500)
  }

  //  合成副音轨
  const crunkerMusic = async () => {
    const crunker = new Crunker();
    let mergeBuffer = null;
    // 遍历beat
    for (let i in beat) {
      const sameLevel = [];
      for (let j in beat[i]) {
        // 有记录则放至sameLevel
        if (beat[i][j]) {
          sameLevel.push(TomMp3[instrumentsType[j]]);
        }
      }
      if (sameLevel.length) {
        let buffers = await crunker.fetchAudio(...sameLevel)
        buffers = buffers.map(buffer => audioControl.cutAudioBuffer(buffer, 1));
        const buffer = crunker.mergeAudio(buffers);
        if (mergeBuffer) {
          mergeBuffer = crunker.concatAudio([mergeBuffer, buffer])
        } else {
          mergeBuffer = buffer;
        }
      }
    }

    if (!mergeBuffer) {
      animateCSS(`#sequencer`, 'tada', 'animate__faster',)
    }
    return mergeBuffer;
  }

  // 完成事件
  const handleFinish = async () => {
    // 转mp3
    let crunker = new Crunker();
    try {

      const musicBuffer = await crunkerMusic();
      const mp3 = crunker.export(musicBuffer, "audio/mp3")
      setVisible(mp3.url)
    } catch (e) {
      console.error(e)
      notification.error({
        placement: 'topRight',
        duration: 3,
        message: '音频读取失败'
      });
    }
  }

  return (
    <div className='drum-box'>
      <Button
        type='text'
        style={{
          left: '2%',
          top: '2%',
          transform: 'translate(-2%,-2%)',
          zIndex: '100',
        }}
        onClick={() => {
          navigate('/')
        }}>
        <SwapLeftOutlined />返回
      </Button>
      <Drum
        clickDom={clickDom}
      />
      <Button
        type='primary'
        style={{ right: '30%', bottom: '5%', transform: 'translate(-50%,50%)' }}
        onClick={() => {
          clearTimeout(param)
          playRow(0)
          animateCSS(`#drum-PlayCircleOutlined`, 'bounce', 'animate__faster',)
        }}>
        <PlayCircleOutlined id='drum-PlayCircleOutlined' />播放
      </Button>
      <Button
        className='btn-warning'
        style={{ right: '20%', bottom: '5%', transform: 'translate(-50%,50%)' }}
        onClick={() => {
          clearTimeout(param)
          clearCheck()
          setbeat(Array.from({ length: beat.length }, () => new Array(7).fill(0)))
          animateCSS(`#drum-RetweetOutlined`, 'bounce', 'animate__faster',)
        }}>
        <RetweetOutlined rotate={90} id='drum-RetweetOutlined' />重置
      </Button>
      <Button
        style={{ right: '10%', bottom: '5%', transform: 'translate(-50%,50%)' }}
        onClick={() => {
          clearTimeout(param)
          clearCheck()
          animateCSS(`#drum-SwapOutlined`, 'bounce', 'animate__faster',)
          animateCSS(`#sequencer`, 'backOutRight', 'animate__faster',).then(() => {
            setbeat(Array.from({ length: (beat.length === 12) ? 8 : 12 }, () => new Array(7).fill(0)))
            animateCSS(`#sequencer`, 'backInRight', 'animate__faster',)
          })
        }}>
        <SwapOutlined rotate={90} id='drum-SwapOutlined' />{(beat.length === 12) ? 'x12' : 'x8'}
      </Button>
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
        <audio id="Tom-all" preload="auto">
          <source src={null} type="audio/mp3" />
        </audio>
      </div>

      <Button
        type='text'
        // className='btn-success'
        style={{ right: '2%', top: '2%', transform: 'translate(2%,-2%)', color: '#344b3a' }}
        onClick={handleFinish}>
        完成<CheckOutlined />
      </Button>

      <PubModal
        key='drum'
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </div>
  )
}

export default Drums;