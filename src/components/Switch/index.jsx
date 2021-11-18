import React, { Component } from "react";
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.scss';




class Switch extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      //圆形播放器
      flag: true,
      dasharray: Math.PI * 100,
      dashoffset: Math.PI * 100,
      showElem: false,
      deleteAll: false
    };
  }

  componentDidMount() { }

  playMusic = () => {
    const { id } = this.props;
    const { flag } = this.state
    const audio = document.getElementById(`audio${id}`);
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
    const { id } = this.props;
    const { dasharray, duration, currentTime, dashoffset, flag } = this.state;
    const audio = document.getElementById(`audio${id}`);
    const newDashoffset = (1 - currentTime / duration) * dasharray || dashoffset;
    // console.log(flag);
    this.setState({
      currentTime: audio.currentTime,
      duration: audio.duration,
      dashoffset: audio.ended ? 0 : newDashoffset,
    });
  };
  select = (e) => {
    const { showElem } = this.state
    console.log(e.currentTarget);
    this.setState({ showElem: !showElem })
  };
  removeBox = () => {
    const { deleteAll } = this.state
    this.setState({ deleteAll: true })
  }
  render() {
    const { src, id } = this.props;
    const {
      flag,
      dasharray,
      dashoffset,
      showElem,
      deleteAll
    } = this.state;

    return (
      <div className={deleteAll ? 'deleteAll' : null}>
        <div className={`box-check ${showElem ? 'active' : null} `}>
          <svg width="100" height="100" onClick={(e) => this.select(e)} className="selectClick">
            <circle r="50" cx="50" cy="50" fill="transparent" className="progress-background"></circle>
            <circle r="50" cx="50" cy="50" fill="transparent" className="progress-bar" style={{ 'strokeDashoffset': dashoffset || 0, 'strokeDasharray': dasharray }}></circle>
          </svg>
          <CheckCircleOutlined className="check" />
          <DeleteOutlined className="delete" onClick={this.removeBox} />
        </div>

        <audio
          id={`audio${id}`}
          preload="true"
          src={src}
          onTimeUpdate={this.updateTime}
        >
        </audio>
        <h1 className="title" onClick={this.playMusic}>{flag ? '播放' : '暂停'}</h1>
      </div>
    );
  }
}

export default Switch;