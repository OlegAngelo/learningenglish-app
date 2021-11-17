import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Player from '@vimeo/player';

import ForwardAudioIcon from '../../../../../shared/icons/ForwardAudioIcon';
import PlayArrowIcon from '../../../../../shared/icons/PlayArrowIcon';
import ReplayIcon from '../../../../../shared/icons/ReplayIcon';
import StrikedLetter from '../../../../../shared/icons/StrikedLetter';
import PauseNewsIcon from '../../../../../shared/icons/PauseNewsIcon';
import DisableStrikedLetter from '../../../../../shared/icons/DisableStrikedLetter';
import Alert from '../../../../../shared/Alert';

import {
  togglePlay,
  setIsPlaying,
} from '../../../../../redux/vimeoPlayer/slice';

import styles from './AudioControl.module.css';
import { log } from '../../../../../utils/loggerHelper';

const AudioControl = ({
  className = 'fixed left-0 right-0 bottom-0',
  isShowContent,
  setIsShowContent,
  showLetterButton = true,
}) => {
  const dispatch = useDispatch();
  const { playerId, isPlaying } = useSelector(state => state.vimeoPlayer);
  const [isShowAudioAlert, setIsShowAudioAlert] = useState(false);
  const [audioAlertMessage, setAudioAlertMessage] = useState('音声ファイルの取得に失敗しました。');
  const [timeUpdate, setTimeUpdate] = useState({});
  const location = useLocation().pathname;
  const ignoreErrors = [
    'RangeError',
  ]; 

  const isPreview = () => {
    return location.includes('preview') ? true : false;
  }
  useEffect(() => {
    if (playerId) {
      const player = new Player(playerId);

      player.on('ended', function (data) {
        dispatch(setIsPlaying(false));
      });
      player.on('error', (error) => {
        if (!error.name.includes(ignoreErrors)){
          setAudioAlertMessage('エラーが発生しました。後ほど再度お試しください。');
          setIsShowAudioAlert(true);
        }
      });
      player.on('timeupdate', function(data) {
        setTimeUpdate(data);
      });
    }
  }, [playerId]);

  const onClickPlay = () => {
    dispatch(togglePlay({
      onErrorCallback: errMessage
    }));
  };

  const errMessage = () => {
      setAudioAlertMessage('ネットワークが不安定です。環境が良いところでお試しください。');
      setIsShowAudioAlert(true);
      dispatch(setIsPlaying(false))
  }

  const skipButtonBy = async (type, seconds) => {
    const player = new Player(playerId);
    const duration = await player.getDuration();
    const currentTime = await player.getCurrentTime();
    const timeMargin = duration - currentTime;

    let skippedTime;

    switch (type) {
      case 'forward':
        if (timeMargin < 3) {
          // It will go to the last second of the audio
          skippedTime = duration;
        } else {
          skippedTime = currentTime + seconds;
        }

        break;
      case 'replay':
        // If still less than ten seconds when click replay it will go to 0 always.
        if (timeMargin >= 80) {
          skippedTime = 0;
        } else {
          skippedTime = currentTime - seconds;
        }

        break;
    }

    player.setCurrentTime(skippedTime)
      .then( sec => {
        log('sec', sec)
      });
    
  }

  return (
    <div className={`${className} ${styles.footer} h-px-96`}>
      <Alert
        show={isShowAudioAlert}
        msg={audioAlertMessage}
        className={isPreview ? styles.modalSizePreview : ''}
        callBack={() => setIsShowAudioAlert(false)}
      />
      <footer className={`${styles.FooterBg} py-px-7 h-full`}>
        <div className="grid grid-cols-5 gap-2 text-center ">
          <div className="flex content-center">
            {showLetterButton && (
              <button
                className={`${styles.StrikedLetterButton} ${styles.StrikedLetterBoxShadow} mt-5 mx-auto rounded`}
                onClick={() => setIsShowContent(!isShowContent)}
              >
                {isShowContent ? <StrikedLetter /> : <DisableStrikedLetter />}
              </button>
            )}
          </div>
          <div className="flex content-center">
            <button
              className="text-8 text-center font-bold mx-auto"
              onClick={() => {
                skipButtonBy('replay', 3);
              }}
            >
              <ReplayIcon />
            </button>
          </div>
          <div className="text-8 text-center font-bold mx-auto">
            {isPlaying ? (
              <PauseNewsIcon
                height="54"
                width="54"
                onClick={() => onClickPlay()}
                className="cursor-pointer"
              />
            ) : (
              <PlayArrowIcon
                height="54"
                width="54"
                onClick={() => onClickPlay()}
                className="cursor-pointer"
              />
            )}
          </div>
          <div className="flex content-center">
            <button
              className="text-8 text-center font-bold mx-auto"
              onClick={() => {
                skipButtonBy('forward', 3);
              }}
            >
              <ForwardAudioIcon />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AudioControl;
