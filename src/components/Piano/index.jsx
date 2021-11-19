import React, { memo, useEffect, useState, useMemo } from 'react';
import notes from "./notes.js";
import { InputNumber } from 'antd';
import pianoKeys from "./pianoKeys.js";
import BoxesContainer from './BoxesContainer.jsx';
import Crunker from 'crunker'
import { audioControl, is, debounceTwo } from '@/util'
import { mapKeyCodeToNote, mapNoteToDom } from './map.js'
import { useNavigate } from 'react-router-dom'
import './index.scss';
import PubModal from '../../components/PubModal'
import animateCSS from '../../util/animate'

import { Button } from 'antd'
import {
  PlayCircleOutlined,
  RetweetOutlined,
  SwapOutlined,
  CheckOutlined,
  SwapLeftOutlined
} from '@ant-design/icons';
let audioRate = 1;

/**
 * 添加全屏键盘事件监听
 * @param {*} callback
 */
const addKeyDownListener = (callback) => {
  const formatNode = (node, e) => {
    let res = `${node}4`;
    if (e.shiftKey === true) res = `${node}2`
    else if (e.altKey === true) res = `${node}5`
    else if (e.metaKey === true) res = `${node}6`
    callback(res);
  }
  document.onkeydown = function (event) {
    const e = event || window.event || arguments.callee.caller.arguments[0];
    if (e?.keyCode >= 49 && e?.keyCode <= 55) {
      const node = mapKeyCodeToNote.get(e.keyCode);
      formatNode(node, e);
    }
    if ([81, 87, 69, 82, 84].includes(e?.keyCode)) {
      const node = mapKeyCodeToNote.get(e.keyCode);
      formatNode(node, e);
    }
  }
}

/**
 * 播放琴键声音
 * @param {*} nodeName 琴键音名
 */
const playNode = (nodeName) => {
  const dom = mapNoteToDom.get(nodeName);
  dom.currentTime = 0;
  dom.playbackRate = audioRate;
  dom.play();
}

/**
 * 音频播放时的监听回调
 * 给琴键添加颜色
 * @param {*} event
 */
function handleAudioPlay(event) {
  const e = event || window.event || arguments.callee.caller.arguments[0];
  const parentNode = e.target.parentNode;
  parentNode.classList.remove('active');
  parentNode.classList.add('active');
}

function handleAudioEnd(event) {
  const e = event || window.event || arguments.callee.caller.arguments[0];
  e.target.parentNode.classList.remove('active')
}

/**
 * 预听合成的音频
 * @param {*} event
 */
const playLoop = (event, remarkArr) => {
  for (let i in remarkArr) {
    const sameLevel = [];
    for (let j in remarkArr[i]) {
      if (remarkArr[i][j]) {
        const [play, noteName] = remarkArr[i][j];
        play && sameLevel.push(noteName);
      }
    }
    if (sameLevel.length) {
      const timer = setTimeout(() => {
        sameLevel.forEach(note => playNode(note));
        clearTimeout(timer);
      }, i * 500)
    }
  }
}

/**
 * 合成副音轨
 */
const crunkerMusic = async (remarkArr) => {
  const crunker = new Crunker();
  let mergeBuffer = null;
  for (let i in remarkArr) {
    const sameLevel = [];
    for (let j in remarkArr[i]) {
      if (remarkArr[i][j]) {
        const [play, , url] = remarkArr[i][j];
        play && sameLevel.push(url);
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
  return mergeBuffer;

}



function Piano(props) {
  const [reset, setReset] = useState(false);
  const [boxNums, setBoxNums] = useState(8);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const remarkArr = useMemo(() => {
    // 用于标记 box 的激活状态，用于播放合成的效果
    return new Array(boxNums + 1).fill().map(() => new Array(60).fill());
  }, [boxNums, reset])

  useEffect(() => {
    const audios = document.querySelectorAll('.audioEle');
    audios.forEach(audio => {
      audio.addEventListener('play', debounceTwo(handleAudioPlay, 200, true))
      audio.addEventListener('ended', handleAudioEnd)
      mapNoteToDom.set(audio.dataset.note, audio);
    })
    addKeyDownListener(playNode);
  }, [])

  /**
 * 点击完成时的回调函数
 * @param {*} e
 * @param {*} remarkArr
 * @returns
 */
  const handleFinish = async (e, remarkArr) => {
    try {
      const audioBuffer = await crunkerMusic(remarkArr);
      if (is.Void(audioBuffer)) return;
      const crunker = new Crunker();
      const output = crunker.export(audioBuffer, 'audio/mp3')
      setVisible(output.url)
    } catch (e) {
      console.error(e)
      notification.error({
        placement: 'topRight',
        duration: 3,
        message: '音频读取失败'
      });
    }
  }

  const debounceTwoFinish = debounceTwo(handleFinish, 1000)

  return (
    <div className="background">
      <header>
        <div className="step-container">
          <div className="goback">
            <Button
              type='text' onClick={() => { navigate('/') }}><SwapLeftOutlined />返回</Button>
          </div>
          <div className="middle">
            <Button
              className='btn-warning'
              onClick={() => {
                setReset(!reset);
                animateCSS(`#drum-RetweetOutlined`, 'bounce', 'animate__faster',)
              }}
              style={{ left: '-50px', top: '0px', transform: 'translate(0,50%)' }}
            >
              <RetweetOutlined rotate={90} id='drum-RetweetOutlined' />重置
            </Button>

            <Button
              onClick={() => {
                animateCSS(`#drum-SwapOutlined`, 'bounce', 'animate__faster',)
                animateCSS(`.boxes-window`, 'backOutRight', 'animate__faster').then(() => {
                  setBoxNums(boxNums === 8 ? 12 : 8)
                  animateCSS(`.boxes-window`, 'backInRight', 'animate__faster')
                })
              }}
              style={{ left: '80px', top: '0px', transform: 'translate(0,50%)' }}
            >
              <SwapOutlined rotate={90} id='drum-SwapOutlined' />{(boxNums === 12) ? 'x12' : 'x8'}
            </Button>

            <Button
              type='primary'
              onClick={(e) => {
                playLoop(e, remarkArr)
                animateCSS(`#drum-PlayCircleOutlined`, 'bounce', 'animate__faster',)
              }}
              style={{ left: '-180px', top: '0px', transform: 'translate(0,50%)' }}
            >
              <PlayCircleOutlined id='drum-PlayCircleOutlined' />播放
            </Button>
          </div>
          <div className="finish">
            <Button
              type='text'
              style={{ left: '0', top: '0', transform: 'translate(-130%,0%)' }}
              onClick={(e) => { debounceTwoFinish(e, remarkArr) }}>完成<CheckOutlined /></Button>
          </div>
        </div>
        <div className="boxes-window">
          <BoxesContainer boxNums={boxNums} remarkArr={remarkArr} playNode={playNode} />
        </div>
      </header >
      <article className="footer">
        <div className="piano">
          {pianoKeys.map(key => {
            return (
              <div className="piano-key" key={JSON.stringify(key)}>
                <div
                  className="piano-key__white"
                  data-type="white"
                  data-note={key.white.name}
                  data-key={key.white.keyCode}
                  onClick={playNode.bind(this, key.white.name)}
                >
                  <span className="piano-note">{key.white.name}</span>
                  <audio className="audioEle" preload="true" hidden data-note={key.white.name} src={notes[key.white.name]?.url}></audio>
                </div>
                <div
                  className="piano-key__black"
                  style={{ display: `${key.black.name ? "flex" : "none"}` }}
                  data-type="black"
                  data-note={key.black.name}
                  data-key={key.black.keyCode}
                  onClick={playNode.bind(this, key.black.name)}
                >
                  <span className="piano-note">{key.black.name}</span>
                  <audio className="audioEle" preload="true" hidden data-note={key.black.name} src={notes[key.black.name]?.url}></audio>
                </div>
              </div>
            )
          })}
        </div>
      </article>
      <PubModal
        key='piano'
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </div >)
}

export default memo(Piano);