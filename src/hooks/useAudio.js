import { useEffect, useState } from 'react';
import Alert from '../shared/Alert';
import { log } from '../utils/loggerHelper';

export const useAudio = (url) => {
  const [audio, setAudio] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [playedAudio, setPlayedAudio] = useState(false);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [isShowAudioModal, setIsShowAudioModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [clickedPlay, setClickedPlay] = useState(false);
  const [speed, setSpeed] = useState(1);

  const checkError = () => {
    if (audio === null) {
      setIsShowAudioModal(true);
      return true;
    }
    return false;
  }

  const toggleAudio = () => {
    if (checkError()) return;

    if ( playingAudio ) {
      audio.pause();
      setPlayingAudio(false);
    } else {
      setClickedPlay(true);
      playBackRateAudio(speed);
      audio.play();
    }
  };

  const seekAudio = (time = 3) => {
    if (checkError()) return;
    if (parseInt(currentTime + 3) >= parseInt(audio.duration)) return;

    audio.currentTime = currentTime + time;
    if (!playingAudio) {
      setClickedPlay(true);
      playBackRateAudio(speed);
      audio.play();
    }
  }

  const playBackRateAudio = (rate = 1) => {
    audio.playbackRate = rate;
    setSpeed(rate);
  }

  const stopAudio = () => {
    if (checkError()) return;
    
    audio.pause();
    onEnded();
  };

  const playAudio = () => {
    if (checkError()) return;

    if (audio.shouldReload()) audio.load();
    if (!playingAudio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const pauseAudio = () => {
     if (playingAudio && !audio.paused && !audio.ended) {
      audio.pause();
    }
    setPlayingAudio(false);
  };

  const onPlaying = () => {
    setPlayingAudio(true);
    setClickedPlay(false);
  };

  const onError = () => {
    setAudio(null);
    checkError();
  };
  
  const onEnded = () => {
    audio.load();
    setIsAudioEnded(true);
    setPlayingAudio(false);
    setPlayedAudio(true);
  };

  const shouldReload = () => {
    return audio.currentTime !== 0 && audio.duration === Infinity;
  };

  const onTimeUpdate = () => setCurrentTime(audio.currentTime);
  const onLoadStart = () => setLoadingAudio(true);
  const onCanPlay = () => setLoadingAudio(false);
  
  useEffect(() => {
    if (audio === null) return;

    audio.onerror = onError;
    audio.onplaying = onPlaying;
    audio.onended = onEnded;
    audio.shouldReload = shouldReload;
    audio.onloadstart  = onLoadStart;
    audio.oncanplay  = onCanPlay;
    audio.addEventListener('timeupdate', onTimeUpdate);

    // For logging purposes
    audio.addEventListener('playing', () => log({duration: audio.duration}))

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('playing', () => {});
    }
  }, [audio]);

  useEffect(() => {
    if (url) setAudio(new Audio(url));
  }, [url]);

  const AudioErrorModal = () => {
    return (
      <Alert
        show={isShowAudioModal}
        callBack={() => setIsShowAudioModal(false)}
        msg="音声ファイルの取得に失敗しました。"
      />
    );
  };

  return {
    toggleAudio,
    playAudio, 
    setPlayingAudio,
    playingAudio, 
    playedAudio,
    setIsAudioEnded,
    isAudioEnded,
    onEnded,
    onPlaying,
    pauseAudio,
    audio,
    AudioErrorModal,
    stopAudio,
    seekAudio,
    playBackRateAudio,
    loadingAudio,
    clickedPlay,
  };
};

export default useAudio;
