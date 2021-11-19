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
    const { src } = this.props;
    const { flag } = this.state
    const audio = document.getElementById(src);
    if (flag) {
      audio.play()
      this.setState({
        flag: false,
      });
    } else {
      audio.pause()
      this.setState({
        flag: true,
      });
    }
  }

  updateTime = () => {
    const { src } = this.props;
    const { dasharray, duration, currentTime, dashoffset } = this.state;
    const audio = document.getElementById(src);
    const newDashoffset = (1 - currentTime / duration) * dasharray || dashoffset;
    this.setState({
      currentTime: audio.currentTime,
      duration: audio.duration,
      dashoffset: audio.ended ? 0 : newDashoffset,
    });
  };

  select = (url) => {
    const { showElem } = this.state
    const { setSelect, selectAudioUrl } = this.props;
    if (!showElem) {
      const newArr = [...selectAudioUrl, url];
      setSelect(newArr);
    } else {
      const newArr = selectAudioUrl.filter(curUrl => curUrl !== url);
      setSelect(newArr);
    }
    this.setState({ showElem: !showElem })
  };

  render() {
    const { src } = this.props;
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
        <CheckCircleOutlined className="check" onClick={() => { this.select(src) }} />
        <audio
          id={src}
          preload="true"
          src={src}
          onTimeUpdate={this.updateTime}
        >
        </audio>
      </div>
    );
  }
}

export default Switch;