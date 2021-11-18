import React, { Component } from "react";
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
		const { dasharray, duration, currentTime, dashoffset, flag} = this.state;
		const audio = document.getElementById(`audio${id}`);
		const newDashoffset = (1 - currentTime / duration) * dasharray || dashoffset;
		// console.log(flag);
		this.setState({
			currentTime: audio.currentTime,
			duration: audio.duration,
			dashoffset: audio.ended ? 0 : newDashoffset,
			// flag1: audio.ended ? true : false
		});
	};
	select = (e) => {
		console.log(e.currentTarget);
		e.currentTarget.style.border="2px solid red";
	}
	render() {
		const { src, id } = this.props;
		const {
			flag,
			dasharray,
			dashoffset
		} = this.state;

		return (
			<div>
					<svg width="100" height="100" onClick={(e) => this.select(e)} className="selectClick">
						<circle r="50" cx="50" cy="50" fill="transparent" className="progress-background"></circle>
						<circle r="50" cx="50" cy="50" fill="transparent" className="progress-bar" style={{ 'strokeDashoffset': dashoffset || 0, 'strokeDasharray': dasharray }}></circle>
					</svg>
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