import React, { Component, createRef } from "react";
import { CheckCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import './index.scss';

class Switch extends Component {
  svgRef = createRef(null);
  state = {
    //圆形播放器
    flag: true,
    dasharray: Math.PI * 100,
    dashoffset: Math.PI * 100,
    showElem: false,
  };

  playMusic = (e) => {
    const event = e || window.event;
    event.stopPropagation();
    const { urls, name } = this.props;
    const { flag } = this.state
    const audios = [];
    urls.forEach(url => audios.push(document.getElementById(`${name}${url}`)))

    if (flag) {
      audios.forEach(audio => audio.play())
      this.setState({
        flag: false,
      });
    } else {
      audios.forEach(audio => audio.pause())
      this.setState({
        flag: true,
      });
    }
  }

  updateTime = () => {
    const { urls, name } = this.props;
    const { dasharray, duration, currentTime, dashoffset } = this.state;
    let newCurrent = 0, newDuration = 0;
    urls.forEach(url => {
      const audio = document.getElementById(`${name}${url}`);
      newCurrent = Math.max(audio.currentTime, newCurrent);
      newDuration = duration || Math.max(audio.duration, newDuration);
    })

    const newDashoffset = (1 - currentTime / duration) * dasharray || dashoffset;
    this.setState({
      currentTime: newCurrent,
      duration: duration || newDuration,
      dashoffset: newDashoffset,
    });
  };

  select = (name) => {
    const { showElem } = this.state
    const { setSelect, selectAudioName } = this.props;
    if (!showElem) {
      const newArr = [...selectAudioName, name];
      setSelect(newArr);
    } else {
      const newArr = selectAudioName.filter(curName => curName !== name);
      setSelect(newArr);
    }
    this.setState({ showElem: !showElem })
  };

  handleAudioEnd = (e) => {
    const { duration } = this.state;
    if (e.target.duration.toString() === duration.toString()) {
      this.setState({ dashoffset: 0, flag: true }, () => {
        this.playMusic.call(this.svgRef.current)
      });
    }
  }

  render() {
    const { urls, name } = this.props;
    const {
      flag,
      dasharray,
      dashoffset,
      showElem,
    } = this.state;

    return (
      <div className={`box-check ${showElem ? 'active' : ''} `}  >
        <svg width="100" ref={this.svgRef} height="100" className="selectClick" onClick={this.playMusic}>
          <circle r="50" cx="50" cy="50" fill="transparent" className="progress-background" ></circle>
          <circle r="50" cx="50" cy="50" fill="transparent" className="progress-bar"
            style={{ 'strokeDashoffset': dashoffset || 0, 'strokeDasharray': dasharray }}
          ></circle>
          {flag ?
            (<svg t="1637325392497" style={{ userSelect: 'none', cursor: 'pointer' }} x="30" y="25" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1812" width="48" height="48"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#2c2c2c" p-id="1813"></path></svg>)
            : (<svg t="1637325442841" style={{ userSelect: 'none', cursor: 'pointer' }} x="25" y="25" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4711" width="48" height="48"><path d="M128 106.858667C128 94.976 137.621333 85.333333 149.12 85.333333h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333H149.12A21.290667 21.290667 0 0 1 128 917.141333V106.88z m640 0c0-11.882667 9.621333-21.525333 21.12-21.525334h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333h-85.76a21.290667 21.290667 0 0 1-21.12-21.525333V106.88z" fill="#2c2c2c" p-id="4712"></path></svg>)}
        </svg>
        <CheckCircleOutlined className="check" onClick={() => { this.select(name) }} />
        <div className="audio-boxes">
          {
            urls.map(src =>
              <audio
                key={`${name}${src}`}
                id={`${name}${src}`}
                preload="true"
                src={src}
                onTimeUpdate={this.updateTime}
                onEnded={this.handleAudioEnd}
              />)
          }
        </div>
        <div className="track-name">{name}.mp3</div>
      </div>
    );
  }
}

export default Switch;