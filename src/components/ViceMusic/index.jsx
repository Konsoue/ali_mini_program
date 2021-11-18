import React from "react";
import { Link } from 'react-router-dom';
import { Progress, Checkbox, message } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import './index.scss'


function ViceMusic() {

  const deleteViceMusic = () => {
    const selectedItem = document.querySelectorAll('.ant-checkbox-checked')
    const len = selectedItem.length
    if (len === 0) {
      message.warning('请选择要删除的副音轨')
    } else {
      //console.log(selectedItem);
    }
  }

  const changePlayIcon = (index) => {
    const viceMusicItemBtns = document.querySelectorAll('.vice-music-item-btn')
    const pauseBtns = document.querySelectorAll('.pause-btn')
    const playBtns = document.querySelectorAll('.play-btn')
    if (viceMusicItemBtns[index].classList.contains('pause')) {
      pauseBtns[index].style.display = 'block';
      playBtns[index].style.display = 'none';
      viceMusicItemBtns[index].classList.add('play')
      viceMusicItemBtns[index].classList.remove('pause')
    } else {
      pauseBtns[index].style.display = 'none';
      playBtns[index].style.display = 'block';
      viceMusicItemBtns[index].classList.add('pause')
      viceMusicItemBtns[index].classList.remove('play')
    }
  }

  const viceMusicArr = [{
    name: '1',
    url: '123',
  }, {
    name: '2',
    url: '123',
  }, {
    name: '3',
    url: '123',
  }]


  return (
    <div className="vice-music-container">
      <div className="vice-music-header">
        <h1 className="vice-music-title">已制副音轨</h1>
        <Link to='/drum'>
          <div className="make-btn">
            <div className="make-icon">+</div>
            <span>制作</span>
          </div>
        </Link>
      </div>
      <div className="vice-music-panel">
        {viceMusicArr.map((_, i) => {
          return (
            <div className="vice-music-item" key={i}>
              <Checkbox className="vice-music-checkbox" />
              <h2 className="vice-music-item-title">Audio 01</h2>
              <div className="vice-music-item-progress">
                <div className="vice-music-item-btn pause" onClick={() => changePlayIcon(i)}>
                  <PlayCircleOutlined className="play-btn" />
                  <PauseCircleOutlined className="pause-btn" />
                </div>
                <div className="vice-music-item-bar">
                  <Progress strokeColor="#99bcdd" showInfo={false} percent="100" />
                </div>
              </div>
            </div>
          )
        })}

      </div>
      <div className="vice-music-footer">
        <div className="delete-btn" onClick={() => deleteViceMusic()}>
          <span>删除</span>
        </div>
        <div className="merge-btn">
          <span>合成</span>
        </div>
      </div>
    </div>
  )
}

export default ViceMusic;