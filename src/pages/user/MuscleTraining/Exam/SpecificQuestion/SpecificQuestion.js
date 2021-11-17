import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';

// Redux
import { useDispatch } from 'react-redux';
import { fetchPreferences } from '../../../../../redux/userPreference/slice'

import questionHelper from '../../../../../utils/questionHelper';
import {
  getQuestionComponent,
  judgeHasTimeLimit,
  questionAudioType,
  isQuestionWithSelectionOrTyping,
} from '../Types';

import Commentary from './Commentary';
import CommentaryBubble from '../../components/QuestionnaireFooter/CommentaryBubble';
import ExamHeader from '../components/ExamHeader';
import Header from '../../../../../shared/Header';
import HeaderClose from '../../../../../shared/Header/Close';
import Loading from '../../../../../shared/Loading';
import HomeIcon from '../../../../../shared/icons/HomeIcon';
import LightBulbIcon from '../../../../../shared/icons/LightBulb';
import NextIcon from '../../../../../shared/icons/NextIcon';
import StartCountdown from '../components/StartCountdown';

import questionApi from '../../../../../api/QuestionApi';

import { useHint } from '../../../../../hooks/useHint';
import useAudio from '../../../../../hooks/useExamAudio';

import style from './SpecificQuestion.module.css';
import { displayResultMessage } from '../computed';
import QuestionWrapper from '../components/QuestionWrapper/QuestionWrapper';

const SpecificQuestion = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { startCountdown, timer } = queryString.parse(useLocation().search);
  const [timerMaxSeconds, setTimerMaxSeconds] = useState(timer || 20);
  const [timerSeconds, setTimerSeconds] = useState(timerMaxSeconds);
  const [hasTimeLimit, setHasTimeLimit] = useState(true);
  const [interrupted, setInterrupted] = useState(false);
  const [isShowCommentary, setIsShowCommentary] = useState(false);
  const [isTimerExceeded, setIsTimerExceeded] = useState(false);
  const [sentence, setSentence] = useState('');
  const [response, setResponse] = useState('');
  const [selected, setSelected] = useState('');
  const [answers, setAnswers] = useState([]);
  const [unitId, setUnitId] = useState(null);
  const [questionItem, setQuestionItem] = useState(null);
  const [nextQuestionId, setNextQuestionId] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isListeningAudio, setIsListeningAudio] = useState(false);
  const [Question, setQuestion] = useState(null);
  const [blinkSpeaker, setBlinkSpeaker] = useState(false);
  const [isShowCommentaryBubble, setIsShowCommentaryBubble] = useState(true);
  const [isShowfooter, setIsShowfooter] = useState(true);
  const [footerProps, setFooterProps] = useState({
    hasLightBulb: false,
    hasBack: false,
    hasSkip: false,
    hasSpeaker: true,
    hasNext: true,
  });
  const { hint, hintQuestionHandler } = useHint(null);
  const { learningType, category, id } = useParams();
  const {
    isAudioEnded,
    isAudioPlaying,
    play,
    stop,
    AudioErrorModal,
    playSentence,
    forceSetAudioUrl,
  } = useAudio({
    isFetchingData,
    learningType,
    questionItem,
    setInterrupted,
    getNextQuestion: null,
    unitId,
  });

  const [countdown, setCountdown] = useState(startCountdown || 3);
  const isCountdownScreen = countdown > 0;

  const timerProps = {
    seconds: timerSeconds,
    percentage: questionHelper.calculateTimerPercentage(
      !hasTimeLimit || isShowCommentary,
      timerSeconds,
      timerMaxSeconds
    ),
  };

  const timerHandler = (time) => {
    setTimerSeconds(time);
  };

  const examHeaderProps = {
    timerSeconds,
    timerHandler,
    timerMaxSeconds,
    hasTimeLimit,
    isShowCommentary,
    isTimerExceeded,
    response,
    totalQuestionCount: 1,
    getCurrentQuestionNumber: () => 1,
    preventTimerUpdateConditions:
      isCountdownScreen || interrupted || (isListeningAudio && !isAudioEnded),
  };

  const checkAnswer = (is_correct, seconds) => is_correct && seconds != 0;

  const displayMessage = () => {
    return questionHelper.getResponseText(
      questionHelper.calculateTimerPercentage(
        !hasTimeLimit || isShowCommentary,
        timerSeconds,
        timerMaxSeconds
      ),
      timerSeconds
    );
  };

  // this will auto start & reset the timer to max by question category
  const resetTimerHandler = () => {
    setInterrupted(false);
    timerHandler(getQuestionTimer(category));
  };

  const resultMessage = displayResultMessage({
    isFromAdmin: false,
    timerSeconds,
    hasTimeLimit,
    isShowCommentary,
    timerMaxSeconds
  });

  const questionProps = {
    resultMessage,
    footerProps,
    setFooterProps,
    timerProps,
    isShowCommentary,
    response,
    setResponse,
    selected,
    setSelected,
    sentence,
    setSentence,
    questionItem,
    answers,
    setAnswers,
    checkAnswer,
    displayMessage,
    isShowfooter: false,
    setIsShowfooter,
    categories: category,
    learningType,
    hint,
    isAudioEnded,
    isAudioPlaying,
    AudioErrorModal,
    play,
    playSentence,
    setBlinkSpeaker,
    setIsShowCommentaryBubble,
    setInterrupted,
    resetTimerHandler,
  };

  useEffect(() => {
    const wordList = [
      'audio-typing',
      'sentence-reading',
      'word-translation-selection',
      'audio-word-selection',
      'english-selection',
      'spelling',
      'english-speech-recognition',
      'voice-listening',
    ];
    const phraseList = [
      'word-typing',
      'sentence-reading',
      'reading',
      'listening',
      'instant-composition',
      'instant-utterance',
      'vacancy-filling-problem',
      'phrase-english-selection',
      'phrase-voice-listening',
    ];

    if (
      (learningType === 'word' && !wordList.includes(category)) ||
      (learningType === 'phrase' && !phraseList.includes(category))
    ) {
      return;
    }

    fetchQuestion();

    localStorage.setItem('selected_lesson_type', learningType);

    // This will be called in `src/shared/Header/Header.js`
    window.specificQuestionBackToQuestionScreen = () => {
      setIsShowCommentary(false);
      setResponse(null);
      setSelected(null);
    };

    dispatch(fetchPreferences());

    return () => window.specificQuestionBackToQuestionScreen = undefined;
  }, []);

  const fetchQuestion = async () => {
    await questionApi.getQuestion(learningType, id).then(({ data }) => {
      const {
        question_data,
        next_question_id,
      } = data;
      
      setUnitId(question_data.training_unit_id);
      setQuestionItem(question_data);
      setNextQuestionId(next_question_id);
      setIsFetchingData(_.isEmpty(question_data));
      setQuestionComponent(0, question_data);
      forceSetAudioUrl(question_data);
    });
  };

  const getQuestionTimer = (selectedType) => {
    const options = {
      10: ['audio-word-selection', 'word-translation-selection'],
    };

    if (timer) return timer;
    if (options[10].includes(selectedType)) return 10;

    return 20;
  };

  const hintOnClickHandler = (hint) => {
    const correctAnswer = questionHelper.getCorrectAnswer(
      questionItem,
      learningType,
      category
    );

    setSelected(hint);
    hintQuestionHandler(correctAnswer, category);
  };

  const setQuestionComponent = () => {
    setIsListeningAudio(questionAudioType(category));
    setTimerMaxSeconds(getQuestionTimer(category));
    setHasTimeLimit(judgeHasTimeLimit(category));
    setQuestion(() => getQuestionComponent(category));
  };

  // event for setting answer and msg based on timer
  useEffect(() => {
    if (timerSeconds == 0) {
      setTimeout(() => {
        setIsTimerExceeded(true);
      }, 500);

      let correctAnswer = questionHelper.getCorrectAnswer(
        questionItem,
        learningType,
        category
      );

      setSelected(correctAnswer);
      setResponse('Failed...');
      setAnswers([
        ...answers,
        {
          type: category,
          id: questionItem.id,
          answer_evaluation: response,
          choice_id: null,
          is_correct: false,
          answer_time: 0,
          is_skipped: false,
          is_used_hint: hint !== '',
          input_spelling: null,
          voice_text: null,
          voice_accuracy_rate: null,
        },
      ]);
    }
  }, [timerSeconds]);

  if (isCountdownScreen) {
    const startCountdownProps = {
      countdown,
      setCountdown,
      isFetchingData,
    };

    if (isFetchingData) return <Loading />;
    if (questionItem.deleted_at !== null) return <Loading />;
    if (startCountdown) return <StartCountdown {...startCountdownProps} />;
  }

  const getCommentaryComponent = (params) => {
    return (
      isShowCommentaryBubble && response && !isShowCommentary && (
        <CommentaryBubble
          onClick={() => setIsShowCommentary(true)}
          className="mt-8 mb-3 mr-2"
        />
      )
    );
  };

  return (
    <Fragment>
      <QuestionWrapper questionProps={questionProps}>
        <div className={style.fixedBackground} />

        <div className="z-10 w-full min-h-screen pb-px-96">
          <Header
            title={`Unit ${unitId}`}
            hasBack={isShowCommentary}
          >
            <HeaderClose
              isSpecificQuestion={true}
              setInterrupted={setInterrupted}
            />
          </Header>
          
          <ExamHeader {...examHeaderProps} />

          {Question && (
            <div
              className={`${
                timerSeconds === 0 &&
                category === 'instant-utterance'
                  ? 'mb-px-100'
                  : ''
              }`}
            >
              <Question />
            </div>
          )}

          {!response && <div style={{ height: '40px' }}></div>}

          {getCommentaryComponent()}
        </div>
      
        <footer className="bg-basic-400 pb-px-10 fixed bottom-0 w-full flex flex-col justify-end">
          <div className={`grid grid-cols-3 gap-2 text-center ${style.footerContent}`}>
            <div className="col-span-1">
              {footerProps.hasLightBulb && (
                <button
                  className={`w-1/2 ${style.footerIcon}`}
                  onClick={() => hintOnClickHandler(hint)}
                >
                  <LightBulbIcon
                    isActive={selected}
                    width="13"
                    height="18"
                    className={`text-center mx-auto mt-px-5 ${style.footerIcon}`}
                  />
                  <div
                    style={{ color: selected === hint ? '#0C5F8D' : '#43596D' }}
                    className="text-8 text-center font-bold mx-auto mt-px-4"
                  >
                    ヒント
                  </div>
                </button>
              )}
            </div>
            <div className="col-span-1">
              <Link to="/" exact className="text-8 text-center font-bold mx-auto">
                <HomeIcon
                  className={`text-center mx-auto ${style.footerIcon}`}
                  color={'#43596D'}
                />
                <p style={{ color: '#43596D' }} className={`text-8 mt-px-6`}>
                  TOP
                </p>
              </Link>
            </div>

            <div className="col-span-1">
              {response && (
                <button
                  className="w-1/2"
                  onClick={() => {
                    setIsFetchingData(true);
                    history.push(
                      `/training/muscle-exam-test/${learningType}/${nextQuestionId}/${category}`
                    );
                    history.go(0);
                  }}
                >
                  <NextIcon className={`text-center mx-auto ${style.footerIcon}`} />
                  <div
                    style={{ color: '#43596D' }}
                    className={`text-8 text-center font-bold mx-auto mt-px-4`}
                  >
                    NEXT
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className={`flex justify-between content-center px-px-10 pb-px-3 text-14`}>
            <div>{id}</div>
            <div>{category}</div>
          </div>
        </footer>
      </QuestionWrapper>
    </Fragment>
  );
};

export default SpecificQuestion;
