import React, { memo, useEffect, useState, Fragment } from 'react';
import notes from "./notes.js";
import pianoKeys from "./pianoKeys.js";
import './index.scss';

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
  document.onkeydown = event => {
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
function playNode(nodeName) {
  const dom = mapNoteToDom.get(nodeName);
  dom.currentTime = 0;
  dom.play();
}


function Piano(props) {
  useEffect(() => {
    const audios = document.querySelectorAll('.audioEle');
    audios.forEach(audio => {
      // audio.addEventListener('play',)
      mapNoteToDom.set(audio.dataset.note, audio);
    })
    addKeyDownListener(playNode);
  }, [])

  return (
    <div>
      <div className="boxes-container">
        {pianoKeys.map(key => {
          return (
            <Fragment>
              <div className="box-container">
                <div className="box-white" key={JSON.stringify(key.white)}>
                  <span className="piano-note"></span>
                </div>
                <div className="box-black" key={JSON.stringify(key.black)} style={{ display: `${key.black.name ? "flex" : "none"}` }}>
                  <span className="piano-note"></span>
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
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
    </div>)
}

export default memo(Piano);