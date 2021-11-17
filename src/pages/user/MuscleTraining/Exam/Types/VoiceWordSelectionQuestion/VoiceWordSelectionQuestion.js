import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import Alert from '../../../../../../shared/Alert/Alert';
import Choice from './components/Choice/Choice';
import InstructionsModal from '../SentenceReadingQuestion/components/InstructionsModal';
import Loading from '../../../../../../shared/Loading';
import Modal from '../../../../../../shared/Modal';
import Recorder from '../../../../../../shared/Recorder/Recorder';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import { removeSpecialCharacters } from '../../../../../../utils/text';
import questionHelper from '../../../../../../utils/questionHelper';

import useMic from '../Hooks/useMic.js';
import useSpeechAnalysis from '../Hooks/useSpeechAnalysis.js';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import styles from './VoiceWordSelectionQuestion.module.css';

const VoiceWordSelectionQuestion = () => {
  const {
    footerProps,
    setFooterProps,
    response,
    setResponse,
    selected,
    setSelected,
    isShowCommentary,
    questionItem,
    learningType,
    playSentence,
    isAudioPlaying,
    play,
    categories,
    timerProps,
    setAnswers,
    AudioErrorModal,
    setIsShowCommentaryBubble,
    resetTimerHandler,
    setInterrupted,
  } = useContext(QuestionWrapperContext);
  const {
    id,
    pronunciation_point,
    description,
    choices,
    example_sentence_jp,
    example_sentence,
    voice_utterance,
    meaning,
  } = questionItem;

  const { preferences: userPreference, isFetchingPreferences } = useSelector((state) => state.userPreferences);
  const [canRecord, setCanRecord] = useState(false);
  const [instructionsModal, setInstructionsModal] = useState(false);
  const [hasNoModal, setHasNoModal] = useState(false);
  const correctAnswerJP = choices.filter(item => item.is_correct)[0].jp_item;
  const correctChoice = choices.filter(item => item.is_correct)[0].en_item;
  const correctAnswer = voice_utterance;
  const sampleAnswer = correctAnswer;
  const englishQuestion = correctAnswer;
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');
  const pleaseSpeakLouder = '音声の認識に失敗しました。\nもう少し大きな声で発話してください。';
  const playBackQuestion = '問題を再生';
  const playBackSentence = '例文を再生';
  const answerByUtterance = '発音で解答';
  const tapToStopRecording = 'タップして録音を終了させます。';
  const startRecording = '録音する';
  const stopRecording = '録音終了';
  const threePoints = '...';

  const indicatesCorrectChoice = (choice) => (
    response
    && response !== threePoints
    && !errorMessage
    && choice.en_item === correctChoice
  );

  const {
    micState,
    isPermissionDenied,
    audioBlob,
    handleMicClick,
    handleReRecord,
  } = useMic({
    sampleAnswer,
    englishQuestion,
    setResponse,
    timerProps,
  });

  const { speechTypeHandler, setFetchingData, fetchingData, errorMessage, setErrorMessage } = useSpeechAnalysis({
    learningType,
    correctAnswer,
    choices,
    categories,
    setResult,
    setResponse,
    setWord,
    setSelected,
    setCanRecord,
    setAnswers,
    questionItem,
    timerProps,
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

  useEffect(()=>{
    if (audioBlob !== null){
      setIsShowCommentaryBubble(false);
      // handle audio size error
      if (audioBlob.size > 1000000) {
        setErrorMessage(pleaseSpeakLouder);
        setSelected(false);
        return;
      }
      setFetchingData(true);
      speechTypeHandler(audioBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    response && setIsShowCommentaryBubble(true);
  }, [response]);

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: false,
      hasNext: response && true,
      hasSkip: !response,
      hasSpeaker: false,
    });
  }, [response, isShowCommentary]);

  useEffect(() => {
    setResult('');
    setResponse('');
    setSelected(false);
    handleReRecord();
  }, [id]);

  useEffect(() => {
    if (errorMessage === false && response !== 'Failed...') {
      resetTimerHandler();
      handleReRecord();
      setSelected(false);
      setResponse('');
      setResult('');
    }
  }, [errorMessage]);

  const isAnswerNotInChoices = () => {
    let answerInChoices = true;
    choices.map((choice) => {
      if (choice.en_item === word) {
        answerInChoices = false;
      }
    })
    return answerInChoices;
  }

  return (
    <div>
      <Alert
        show={errorMessage}
        msg={errorMessage}
        callBack={() => {
          setErrorMessage(false);
          setInterrupted(false);
        }}
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
      {
        fetchingData ? (
          <Loading
            className="bg-background-200"
            iconClass="bg-primary-500 text-primary-500"
            position="top-1/3"
            zIndex="z-0"
          />
        ) : (
          <Fragment>
            <p className={`${styles.instruction}`}>{!response && "日本語にあてはまる単語を発音しましょう"}</p>
            { isShowCommentary
              ? (
                <Fragment>
                  <div className="mt-px-7 text-basic-100 mx-px-24 font-normal">
                    <p className={`text-center text-24 leading-px-19 ${styles.correctChoice}`}>{correctChoice}</p>
                    <p
                      className="mt-px-8 text-center text-18"
                      dangerouslySetInnerHTML={{
                        __html: meaning.replace(/\n/g, '<br/>'),
                      }}
                    />
                  </div>
                  <div className='mt-px-20 text-center w-full'>
                    <button
                      onClick={() => play(correctAnswerJP)}
                      disabled={isAudioPlaying}
                      className="disabled:opacity-50"
                    >
                      <SpeakerIcon width="25" height="24" className={`text-center mx-auto ${styles.speakerIcon}`} />
                      <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                        {playBackQuestion}
                      </div>
                    </button>
                  </div>
                  <div className={styles.explanation}>
                    <div className={`mb-px-8 bg-basic-400 rounded ${styles.explanationCard}`}>
                      <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">例文</p>
                      <p className="font-bold text-14 leading-px-24 text-basic-100">{removeSpecialCharacters(example_sentence)}</p>
                      <p className="text-14 leading-px-24 text-basic-100">{example_sentence_jp}</p>
                      <div className='text-center w-full'>
                        <button
                          onClick={() => playSentence()}
                          disabled={isAudioPlaying}
                          className="disabled:opacity-50"
                        >
                          <SpeakerIcon width="25" height="24" className={`text-center mx-auto ${styles.speakerIcon}`} />
                          <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                            {playBackSentence}
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className={`mb-px-8 bg-basic-400 rounded ${styles.explanationCard}`}>
                      <p className="mb-px-7 font-bold text-16 leading-px-23 text-primary-500">解説</p>
                      <p className="text-14 leading-px-24 text-basic-100">{description}</p>
                    </div>
                    {pronunciation_point && (
                      <div className={`mb-px-27 bg-basic-400 rounded ${styles.explanationCard}`}>
                        <p className="mb-px-7 font-bold text-16 leading-px-23 text-primary-500">発音のポイント</p>
                        <p className="text-14 leading-px-24 text-basic-100">{pronunciation_point}</p>
                      </div>
                    )}
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <p className="mt-px-24 m-3 text-center text-24 text-basic-100">{correctAnswerJP}</p>
                  { isPermissionDenied && (
                    <div className="text-11 text-progress-red font-bold flex justify-center pt-px-14">
                      ※ マイクの使用を許可して、ページをリロードしてください。
                    </div>
                  )}
                  {response !== threePoints
                    ? (
                      <p
                        className={`${styles.feedbackMessage} font-black leading-px-38 text-center`}
                        style={{ color: questionHelper.getResponseColor(response) }}
                      >
                        <span>&nbsp;{response}</span>
                      </p>
                    ) : (
                      <div className="mt-10"></div>
                    )
                  }
                  <div className="mx-px-34 py-3">
                    {choices.map((choice, key) => {
                      return (
                        <Choice
                          key={key}
                          text={choice.en_item}
                          color={
                            indicatesCorrectChoice(choice)
                              ? '#03DAC6'
                              : '#FFFFFF'
                          }
                          textColor={result === 'incorrect' && choice.en_item === word? '#E34E42' : '#141414'}
                        />
                      );
                    })}
                  </div>
                  {(result === 'incorrect' && isAnswerNotInChoices()) && (
                    <div className="flex justify-center text-14 text-exam-error font-bold mt-px-20">
                      うまく聞き取れませんでした
                    </div>
                  )}
                  { !selected && (
                      <div className={styles.recorderContainer}>
                        <span className="flex justify-center text-16 font-bold text-primary-500 mb-px-3">
                          {answerByUtterance}
                        </span>
                        <p className={`mb-px-8 font-bold text-11 text-center text-primary-500 ${micState !== 'recording' && 'invisible'}`}>
                          {tapToStopRecording}
                        </p>
                        <div className={`${styles.micDefaultIcon} grid justify-center`}>
                          <Recorder
                            className="mt-px-8 flex justify-center"
                            type={micState === 'playing' ? 'default' : micState}
                            onClick={() => {
                              if (micState === 'recording') {
                                setResponse(threePoints);
                              }
                              handleMicClick();
                            }}
                            blink={micState === 'default'}
                          />
                          <span
                            className={`
                              ${micState === 'recording' ? 'text-red-500' : `text-primary-500 ${styles.blink}`}
                              text-14 text-center font-normal pt-px-3
                            `}
                          >
                            {micState === 'recording' ? stopRecording : startRecording}
                          </span>
                        </div>
                      </div>
                    )
                  }
                </Fragment>
              )
            }
          </Fragment>
        )
      }
    </div>
  );
};

export default VoiceWordSelectionQuestion;
