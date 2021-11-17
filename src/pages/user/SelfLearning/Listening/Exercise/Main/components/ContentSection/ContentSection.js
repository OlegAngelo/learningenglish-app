import React, { useState, useEffect, Fragment } from 'react';

import Loading from '../../../../../../../../shared/Loading';
import ContentHeader from './components/ContentHeader';
import Questionnaire from './components/Questionnaire';

import useAudio from '../../../../../../../../hooks/useAudio';
import { useMic } from '../../../../../../MuscleTraining/Exam/Types/Hooks/useMic';
import useSLListeningExercise from '../useSLListeningExercise';
import { getFinalWordsAnswer, getFinalPhraseAnswer, maximumSentence } from './computed';
import exerciseConstants from './exerciseConstants';

import AudioContext from './audioContext';
import style from './ContentSection.module.css';

const ContentSection = () => {
  const [answer, setAnswer] = useState('');
  const [currentState, setCurrentState] = useState('listenToProblem');
  const userEnableSpeaking = JSON.parse(localStorage.getItem('user_enable_speaking'));
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [sticky, setSticky] = useState(false);

  const {
    currentQuestion,
    audioUrl,
    correctAnswer,
    hasUsedPunctuationMark,
    isSavingResult,
    submitEvaluation,
  } = useSLListeningExercise();

  const {
    stopAudio,
    playAudio,
    playingAudio,
    playedAudio,
    isAudioEnded,
    AudioErrorModal,
    setIsAudioEnded,
  } = useAudio(audioUrl);

  const {
    micState,
    setMicState,
    audioBlob,
    recordedAudioPlaying,
    stopPlayingRecord,
    handleMicClick,
  } = useMic();

  const onPressEnterKey = (answers) => {
    const question = {
      ...currentQuestion,
      sentence: correctAnswer,
      hasUsedPunctuationMark,
    };

    const wordEvaluations = getFinalWordsAnswer(question, answers);
    submitEvaluation(
      getFinalPhraseAnswer(currentQuestion, answers, wordEvaluations),
      wordEvaluations
    );

    setCurrentState('resultWithSpeakingDisabled');
  };

  useEffect(() => {
    if (isAudioEnded) {
      if(currentState === 'resultWithSpeakingEnabled' || currentState === 'resultWithSpeakingDisabled') return;
      setCurrentState(userEnableSpeaking ? 'shadowing' : 'completeEnglishSentence');
    }
  }, [isAudioEnded]);

  const props = {
    currentState,
    correctAnswer: maximumSentence(currentQuestion),
    preSentence: currentQuestion?.pre_sentence,
    postSentence: currentQuestion?.post_sentence,
    level: currentQuestion?.set.level.order,
    answer,
    setCurrentState,
    onPressEnterKey,
    setAnswer,
    playingAudio,
    playedAudio,
    playAudio,
    audioUrl,
    stopAudio,
    isAudioEnded,
    AudioErrorModal,
    setIsAudioEnded,
    micState,
    setMicState,
    audioBlob,
    recordedAudioPlaying,
    stopPlayingRecord,
    handleMicClick,
    showKeyboard, 
    setShowKeyboard,
    sticky,
    setSticky
  };

  return (
    <div 
      className={`w-full h-screen flex flex-col flex-1 overflow-y-auto ${ 
        (exerciseConstants.isTypingStates.includes(currentState) && showKeyboard) ? style.shortenHeight : 'h-auto pb-12'
      }`}
    >
      {isSavingResult ? (
        <Loading
          rootPosition="absolute top"
          className={`bg-transparent`}
          iconClass="bg-primary-500 text-primary-500"
        />
      ) : (
        <Fragment>
          <AudioErrorModal />
          <AudioContext.Provider value={props}>
            <ContentHeader />
            <Questionnaire />
          </AudioContext.Provider>
        </Fragment>
      )}
    </div>
  );
};

export default ContentSection;
