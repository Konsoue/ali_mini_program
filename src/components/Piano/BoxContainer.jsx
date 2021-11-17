import React, { memo, Fragment } from 'react';
import pianoKeys from "./pianoKeys.js";
import notes from "./notes.js";


function handleBoxClick(event, playNode, remarkArr) {
  const e = event || window.event || arguments.callee.caller.arguments[0];
  const { time, note, position } = e.target.dataset;
  if (e.target.classList.contains('selected')) {
    e.target.classList.remove('selected');
    remarkArr[time][position] = [0, note, notes[note].url];
  } else {
    e.target.classList.add('selected')
    remarkArr[time][position] = [1, note, notes[note].url];
    playNode(note)
  }
}

function BoxContainer(props) {
  const { timeLine, playNode, remarkArr } = props;
  return (
    <Fragment>
      {
        pianoKeys.map((boxKey, index) => {
          return (
            <div className="box-container" key={`${timeLine}${boxKey.white.name}${boxKey.black.name}`}>
              <div className="box-white"
                data-time={timeLine}
                data-note={boxKey.white.name}
                data-position={boxKey.white.index}
                key={`${timeLine}${boxKey.white.name}`}
                onClick={e => { handleBoxClick(e, playNode, remarkArr) }}
              >
                <span className="box-note"></span>
              </div>
              <div className="box-black"
                data-time={timeLine}
                data-note={boxKey.black.name}
                data-position={boxKey.black.index}
                key={`${timeLine}${boxKey.black.name}`}
                style={{ display: `${boxKey.black.name ? "flex" : "none"}` }}
                onClick={e => { handleBoxClick(e, playNode, remarkArr) }}
              >
                <span className="box-note"></span>
              </div>
            </div>
          )
        })
      }
    </Fragment>

  )
}

export default memo(BoxContainer);