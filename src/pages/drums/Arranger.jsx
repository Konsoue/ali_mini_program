import React from "react";
import './Arranger.less'

function Arranger(props) {
  const { rhythm } = props
  return (
    <div class="content">
      <div id="container-sequencer" class="container-sequencer">
        <div id="sequencer" class="sequencer">
          <div class="row" data-target-drum="crash">
            <img src="./在线架子鼓 _ Online Drum Kit _ Codrops_files/crash.png" alt="Crash" />
            {rhythm.map((item, index) => {
              return (
                <label className={`crash-${index}`}><input type="checkbox" /><span></span></label>
              )
            })}
          </div>
          <div class="row" data-target-drum="hiHat">
            {/* <img src="./在线架子鼓 _ Online Drum Kit _ Codrops_files/hi-hat.png" alt="Hi hat" /> */}
            {rhythm.map((item, index) => {
              return (
                <label className={`hiHat-${index}`}><input type="checkbox" /><span></span></label>
              )
            })}
          </div>
          <div class="row" data-target-drum="snare">
            {/* <img src="./在线架子鼓 _ Online Drum Kit _ Codrops_files/snare.png" alt="Snare" /> */}
            {rhythm.map((item, index) => {
              return (
                <label className={`snare-${index}`}><input type="checkbox" /><span></span></label>
              )
            })}
          </div>
          <div class="row" data-target-drum="rightTom">
            {/* <img src="./在线架子鼓 _ Online Drum Kit _ Codrops_files/right-tom.png" alt="Right tom" /> */}
            {rhythm.map((item, index) => {
              return (
                <label className={`rightTom-${index}`}><input type="checkbox" /><span></span></label>
              )
            })}
          </div>
          <div class="row" data-target-drum="leftTom">
            {/* <img src="./在线架子鼓 _ Online Drum Kit _ Codrops_files/left-tom.png"  alt="Left tom" /> */}
            {rhythm.map((item, index) => {
              return (
                <label className={`leftTom-${index}`}><input type="checkbox" /><span></span></label>
              )
            })}
          </div>
          <div class="row" data-target-drum="floorTom">

            {/* <img src="./在线架子鼓 _ Online Drum Kit _ Codrops_files/floor-tom.png" alt="Floor tom" /> */}
            {rhythm.map((item, index) => {
              return (
                <label className={`floorTom-${index}`}><input type="checkbox" /><span></span></label>
              )
            })}
          </div>
          <div class="row" data-target-drum="kick">
            {/* <img src="./在线架子鼓 _ Online Drum Kit _ Codrops_files/kick.png" alt="Kick" /> */}
            {rhythm.map((item, index) => {
              return (
                <label className={`kick-${index}`}><input type="checkbox" /><span></span></label>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Arranger;