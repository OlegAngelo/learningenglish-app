import { useState } from 'react';
import { useLocation } from 'react-router';

export const useCommentaryAudio = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [sentenceAudioUrl, setSentenceAudioUrl] = useState(null);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [isShowAudioModal, setIsShowAudioModal] = useState(false);

  const category = new URLSearchParams(useLocation().search).get('category');

  const onError = () => {
    setAudioUrl(null);
  };

  const onSentenceError = () => {
    setSentenceAudioUrl(null);
  };

  const onPlaying = () => {
    setIsAudioPlaying(true);
  };

  const onEnded = () => {
    setIsAudioEnded(true);
    setIsAudioPlaying(false);
  };

  function shouldReload() {
    return this.currentTime !== 0 && this.duration === Infinity;
  }

  function isWord() {
    return category === 'word' || category === 'words' ? true : false;
  }

  const play = () => {
    if (audioUrl === null) {
      setIsShowAudioModal(true);
    } else if (audioUrl.paused) {
      if (audioUrl.shouldReload()) {
        audioUrl.load();
      }

      audioUrl.currentTime = 0;
      audioUrl.play();
      setIsAudioEnded(false);
    }
  };

  const playSentence = () => {
    if (sentenceAudioUrl === null) {
      setIsShowAudioModal(true);
    } else if (sentenceAudioUrl.paused) {
      if (sentenceAudioUrl.shouldReload()) {
        sentenceAudioUrl.load();
      }

      sentenceAudioUrl.currentTime = 0;
      sentenceAudioUrl.play();
      setIsAudioEnded(false);
    }
  };

  const stop = () => {
    if (audioUrl !== null) {
      audioUrl.pause();
      audioUrl.currentTime = 0;
    }

    if (sentenceAudioUrl !== null) {
      sentenceAudioUrl.pause();
      sentenceAudioUrl.currentTime = 0;
    }

    setIsAudioPlaying(false);
    setIsAudioEnded(false);
  };

  return {
    category,
    onError,
    onSentenceError,
    onPlaying,
    onEnded,
    shouldReload,
    isWord,
    play,
    playSentence,
    stop,
    isAudioPlaying,
    isShowAudioModal,
    setIsShowAudioModal,
    audioUrl,
    setAudioUrl,
    sentenceAudioUrl,
    setSentenceAudioUrl,
  };
};

export default useCommentaryAudio;
