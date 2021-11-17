import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Player from '@vimeo/player';

import PlayPause from '../PlayPause';
import Seeker from '../Seeker';
import FullscreenIcon from '../../../../../shared/icons/FullscreenIcon';
import MoreVerticalIcon from '../../../../../shared/icons/MoreVerticalIcon';
import Loading from '../../../../../shared/Loading';
import Alert from '../../../../../shared/Alert';
import PlaySpeedModal from '../../OnDemand/components/PlaySpeedModal/PlaySpeedModal';

import {
  convertTimeFormat,
} from '../../../../../utils/videoPlayerHelper';

import {
  togglePlay,
  setIsPlaying,
  setFirstPlayOfVideo,
  setHasCompletedVideo,
  setVideoRealTime,
  setVideoCompleted,
} from '../../../../../redux/userLectureDetails/slice';
import useCheckIfInterrupted from '../../../../../hooks/useCheckIfInterrupted';

import './style.css';

const Video = ({
  errorMessage = 'ネットワークが不安定です。環境が良いところでお試しください。',
  thumbnail = false,
  moreOptionHandler,
  displayModal
}) => {
  const dispatch = useDispatch();
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [fetchingVideo, setFetchingVideo] = useState(true);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const msgFetchVideoFail = 'ネットワークが不安定です。環境が良いところでお試しください。';
  const isVideoInterruptedKey = 'is_video_interrupted';
  const videoLeftSecondsData = 'video_left_seconds_data';
  const { detectInterrupt } = useCheckIfInterrupted({ localStorageKey: isVideoInterruptedKey });
  const { 
    isPlaying, 
    vimeoId, 
    isDefaultVideo, 
    firstPlayOfVideo,
    videoLogId,
    videoRealTime,
    lecture,
  } = useSelector(state => state.userLectureDetails);
  const ignoreErrors = [
    'RangeError',
    'PlayInterrupted',
    'PlaybackError',
    'NotAllowedError',
  ]; 
  const [controlDelayToggle, setControlDelayToggle] = useState(false);

  const createPlayer = () => {
    return new Player('handstick', { id: vimeoId, });
  }

  const toggleVideoControls = (action) => {
    switch (action) {
      case 'loaded':
        setShowVideoControls(true);
        break;
      case 'toggler':
        setShowVideoControls(!showVideoControls);
        if (firstPlayOfVideo) setControlDelayToggle(!controlDelayToggle);
        break;
      case 'play-pause':
        if ( !firstPlayOfVideo ) {
          setControlDelayToggle(true);
        } else {
          setShowVideoControls(true);
          setControlDelayToggle(false);
        }
        break;
      case 'ended':
        setShowVideoControls(true);
        break;
      case 'skip':
        setShowVideoControls(true);
        setControlDelayToggle(!controlDelayToggle);
        break;
      case 'seek':
        setShowVideoControls(true);
        setControlDelayToggle(!controlDelayToggle);
        break;
      case 'next-video':
        setShowVideoControls(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    let delay;
    if (showVideoControls && isPlaying) {
      delay = setTimeout(() => setShowVideoControls(false), 3000);
    }

    return () => clearTimeout(delay);
  }, [controlDelayToggle]);


  const onPlayPauseClick = (e) => {
    e.stopPropagation();
    toggleVideoControls('play-pause');
    
    dispatch(togglePlay({
      onErrorCallback: errMessage
    }));
  };

  const skipButtonBy = async (e, type, seconds) => {
    if (firstPlayOfVideo) {
      e.stopPropagation();
      toggleVideoControls('skip');
    }
    const player = createPlayer();
    const duration = videoRealTime.duration;
    const currentTime = videoRealTime.seconds;
    const timeMargin = duration - currentTime;

    let skippedTime;

    switch (type) {
      case 'forward':
        if (timeMargin < seconds) {
          if (timeMargin === 0) return; //if at the end of the video, it will not forward anymore.

          // It will go to the last second of the audio
          skippedTime = duration;
        } else {
          skippedTime = currentTime + seconds;
        }

        break;
      case 'replay':
        // If still less than ten seconds when click replay it will go to 0 always.
        if (currentTime < seconds) {
          skippedTime = 0;
        } else {
          skippedTime = currentTime - seconds;
        }

        break;
    }

    player.setCurrentTime(skippedTime);
    if (!isPlaying) {
      player.play();
    }
  }

  const seek = (percent) => {
    toggleVideoControls('seek');
    const player = createPlayer();
    let skippedTime = (percent * videoRealTime.duration) / 100;
    dispatch(setVideoRealTime({
      seconds: skippedTime,
      percent: percent / 100,
      duration: videoRealTime.duration,
    }));

    player.setCurrentTime(skippedTime);
    if (!isPlaying) {
      player.play();
    }
  };

  const toggleFullScreen = () => {
    const player = createPlayer();
    const rootPlayer = document.getElementById('rootPlayer');
    player.getFullscreen().then(function(fullscreen) {
      if (!isFullscreenMode) {
        setIsFullscreenMode(true);
      } else {
        setIsFullscreenMode(false);
        player.exitFullscreen();
      }
    });
  };

  const playAnotherVideo = () => {
    toggleVideoControls('next-video');
    setFetchingVideo(true);
    const player = createPlayer();
    player.unload();
    player.loadVideo(vimeoId).then(function(id) {

    }).catch((error) => {
      errMessage(error);
    });
    player.ready().then(function() {
      player.on('loaded', function (id) {
        player.play();
        toggleVideoControls('next-video');
      });
    });
  }
  
  useEffect(() => {
    if (vimeoId) {
      const player = createPlayer();

      if (!isDefaultVideo) {
        playAnotherVideo();
      }

      player.getDuration().then(function(duration) {
        dispatch(setVideoRealTime({
          seconds: 0,
          duration: duration,
        }));
      }).catch((error) => {
        errMessage(error);
      });
      player.on('timeupdate', function(data) {
        dispatch(setVideoRealTime(data));
      });
      player.on('ended', function (data) {
        setShowThumbnail(true);
        toggleVideoControls('ended');
        dispatch(setIsPlaying(false));
        setIsFullscreenMode(false);
        player.exitFullscreen();
        dispatch(setVideoCompleted(true));
      });
      player.on('error', (error) => {
        errMessage(error);
      });
      player.on('loaded', function (id) {
        setFetchingVideo(false);
        toggleVideoControls('loaded');
      });
      player.on('play', function (id) {
        dispatch(setIsPlaying(true));
        setFetchingVideo(false);
        if (!firstPlayOfVideo) {
          dispatch(setFirstPlayOfVideo(true));
          setTimeout(() => setShowThumbnail(false), 1000);
        }
        toggleVideoControls('play-pause');
      });
    }
  }, [vimeoId]);

  const errMessage = (error) => {
    if (!ignoreErrors.includes(error.name)){
      setIsShowAlert(true);
      dispatch(setIsPlaying(false))
    }
  }

  useEffect(() => {
    setLocalStorage();
  }, [videoRealTime]);

  const setLocalStorage = () => {
    const videoDuration = parseInt(videoRealTime.duration);
    const currentTimeInSeconds = parseInt(videoRealTime.seconds);
    const currentTimeFormatted = convertTimeFormat(videoRealTime.seconds);
    if (currentTimeFormatted === '0:00') {
      localStorage.removeItem(videoLeftSecondsData);
      localStorage.removeItem(isVideoInterruptedKey);
      return;
    }
    
    if (videoDuration) {
      let leftSeconds = videoDuration - currentTimeInSeconds;
  
      if (leftSeconds <= 30) {
        dispatch(setHasCompletedVideo(true));
        localStorage.removeItem(videoLeftSecondsData);
        return;
      }
      let videoData = {
        viewingSeconds: currentTimeInSeconds,
        videoLogId: videoLogId,
        videoDuration: videoDuration,
      };
      localStorage.setItem(videoLeftSecondsData, JSON.stringify(videoData));
    }
  };

  useEffect(() => {
    if (detectInterrupt) localStorage.setItem(isVideoInterruptedKey, detectInterrupt);
  }, [detectInterrupt])

  useEffect(() => {
    return () => {
      localStorage.setItem(isVideoInterruptedKey, true);
    };
  }, []);

  return (
    <div className={`player ${isFullscreenMode && 'fullScreen_player'}`} id="rootPlayer">
      <PlaySpeedModal
        show={displayModal}
        onCloseModalHandler={moreOptionHandler}
      />
      <Alert
        show={isShowAlert}
        callBack={() => setIsShowAlert(false)}
        msg={errorMessage}
      />

      <div className="video-container">
        { fetchingVideo || !thumbnail && (
          <Loading
            className="loading absolute"
            iconClass="bg-primary-500 text-primary-500"
          />
        )}
        { vimeoId && (
          <div
            id="handstick"
            className={isFullscreenMode ? 'fullScreen_handstick' : 'handstick'}
            data-vimeo-id={vimeoId}
            data-vimeo-defer
            data-vimeo-responsive={true}
            data-vimeo-controls={false}
          >
            {thumbnail && showThumbnail && (
              <img className="thumbnail object-cover" src={thumbnail} />
            )}
            {showVideoControls && isFullscreenMode && (
              <p className="title">{lecture?.title}</p>
            )}
          </div> 
        )}
        <PlayPause
          onClick={onPlayPauseClick}
          playing={isPlaying}
          skipButtonBy={skipButtonBy}
          toggleVideoControls={toggleVideoControls}
          showVideoControls={showVideoControls}
        />
      </div>
      {!fetchingVideo && (
        <>
          {showVideoControls && (
            <Fragment>
              <p
                className="more-option cursor-pointer z-10"
                onClick={() => moreOptionHandler(true)}
              >
                <MoreVerticalIcon />
              </p>
              <div className="controls">
                <p className="time-elapsed">
                  {`${videoRealTime.seconds 
                      ? convertTimeFormat(videoRealTime.seconds) 
                      : '0:00'} / 
                    ${videoRealTime.duration 
                      ? convertTimeFormat(videoRealTime.duration) 
                      : '0:00'}
                  `}
                </p>
                <Seeker
                  onSeek={seek}
                  duration={convertTimeFormat(videoRealTime.duration)}
                  currentPositionPercentual={videoRealTime.percent}
                />
                <div
                  className="fullscreen cursor-pointer pl-px-6"
                  onClick={toggleFullScreen}
                >
                  <FullscreenIcon />
                </div>
              </div>
            </Fragment>
          )}
        </>
      )}
    </div>
  );
};

export default Video;
