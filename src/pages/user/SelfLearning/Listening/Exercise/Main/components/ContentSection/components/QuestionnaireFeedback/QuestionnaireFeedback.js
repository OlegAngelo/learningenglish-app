import React, { useEffect, useState, useContext } from 'react';

import Button from '../../../../../../../../../../shared/Button';
import NextIcon from '../../../../../../../../../../shared/icons/NextIcon';
import RecordingMessage from './RecordingMessage';
import RecorderIconText from './RecorderIconText';
import RecorderIcon from './RecorderIcon';
import SkipIcon from '../../../../../../../../../../shared/icons/SkipIcon';
import SpeakerIcon from '../../../../../../../../../../shared/icons/SpeakerIcon';
import CardFeedback from './CardFeedback';

import { transcript } from '../../../../../../../../../../api/SpeechAnalysisApi';
import useSLListeningExercise from '../../../useSLListeningExercise';

import exerciseConstants from '../../exerciseConstants';

import style from '../../ContentSection.module.css';
import AudioContext from '../../audioContext';

const QuestionnaireFeedback = () => {
  const [disablePlay, setDisablePlay] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const feedbackConstants = exerciseConstants.feedbackConstants;
  const isSpeakingEnabled = parseInt(localStorage.getItem('user_enable_speaking'));
  const [disableSpeaker, setDisableSpeaker] = useState(false);
  const userEnableSpeaking = localStorage.getItem('user_enable_speaking');
  const totalQuestionNumber = localStorage.getItem('totalQuestionNumber');
  const currentQuestionNumber = localStorage.getItem('currentQuestionNumber');
  const [playedAudioAtSpeakingEnabled, setPlayedAudioAtSpeakingEnabled] = useState(false);

  const {
    setCurrentState,
    currentState,
    playingAudio,
    playedAudio,
    playAudio,
    stopAudio,
    isAudioEnded,
    setIsAudioEnded,
    micState,
    setMicState,
    audioBlob,
    recordedAudioPlaying,
    stopPlayingRecord,
    handleMicClick,
  } = useContext(AudioContext);

  const {
    phraseLog,
    hasReachToMaximum,
    nextQuestion,
    submitResultToApi,
    recordingOnHandler,
  } = useSLListeningExercise();

  const updateStates = () => {
    recordedAudioPlaying && stopPlayingRecord();
    setIsLastPage(hasReachToMaximum());

    if (currentState === 'resultWithSpeakingEnabled' || !isSpeakingEnabled) {
      return nextQuestion();
    }

    setCurrentState('resultWithSpeakingEnabled');
  };

  useEffect(() => {
    if (audioBlob) {
      transcript(audioBlob)
        .then((response) => {
          const { data } = response;

          if (data.transcript === null) {
            setMicState('errorRecording');
          } else {
            setDisablePlay(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [audioBlob]);

  const onPlayAudio = () => {
    if (currentState === 'resultWithSpeakingEnabled') setPlayedAudioAtSpeakingEnabled(true);
    playAudio();
  }

  const onClickSkip = () => {
    stopAudio();

    if (currentState === 'resultWithSpeakingEnabled') {
      if (currentQuestionNumber === totalQuestionNumber) {
        setIsShowButton(true);
        localStorage.removeItem('totalQuestionNumber');
        localStorage.removeItem('currentQuestionNumber');
      } else {
        setDisableSpeaker(true);
      }
    } else {
      setDisableSpeaker(false);
    }
  };

  const onClickNext = () => {
    if (playAudio) {
      if (disableSpeaker) {
        if (currentQuestionNumber === totalQuestionNumber) {
          setIsShowButton(true);
          localStorage.removeItem('totalQuestionNumber');
          localStorage.removeItem('currentQuestionNumber');
        } else {
          stopAudio();
        }
      }
      if (userEnableSpeaking === '0') {
        if (currentQuestionNumber === totalQuestionNumber) {
          setIsShowButton(true);
          localStorage.removeItem('totalQuestionNumber');
          localStorage.removeItem('currentQuestionNumber');
        } else {
          stopAudio();
        }
      }
    }
    if (micState === 'default' && isLastPage) setIsShowButton(true);
    stopAudio();
    setIsAudioEnded(false);
  };

  const onClickLastPage = () => {
    stopAudio();
    submitResultToApi();
    localStorage.removeItem('totalQuestionNumber');
    localStorage.removeItem('currentQuestionNumber');
  };

  const renderFooterIcon = () => {
    return currentState === 'resultWithSpeakingDisabled' ? (
      <div onClick={onClickNext}>
        <NextIcon
          className={`text-center mx-auto mt-px-5 ${style.footerIcon} ${style.blink}`}
        />
        <div
          className={`text-8 text-center font-bold mx-auto mt-px-4 text-primary-400 ${style.blink}`}
        >
          NEXT
        </div>
      </div>
    ) : (
      <div onClick={onClickSkip}>
        <SkipIcon className={`text-center mx-auto mt-px-5 ${style.footerIcon}`} />
        <div className={`text-8 text-center font-bold mx-auto mt-px-4 text-primary-400`}>
          スキップ
        </div>
      </div>
    );
  };

  const micOnClick = (micState) => {
    recordingOnHandler();
    handleMicClick();
    stopAudio();
  };

  const speakerBlinking = (currentState) => {
    if (currentState !== 'resultWithSpeakingEnabled') return;
    return (!playedAudioAtSpeakingEnabled && !playingAudio) && style.blink;
  };

  return (
    <div className="mt-px-37">
      <div className="mx-px-24 text-basic-100 text-24">{phraseLog?.sentence}</div>
      <div className="mx-px-24 mt-px-8 text-basic-100 text-14">
        {phraseLog?.sentence_jp}
      </div>

      <div
        className={`mt-px-8 mb-px-18 mx-px-24 grid justify-items-center h-px-44
          ${speakerBlinking(currentState)}`}
      >
        <button
          className="disabled:opacity-50 focus:outline-none"
          disabled={playingAudio ? true : false}
          onClick={onPlayAudio}
        >
          <SpeakerIcon />
          <p className="text-8 text-primary-400 leading-px-12 font-bold mt-px-4">
            問題を再生
          </p>
        </button>
      </div>

      <CardFeedback
        currentState={currentState}
        feedbackConstants={feedbackConstants}
        phraseLog={phraseLog}
      />

      {currentState === 'resultWithSpeakingEnabled' && (
        <div className="mt-px-50">
          <div className="grid justify-center">
            <RecorderIcon
              micState={micState}
              setMicState={setMicState}
              playedAudioAtSpeakingEnabled={playedAudioAtSpeakingEnabled}
              isAudioEnded={isAudioEnded}
              setIsAudioEnded={setIsAudioEnded}
              setPlayedAudioAtSpeakingEnabled={setPlayedAudioAtSpeakingEnabled}
              playedAudio={playedAudio}
              handleMicClick={micOnClick}
              disablePlay={disablePlay}
              setDisablePlay={setDisablePlay}
              recordedAudioPlaying={recordedAudioPlaying}
            />
            <RecorderIconText micState={micState} recordedAudioPlaying={recordedAudioPlaying} />
          </div>
          <RecordingMessage
            micState={micState}
            setIsAudioEnded={setIsAudioEnded}
            setPlayedAudioAtSpeakingEnabled={setPlayedAudioAtSpeakingEnabled}
            setMicState={setMicState}
            stopPlayingRecord={stopPlayingRecord}
            stopAudio={stopAudio}
          />
        </div>
      )}

      {isShowButton ? (
        <Button
          className={`${style.lastPageButton} flex justify-center`}
          type="white-square-wider"
          onClick={() => onClickLastPage()}
        >
          学習結果画面へ
        </Button>
      ) : (
        <footer className={`bg-white pb-px-10 fixed bottom-0 w-full ${style.footer}`}>
          <div className="flex justify-end">
            <button className={style.footerBtn} onClick={() => updateStates()}>
              {renderFooterIcon()}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default QuestionnaireFeedback;
