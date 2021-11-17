import React, { Fragment, useEffect, useState, useContext } from 'react';
import { camelCase } from 'lodash';

import Recorder from '../../../../../../shared/Recorder';
import PlayArrowIcon from '../../../../../../shared/icons/PlayArrowIcon';
import Commentary from './components/Commentary/';
import ResultTextBox from './components/ResultTextBox';
import Loading from '../../../../../../shared/Loading';
import Alert from '../../../../../../shared/Alert';
import Modal from '../../../../../../shared/Modal';
import InstructionsModal from './components/InstructionsModal';
import QuestionSpeakerPlayer from '../../components/QuestionSpeakerPlayer';

import { upperCaseFirst } from '../../../../../../utils/text';
import questionApi from '../../../../../../api/QuestionApi';
import questionHelper from '../../../../../../utils/questionHelper';

// Hooks
import useMic from '../Hooks/useMic.js';
import useSpeechAnalysis from '../Hooks/useSpeechAnalysis.js';
import { removeSpecialCharacters } from '../../../../../../utils/text';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Styles
import style from './SentenceReadingQuestion.module.css';

const SentenceReadingQuestion = () => {
  const {
    footerProps,
    setFooterProps,
    response,
    setResponse,
    sentence,
    timerProps,
    setSentence,
    setSelected,
    questionItem,
    setAnswers,
    isShowCommentary,
    categories,
    learningType,
    isAudioEnded,
    isAudioPlaying,
    AudioErrorModal,
    play,
    playSentence,
    setBlinkSpeaker,
  } = useContext(QuestionWrapperContext);
  const { preferences: userPreference, isFetchingPreferences } =  useSelector(state => state.userPreferences )
  const [result, setResult] = useState('');
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [word, setWord] = useState('');
  const [canRecord, setCanRecord] = useState(false);
  const [instructionsModal, setInstructionsModal] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [disableSpeaker, setDisableSpeaker] = useState(false);
  const [forceStopBlinking, setForceStopBlinking] = useState(false);

  const {
    id,
    pronunciation_point,
    description,
    choices,
    example_sentence_jp,
    example_sentence,
    voice_utterance,
    meaning,
    translation,
    title,
  } = questionItem;

  const titleItem = questionHelper.formatQuestionSentence(title);
  const correctTranslation = choices.filter((item) => item.is_correct)[0].jp_item;
  const correctAnswer = questionHelper.formatQuestionSentence(voice_utterance);
  const pleaseSpeakLouder = '音声の認識に失敗しました。\nもう少し大きな声で発話してください。';

  const { speechTypeHandler, setFetchingData, fetchingData, errorMessage, setErrorMessage } = useSpeechAnalysis({
    learningType,
    correctAnswer,
    questionItem,
    setAnswers,
    categories,
    timerProps,
    setResult,
    setResponse,
    setWord,
    setSentence,
    setIncorrectIndices,
    setSelected,
    setCanRecord,
  });

  const {
    micState,
    isPermissionDenied,
    audioBlob,
    recordedAudioPlaying,
    handleMicClick,
    handleReRecord,
  } = useMic({
    setResponse,
  });

  const handleSubmit = () => {
    setBlinkSpeaker(false);

    // handle audio size error
    if (audioBlob.size > 1000000) {
      setErrorMessage(pleaseSpeakLouder);
      setCanRecord(true);

      return;
    }

    setFetchingData(true);
    speechTypeHandler(audioBlob);
  };

  useEffect(() => {
    if (isFetchingPreferences) return setFetchingData(true);

    let isShow = (userPreference.length === 0 || (userPreference.length !== 0 && userPreference[0].show_utterance_tutorial !== 0));
    setInstructionsModal(isShow);
    setFetchingData(false);
  }, [isFetchingPreferences]);

  useEffect(() => {
    const topSpace = 141;
    const bottomSpace = 87.594;
    const spaces = topSpace + bottomSpace;

    setContentHeight(window.innerHeight - spaces);

    window.onresize = () => {
      setContentHeight(window.innerHeight - spaces);
    };

    return () => window.onresize = null;
  }, []);

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: false,
      hasSpeaker: false,
      hasNext: response,
      hasSkip: !response,
    });
  }, [fetchingData, response]);

  useEffect(() => {
    setResult('');
    setWord('');
    setIncorrectIndices([]);
    setCanRecord(false);
    handleReRecord();
  }, [id]);

  useEffect(() => {
    if (micState === 'playing') {
      setCanRecord(false);
    }

    if (micState === 'recording') {
      setDisableSpeaker(true);
    } else {
      setDisableSpeaker(false);
    }
  }, [micState]);

  useEffect(() => {
    if (micState === 'playing' && !canRecord) setBlinkSpeaker(true);
    else setBlinkSpeaker(false);
  }, [micState, canRecord]);

  useEffect(() => {
    setCanRecord(false);
    if (micState === 'playing' && isAudioEnded) {
      if (!recordedAudioPlaying) {
        setCanRecord(true);
      }
      return;
    }
    if (isAudioEnded) {
      setCanRecord(true);
    }
  }, [isAudioEnded]);

  const validResult = () => result === 'correct' || result === 'incorrect';

  const isLearningTypePhrase = () => learningType == 'phrase';

  const getTitle = () => {
    let title = '';
    if (canRecord && micState !== 'playing') title = 'まねして発音しましょう';
    else if (micState === 'playing') title = '録音音声を聞いて、正しく発音できたと思ったら解答結果へ進みましょう';
    else if (!canRecord) title = '音声を聞きましょう';

    return title;
  };

  const getContentProps = () => {
    if (micState === 'playing') return [];

    return {
      className: 'flex flex-col justify-between',
      style: {
        minHeight: contentHeight,
      },
    };
  };

  const stopBlinking = () => {
    if (forceStopBlinking) return true;

    if (response !== '' && !canRecord) return true;
    else if (!canRecord && micState === 'default') return false;
    else if (!canRecord && micState === 'playing') return false;
  };

  const questionTypeStyle = {
    sentenceReading: 'text-18 mt-px-8',
    shadowing: 'text-14 mt-px-25',
    overlapping: 'text-14 mt-px-25',
  };

  if (isShowCommentary) {
    return <Commentary
      question={titleItem}
      subQuestion={learningType === 'word' ? meaning : translation}
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

  const retry = () => {
    setForceStopBlinking(true);
    setCanRecord(false);
    handleReRecord();

    setTimeout(() => {
      play(categories);
      setForceStopBlinking(false);
    },500);

  };

  return (
    <div className="mt-px-24">
      <Alert
        show={errorMessage}
        callBack={() => setErrorMessage(null)}
        msg={errorMessage}
      />
      <AudioErrorModal />
      {instructionsModal && (
        <Modal
          className="mx-px-16 px-px-16 py-px-22"
          closeModalFunc={() => setInstructionsModal(false)}
        >
          <InstructionsModal userPreference={userPreference}/>
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
          <section {...getContentProps()}>
            <div>
              {micState && (
                <p className="font-semibold text-16 leading-px-23 text-center text-primary-500 mx-10">
                  { validResult() ? '' : getTitle() }
                </p>
              )}

              <div className={`mx-px-22 ${micState ? 'mt-px-20' : 'mt-px-50 -mb-px-1'}`}>
                <div className={!isLearningTypePhrase() ? 'text-center' : ''}>
                  <p className={`text-24 text-basic-100 ${style.englishQuestion}`}>
                    {titleItem}
                  </p>
                  <p className={`text-basic-100 ${isLearningTypePhrase() ? questionTypeStyle[camelCase(categories)] : 'mt-px-3 text-18'} ${style.subQuestion}`}>
                    {correctTranslation}
                  </p>
                </div>
                <div className='mt-px-22 text-center w-full'>
                  <div
                    className="disabled:opacity-50"
                  >
                    <QuestionSpeakerPlayer
                      category={categories}
                      isAudioPlaying={isAudioPlaying}
                      play={play}
                      response={response}
                      className="text-center mx-auto"
                      withLabel={true}
                      color="#43596D"
                      disableSpeaker={disableSpeaker}
                      stopBlinking={stopBlinking()}
                      setCanRecord={setCanRecord}
                      key={questionItem.id}
                    />
                  </div>
                </div>
                {canRecord && categories === 'sentence-reading' && (
                  <div className="text-11 text-progress-red font-bold flex justify-center pt-px-14">
                    {isPermissionDenied ? '※ マイクの使用を許可して、ページをリロードしてください。' : '※ 聞き取れなかった場合はもう一度聞きましょう'}
                  </div>
                )}

                {result && (
                  <h2 className={`text-24 font-black mb-px-5 ${style.resultText}`} style={{ color: questionHelper.getResponseColor(response) }}>
                    {response}
                  </h2>
                )}
              </div>
            </div>

            {micState === 'playing' ? (
              // After recording, user wiil either play recording or record again
              <Fragment>
                { validResult() ? (
                  <Fragment>
                    <ResultTextBox
                      questionType={learningType}
                      result={result}
                      sentence={upperCaseFirst(sentence)}
                      word={word}
                      response={response}
                      incorrectIndices={incorrectIndices}
                      category={categories}
                    />
                    <div className={`grid place-items-center mt-px-20 ${style.bottom}`}>
                      <PlayArrowIcon
                        height="59.07"
                        width="57.07"
                        onClick={() => handleMicClick() }
                      />
                      <p className="text-14 text-primary-500 leading-px-21 mt-px-2">録音音声を再生</p>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className={`flex items-center justify-center ml-3 ${ !validResult() ? style[`${learningType}ConfirmingContainer`] : style[`${learningType}ConfirmingSubContainer`]}`}>
                      <div className={style.playIcon}>
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
                )}
              </Fragment>
            ) : (
              // Prior recording, user will listen to audio
              <div>
                <div className={`grid justify-items-center ${style[`${micState}IconContainer`]}`}>
                  {micState === 'recording' && (
                    <p className="text-primary-500 text-11 font-bold">タップして録音を終了させます。</p>
                  )}
                  <Recorder
                    className="mt-px-8 flex justify-center"
                    type={canRecord ? micState : 'disabled'}
                    onClick={() => canRecord && handleMicClick()}
                    blink={canRecord && micState === 'default'}
                  />
                  {micState !== 'disabled' && (
                    <span className={`text-14 ${canRecord ? 'text-primary-500' : 'text-basic-300'} ${style[`${micState}RecorderText`]} ${(canRecord && micState === 'default') && style.blink}`}>
                      {micState === 'default' ? '録音する' : '録音終了'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </section>
        )
      }
    </div>
  );
};

export default SentenceReadingQuestion;
