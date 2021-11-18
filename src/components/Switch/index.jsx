import React, { Component } from "react";
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './index.scss';

let selectAudioUrl = [];

class Switch extends Component {
  state = {
    //圆形播放器
    flag: true,
    dasharray: Math.PI * 100,
    dashoffset: Math.PI * 100,
    showElem: false,
    deleteAll: false
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

  select = (e) => {
    const event = e || window.event;
    const dataset = event.target.dataset;
    const { showElem } = this.state
    if (!showElem) {
      if (!selectAudioUrl.includes(dataset.url)) selectAudioUrl.push(dataset.url);
    } else {
      if (selectAudioUrl.includes(dataset.url)) selectAudioUrl = selectAudioUrl.filter(dataset.url);
    }
    this.setState({ showElem: !showElem })
  };

  removeBox = () => {
    const { deleteAll } = this.state
    this.setState({ deleteAll: true })
  }

  deleteAudios = () => {

  }

  render() {
    const { src } = this.props;
    const {
      flag,
      dasharray,
      dashoffset,
      showElem,
      deleteAll
    } = this.state;

    return (
      <div className={`main-track-container ${deleteAll ? 'deleteAll' : ''}`}>
        <div className="main-track-header">
          <span className="title">主音轨</span>
          <span className="delete-main-track">
            <Button type="primary" danger onClick={this.deleteAudios}>删除</Button>
          </span>
        </div>
        <div className="main-track-content">
          <div className={`box-check ${showElem ? 'active' : ''} `} data-url={src} onClick={this.select}>
            <svg width="100" height="100" className="selectClick" onClick={this.playMusic}>
              <circle r="50" cx="50" cy="50" fill="transparent" className="progress-background"></circle>
              <circle r="50" cx="50" cy="50" fill="transparent" className="progress-bar" style={{ 'strokeDashoffset': dashoffset || 0, 'strokeDasharray': dasharray }}></circle>
              <text className="text" x="50" y="50" >{flag ? '播放' : '暂停'}</text>
            </svg>
            <CheckCircleOutlined className="check" />
            <audio
              id={src}
              preload="true"
              src={src}
              onTimeUpdate={this.updateTime}
            >
            </audio>
          </div>
        </div>
      </div>
    );
  }
}

export default Switch;