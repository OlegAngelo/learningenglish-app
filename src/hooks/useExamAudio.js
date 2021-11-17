import { useEffect, useState } from 'react';
import Alert from '../shared/Alert';

export const useExamAudio = (data) => {
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [sentenceAudioUrl, setSentenceAudioUrl] = useState(null);
  const [isShowAudioModal, setIsShowAudioModal] = useState(false);
  const {
    isFetchingData,
    learningType,
    questionItem,
    setInterrupted,
    getNextQuestion,
    questionType,
    unitId,
  } = data;

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

  const AudioErrorModal = () => {
    return (
      <Alert
        show={isShowAudioModal}
        callBack={() => {
          setIsShowAudioModal(false);
          setInterrupted(false);
        }}
        msg="音声ファイルの取得に失敗しました。"
      />
    );
  };

  const getAudioUrl = (unit, fileName) => {
    if (questionType === 'lecture-training' || questionType === 'lecture-training-preview') {
      return `${process.env.REACT_APP_SERVER_API}/api/lecture-audio/${fileName}`;
    } else {
      return `${process.env.REACT_APP_SERVER_API}/api/question-audio/${unit}/${learningType}/${fileName}`;
    }
  };

  useEffect(() => {
    if (isFetchingData || !questionItem) return;

    setIsAudioEnded(false);
    window.scrollTo(0, 0);

    // Get the first question audio only when it's first call.
    if (!audioUrl) {
      setAudioUrl(new Audio(getAudioUrl(questionItem.training_unit_id, questionItem.audio_file)));
    }

    // Set example sentence audio if it's word type.
    if (learningType === 'word') {
      setSentenceAudioUrl(new Audio(getAudioUrl(questionItem.training_unit_id, questionItem.example_sentence_audio_file)));
    }

    let nextAudioUrl = null;
    const nextQuestion = getNextQuestion && getNextQuestion().data;

    // Fetch next question audio in advance.
    if (nextQuestion) {
      nextAudioUrl = new Audio(getAudioUrl(questionItem.training_unit_id, nextQuestion.audio_file));
    }

    // Set next question audio when it's called again.
    return () => {
      nextQuestion && setAudioUrl(nextAudioUrl);
    };
  }, [questionItem, unitId]);

  useEffect(() => {
    if (audioUrl !== null) {
      audioUrl.onerror = onError;
      audioUrl.onplaying = onPlaying;
      audioUrl.onended = onEnded;
      audioUrl.shouldReload = shouldReload;
    }

    if (sentenceAudioUrl !== null){
      sentenceAudioUrl.onerror = onSentenceError;
      sentenceAudioUrl.onplaying = onPlaying;
      sentenceAudioUrl.onended = onEnded;
      sentenceAudioUrl.shouldReload = shouldReload;
    }
  }, [audioUrl, sentenceAudioUrl]);

  const play = (category) => {
    if (audioUrl === null) {
      setIsShowAudioModal(true);
    } else if (audioUrl.paused) {
      if (audioUrl.shouldReload()) {
        audioUrl.load();
      }

      audioUrl.currentTime = 0;
      audioUrl.play();

      switch (category) {
        case 'audio-word-selection':
        case 'listening':
        case 'audio-typing':
        case 'word-translation-selection':
          break;
        default:
      }
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

  const forceSetAudioUrl = (data) => {
    setAudioUrl(new Audio(getAudioUrl(data.training_unit_id, data.audio_file)));
    setSentenceAudioUrl(new Audio(getAudioUrl(data.training_unit_id,data.example_sentence_audio_file)));
  };

  return {
    play: play,
    stop: stop,
    isAudioEnded: isAudioEnded,
    isAudioPlaying: isAudioPlaying,
    AudioErrorModal: AudioErrorModal,
    playSentence : playSentence,
    forceSetAudioUrl: forceSetAudioUrl,
  };
};

export default useExamAudio;
