import React, { Component } from "react";
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './index.scss';


class Switch extends Component {
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
      this.setState({ dashoffset: 0 })
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
        <svg width="100" height="100" className="selectClick" onClick={this.playMusic}>
          <circle r="50" cx="50" cy="50" fill="transparent" className="progress-background"></circle>
          <circle r="50" cx="50" cy="50" fill="transparent" className="progress-bar"
            style={{ 'strokeDashoffset': dashoffset || 0, 'strokeDasharray': dasharray }}
          ></circle>
          <text className="text" x="50" y="50" >{flag ? '播放' : '暂停'}</text>
        </svg>
        <CheckCircleOutlined className="check" onClick={() => { this.select(name) }} />
        <div className="audio-boxes">
          {
            urls.map(src =>
              <audio
                id={`${name}${src}`}
                preload="true"
                src={src}
                onTimeUpdate={this.updateTime}
                onEnded={this.handleAudioEnd}
              />)
          }
        </div>
      </div>
    );
  }
}

export default Switch;