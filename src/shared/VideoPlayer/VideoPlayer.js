import React, { useEffect, useRef, useState } from 'react';

import PlayIcon from '../icons/PlayIcon';

import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ src, play = false, className = '' }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (src && play) {
      playVideo();
    }
  },[src, play]);

  const playVideo = () => {
    let promise = videoRef.current.play();

    if (promise !== undefined) {
      promise.then(_ => {
        setIsPlaying(true);
        videoRef.current.addEventListener('timeupdate', updateProgress);
      }).catch(error => {
        setIsPlaying(false);
      });
    }
  }

  const updateProgress = (e) => {
    const { currentTime, duration } = videoRef.current
    progressRef.current.style.width = `${currentTime/duration*100}%`;
  }

  return (
    <div className="video-wrapper relative" onClick={playVideo}>
      <video className={`${styles.videoPlayer} ${className}`} ref={videoRef}>
        <source src={src} type="video/mp4" />
      </video>

      { !isPlaying && (
        <div className={`absolute ${styles.playBtnWrapper} opacity-50`}>
          <button onClick={playVideo}>
            <PlayIcon height={60} width={60} fill="#ababab"/>
          </button>
        </div>
      )}

      <div className={`h-auto progress w-full ${!isPlaying ? 'bg-secondary-500' : 'bg-basic-200'} ${styles.progressContainer}`}>
        <div className={`${styles.progressFilled} bg-secondary-500`} ref={progressRef}></div>
      </div>
    </div>
  )
}

export default VideoPlayer; 
