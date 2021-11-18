import React, { memo, useEffect, useState, useMemo } from 'react';
import notes from "./notes.js";
import { InputNumber } from 'antd';
import pianoKeys from "./pianoKeys.js";
import BoxesContainer from './BoxesContainer.jsx';
import Crunker from 'crunker'
import { audioControl, is, debounce, LS } from '@/util'
import { mapKeyCodeToNote, mapNoteToDom } from './map.js'
import { useNavigate } from 'react-router-dom'
import './index.scss';

let audioRate = 1;
const changeAudioRate = (value) => {
  audioRate = Math.floor(value / 60);
}

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

/**
 * 点击完成时的回调函数
 * @param {*} e
 * @param {*} remarkArr
 * @returns
 */
const handleFinish = async (e, remarkArr) => {
  const audioBuffer = await crunkerMusic(remarkArr);
  if (is.Void(audioBuffer)) return;
  const crunker = new Crunker();
  const output = crunker.export(audioBuffer, 'audio/mp3')
  const subTrack = LS.getItem('subTrack');
  if (subTrack) {
    LS.setItem('subTrack', { ...subTrack, 'piano2': output.url })
  } else {
    LS.setItem('subTrack', { 'piano1': output.url })
  }
}

const debounceFinish = debounce(handleFinish, 1000)

function Piano(props) {
  const [reset, setReset] = useState(false);
  const [boxNums, setBoxNums] = useState(8);
  const navigate = useNavigate();

  const remarkArr = useMemo(() => {
    // 用于标记 box 的激活状态，用于播放合成的效果
    return new Array(boxNums + 1).fill().map(() => new Array(60).fill());
  }, [boxNums, reset])

  useEffect(() => {
    const audios = document.querySelectorAll('.audioEle');
    audios.forEach(audio => {
      audio.addEventListener('play', debounce(handleAudioPlay, 200, true))
      audio.addEventListener('ended', handleAudioEnd)
      mapNoteToDom.set(audio.dataset.note, audio);
    })
    addKeyDownListener(playNode);
  }, [])

  return (
    <div className="background">
      <header>
        <div className="step-container">
          <div className="goback">
            <button onClick={() => { navigate('/') }}>返回</button>
          </div>
          <div className="middle">
            <span><button onClick={() => { setReset(!reset); }}>重置</button></span>
            <span>
              <button onClick={() => { setBoxNums(boxNums === 8 ? 12 : 8) }}>切换</button>
            </span>
            <span>
              <button onClick={(e) => { playLoop(e, remarkArr) }}>播放</button>
            </span>
            <span>
              节奏：<InputNumber
                style={{ width: 80 }}
                max={220}
                min={60}
                defaultValue={120}
                onChange={changeAudioRate}
              />
            </span>
          </div>
          <div className="finish">
            <button onClick={(e) => { debounceFinish(e, remarkArr) }}>完成</button>
          </div>
        </div>
        <div className="boxes-window">
          <BoxesContainer boxNums={boxNums} remarkArr={remarkArr} playNode={playNode} />
        </div>
      </header>
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
    </div>)
}

export default memo(Piano);