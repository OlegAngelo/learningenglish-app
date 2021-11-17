import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import useMic from '../Hooks/useMic.js';
import useSpeechAnalysis from '../Hooks/useSpeechAnalysis.js';
import questionHelper from '../../../../../../utils/questionHelper';
import { removeSpecialCharacters, upperCaseFirst } from '../../../../../../utils/text';

import Alert from '../../../../../../shared/Alert';
import Commentary from './components/Commentary';
import InstructionsModal from '../SentenceReadingQuestion/components/InstructionsModal';
import Loading from '../../../../../../shared/Loading';
import Modal from '../../../../../../shared/Modal';
import QuestionSpeakerPlayer from '../../components/QuestionSpeakerPlayer';
import PlayArrowIcon from '../../../../../../shared/icons/PlayArrowIcon';
import Recorder from '../../../../../../shared/Recorder';
import ResultTextBox from '../../../../../../shared/ResultTextBox';
import WordHint from '../../components/Hint/WordHint';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import styles from './InstantUtteranceQuestion.module.css';

const InstantUtteranceQuestion = () => {
  const {
    footerProps,
    setFooterProps,
    timerProps,
    isShowCommentary,
    response,
    setResponse,
    setSelected,
    questionItem,
    learningType,
    setAnswers,
    sentence,
    setSentence,
    categories,
    AudioErrorModal,
    play,
    playSentence,
    isAudioEnded,
    isAudioPlaying,
    hint,
    setInterrupted,
    resetTimerHandler,
  } = useContext(QuestionWrapperContext);
  const { preferences: userPreference, isFetchingPreferences } = useSelector((state) => state.userPreferences);
  const [result, setResult] = useState('');
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [phrase, setPhrase] = useState('');
  const [canRecord, setCanRecord] = useState(false);
  const [instructionsModal, setInstructionsModal] = useState(false);
  const [hasNoModal, setHasNoModal] = useState(false);

  const {
    id,
    title,
    translation,
    description,
    pronunciation_point,
    example_sentence_jp,
    example_sentence,
    voice_utterance,
  } = questionItem;

  const sessionInstruction = '日本語の意味になるように英語を発音しましょう';
  const englishQuestion = removeSpecialCharacters(voice_utterance);
  const pleaseSpeakLouder = '音声の認識に失敗しました。\nもう少し大きな声で発話してください。';
  const correctAnswer = removeSpecialCharacters(voice_utterance);
  const correctAnswerArray = englishQuestion.split(' ');

  const {
    speechTypeHandler,
    setFetchingData,
    fetchingData,
    errorMessage,
    setErrorMessage
  } = useSpeechAnalysis({
    learningType,
    correctAnswer,
    questionItem,
    setAnswers,
    categories,
    setResult,
    setResponse,
    setPhrase,
    setSentence,
    setIncorrectIndices,
    setSelected,
    setCanRecord,
    hint,
    timerProps,
  });

  const {
    micState,
    audioBlob,
    handleMicClick,
    handleReRecord,
    setMicState,
  } = useMic({
    setResponse,
  });

  useEffect(() => {
    if (isFetchingPreferences){
      setInterrupted(true);
      setFetchingData(true);
      return;
    }

    let isShow = (userPreference.length === 0 || (userPreference.length !== 0 && userPreference[0].show_utterance_tutorial !== 0));
    !isShow ? setInterrupted(false) : setInterrupted(true);
    setInstructionsModal(isShow);
    setFetchingData(false);
  }, [isFetchingPreferences]);

  useEffect(() => {
    if (micState === 'playing') setInterrupted(true);
    if (micState === 'default' && audioBlob) resetTimerHandler();
  }, [micState]);

  useEffect(() => {
    setResult('');
    setPhrase('');
    setSentence('');
    setIncorrectIndices([]);
    setCanRecord(false);
    handleReRecord();
  }, [id]);

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: !response,
      hasSpeaker: false,
      hasNext: response && true,
      hasSkip: !response,
    });
  }, [response]);

  useEffect(() => {
    if (timerProps.seconds === 0) {
      setSelected(true);
      setMicState('playing');
    }
  }, [timerProps.seconds]);

  useEffect(() => {
    return () => {
      setInterrupted(false);
      setHasNoModal(false);
    };
  }, [questionItem]);

  useEffect(() => {
    if (instructionsModal) {
      setHasNoModal(true);
      setInterrupted(true);
    }
    if (!instructionsModal && hasNoModal) {
      setInterrupted(false);
    }
  }, [instructionsModal]);

  const retry = () => {
    setCanRecord(false);
    handleReRecord();
  };

  const handleSubmit = () => {
    setInterrupted(true);

    // handle audio size error
    if (audioBlob.size > 1000000) {
      setErrorMessage(pleaseSpeakLouder);
      setCanRecord(true);

      return;
    }

    setFetchingData(true);
    speechTypeHandler(audioBlob);
  };

  const handleExitModal = (params) => {
    setErrorMessage(null);
    resetTimerHandler(true);
  };

  if (isShowCommentary) {
    return <Commentary
      question={removeSpecialCharacters(title)}
      subQuestion={translation}
      description={description}
      exampleSentenceJp={example_sentence_jp ?? ''}
      exampleSentence={example_sentence ? removeSpecialCharacters(example_sentence) : ''}
      pronunciationPoint={pronunciation_point}
      play={play}
      category={categories}
      playSentence={playSentence}
      isAudioEnded={isAudioEnded}
      isAudioPlaying={isAudioPlaying}
      learningType={learningType}
    />;
  }

  return (
    <Fragment>
      <Alert
        show={errorMessage}
        callBack={handleExitModal}
        zIndex={20}
        msg={errorMessage}
      />
      <AudioErrorModal />
      {instructionsModal && (
        <Modal
          className="mx-px-16 px-px-16 py-px-22"
          closeModalFunc={() => setInstructionsModal(false)}
        >
          <InstructionsModal userPreference={userPreference} />
        </Modal>
      )}
      { fetchingData ? (
          <Loading
            className="bg-background-200"
            iconClass="bg-primary-500 text-primary-500"
            position="top-1/3"
            zIndex="z-0"
          />
        ) : (
          <div>
            <div className="h-px-44">
              <p className="mx-10 font-semibold text-center text-primary-500 text-16">
                {!response && sessionInstruction}
              </p>
            </div>
            <Fragment>
              <p className={`mx-px-20 text-basic-100 ${styles.headerTitle}`}>{translation}</p>
              {(micState == 'default' || micState == 'recording') && !response && hint && (
                <WordHint
                  className="mt-px-14"
                  hint={hint}
                  sentenceLength={correctAnswerArray.length}
                  correctAnswer={correctAnswer}
                />
              )}
              {response && micState == 'playing'
                ? (
                  <Fragment>
                    <p className={`mx-px-20 text-basic-100 font-normal ${styles.englishQuestion}`}>{englishQuestion}</p>
                    <QuestionSpeakerPlayer
                      className="mt-px-28"
                      category={categories}
                      isAudioPlaying={isAudioPlaying}
                      play={play}
                      response={response}
                      iconHeight="16"
                      iconWidth="16"
                    />
                    <div
                      className={`text-24 font-black font-hiragino text-center -mt-1 ${styles.responseStyle}`}
                      style={{ color: questionHelper.getResponseColor(response) }}
                    >
                      &nbsp;{response}
                    </div>
                    <div className="py-2">
                      <ResultTextBox
                        questionType={learningType}
                        result={result}
                        sentence={sentence ? upperCaseFirst(sentence) : ''}
                        response={response}
                      />
                    </div>
                    {timerProps.seconds != 0 && (
                      <Fragment>
                        <div className={`flex justify-center ${styles.playBackBtn}`}>
                          <PlayArrowIcon
                            width="61"
                            height="61"
                            onClick={() => handleMicClick()}
                          />
                        </div>
                        <span className="leading-px-20 text-14 font-normal font-hiragino-kaku text-primary-500 flex justify-center mt-px-1">
                          録音音声を再生
                        </span>
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  micState == 'recording'
                  ? (
                    <div className={`${styles.micRecordingIcon} grid justify-items-center`} onClick={() => handleMicClick()}>
                      <span className="text-11 text-primary-500 font-bold mb-px-20">タップして録音を終了</span>
                      <Recorder type="recording" />
                      <span className="text-progress-red text-14 font-normal pl-px-5">録音終了</span>
                    </div>
                  ) : (
                    micState == 'default'
                    ? (
                      <div className={`${styles.micDefaultIcon} grid justify-center`} onClick={() => handleMicClick()}>
                        <Recorder type="default" blink />
                        <span className={`text-primary-500 text-14 font-normal pt-px-4 ${styles.blink}`}>録音する</span>
                      </div>
                    ) : (
                      <Fragment>
                        <div className={`flex items-center justify-center ml-3 ${ true ? styles.phraseConfirmingContainer : styles.phraseConfirmingSubContainer}`}>
                          <div className={styles.playIcon}>
                            <PlayArrowIcon
                              className="ml-px-10"
                              height="59.07"
                              width="57.07"
                              onClick={() => handleMicClick() }
                            />
                            <div className="text-14 text-primary-500 leading-px-21 -ml-px-10 mt-px-1">録音音声を再生</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center pb-12">
                          <button className="focus:outline-none my-px-30 bg-basic-400 rounded text-primary-400 text-14 font-bold h-px-44 shadow-btn-choice w-px-162 mr-1 ml-4"
                            onClick={() => retry() }
                          >
                            やり直す
                          </button>
                          <button className="focus:outline-none my-px-30 bg-basic-400 rounded text-primary-400 text-14 font-bold h-px-44 shadow-btn-choice w-px-162 ml-1 mr-4"
                            onClick={() => handleSubmit() }
                          >
                            解答結果へ進む
                          </button>
                        </div>
                      </Fragment>
                    )
                  )
                )
              }
            </Fragment>
          </div>
        )
      }
    </Fragment>
  );
};

export default InstantUtteranceQuestion;
