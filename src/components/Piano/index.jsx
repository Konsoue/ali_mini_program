import React, { memo, useEffect, useState } from 'react';
import notes from "./notes.js";
import pianoKeys from "./pianoKeys.js";
import BoxContainer from './BoxContainer.jsx';
import Crunker from 'crunker'
import { audioControl } from '@/util'
import './index.scss';

// 作为 box 遍历的数组
const boxArr = [7, 6, 5, 4, 3, 2, 1, 0]; // 默认值：八行

// 用于标记 box 的激活状态，用于播放合成的效果
const remarkArr = new Array(8).fill().map(() => new Array(60).fill());

const mapKeyCodeToNote = new Map([
  [49, 'C'],
  [50, 'D'],
  [51, 'E'],
  [52, 'F'],
  [53, 'G'],
  [54, 'A'],
  [55, 'B'],
  [81, "C#"],
  [87, "D#"],
  [69, "F#"],
  [82, "G#"],
  [84, "A#"],
])

// noteName 与 dom 之间的映射
const mapNoteToDom = new Map();

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
  if (!parentNode.classList.contains('active')) {
    parentNode.classList.add('active');
  }
  const timer = setTimeout(() => {
    e.target.parentNode.classList.remove('active');
    clearTimeout(timer);
  }, 1000)
}

/**
 * 预听合成的音频
 * @param {*} event
 */
const playLoop = (event) => {
  for (let i in remarkArr) {
    const sameLevel = [];
    for (let j in remarkArr[i]) {
      if (remarkArr[i][j]) {
        const [play, noteName] = remarkArr[i][j];
        play && sameLevel.push(noteName);
      }
    }
    const timer = setTimeout(() => {
      sameLevel.forEach(note => playNode(note));
      clearTimeout(timer);
    }, i * 500)
  }
}

/**
 * 合成副音轨
 */
const crunkerMusic = async () => {
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


const handleFinish = async () => {
  const one = await crunkerMusic();
}

function Piano(props) {

  const [boxNums, setBoxNums] = useState(boxArr);

  useEffect(() => {
    const audios = document.querySelectorAll('.audioEle');
    audios.forEach(audio => {
      audio.addEventListener('play', handleAudioPlay)
      mapNoteToDom.set(audio.dataset.note, audio);
    })
    addKeyDownListener(playNode);
  }, [])

  return (
    <div className="background">
      <header>
        <div className="step-container">
          <div className="goback"></div>
          <div className="playSong">
            <button onClick={playLoop}>播放</button>
          </div>
          <div className="finish">
            <button onClick={handleFinish}>完成</button>
          </div>
        </div>
        <div className="boxes-window">
          {boxNums.map(n => (
            <div className="boxes-container" key={n} >
              <BoxContainer remarkArr={remarkArr} timeLine={n} playNode={playNode} />
            </div>
          ))}
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