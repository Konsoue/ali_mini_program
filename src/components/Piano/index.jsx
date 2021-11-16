import React from 'react';
import notes from "./notes.js";
import pianoKeys from "./pianoKeys.js";
import './index.scss';

function Piano(props) {
  return (
    <div>
      <div className="piano">
        {pianoKeys.map(key => {
          return (
            <div className="piano-key" key={JSON.stringify(key)}>
              <div className="piano-key__white" data-type="white" data-note={key.white.name} data-key={key.white.keyCode}>
                <span className="piano-note">{key.white.name}</span>
                <audio className="audioEle" preload="true" hidden data-note={key.white.name} src={notes[key.white.name]?.url}></audio>
              </div>
              <div className="piano-key__black" style={{ display: `${key.black.name ? "block" : "none"}` }} data-type="black" data-note={key.black.name} data-key={key.black.keyCode}>
                <span className="piano-note">{key.black.name}</span>
                <audio className="audioEle" preload="true" hidden data-note={key.black.name} src={notes[key.black.name]?.url}></audio>
              </div>
            </div>
          )
        })}
      </div>
    </div>)
}

export default Piano;