import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';

import { log } from '../../../../utils/loggerHelper';
import questionHelper from '../../../../utils/questionHelper';
import {
  getQuestionComponent,
  judgeHasTimeLimit,
  questionAudioType,
  isQuestionWithSelectionOrTyping,
} from './Types';
import { compareStrings } from '../../../../utils/text';

import Header from '../../../../shared/Header';
import HeaderClose from '../../../../shared/Header/Close';
import Loading from '../../../../shared/Loading';
import ExamHeader from './components/ExamHeader';
import QuestionnaireFooter from '../components/QuestionnaireFooter';
import CommentaryBubble from '../components/QuestionnaireFooter/CommentaryBubble';
import RetryModal from './components/RetryModal';
import StartCountdown from './components/StartCountdown';

import proficiencyApi from '../../../../api/ProficiencyApi';
import questionApi from '../../../../api/QuestionApi';

import { useHint } from '../../../../hooks/useHint';
import useAudio from '../../../../hooks/useExamAudio';
import useDetectInterrupt from '../../../../hooks/useDetectInterrupt';

// Redux
import {
  questionSet,
  totalQuestions,
  fetching,
  inProgressUnitId,
} from '../../../../redux/exam/selectors';
import {
  fetchQuestions,
  resetState,
  fetchLectureQuestions,
  fetchLectureQuestionsPreview,
  saveLectureResult,
} from '../../../../redux/exam/slice';
import { resetResultData } from '../../../../redux/training/slice';
import { fetchPreferences } from '../../../../redux/userPreference/slice'

import questionTimer from '../../../../config/questionTypeTimer.json';

import style from './Exam.module.css';
import useCountDown from '../../../../hooks/useCountDown';
import { displayResultMessage } from './computed';
import useTimer from '../../../../hooks/useTimer';
import useQuestionHandler from '../../../../hooks/useQuestionHandler';
import { isFromAdmin } from '../../../../utils/IsFromAdmin';

import QuestionWrapper, { QuestionWrapperContext } from './components/QuestionWrapper';
import { checkIfFromLecture } from '../../../../utils/isFromLecture';

const Exam = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const fetchedQuestionSet = useSelector(questionSet);
  const fetchedTotalQuestions = useSelector(totalQuestions);
  const isFetching = useSelector(fetching);
  const userInProgressUnitId = useSelector(inProgressUnitId);
  const { preferences: userPreference } = useSelector(state => state.userPreferences)

  const [unitId, setUnitId] = useState(useParams().unitId);
  
  const { learningType, questionType, categories, questionIds } = queryString.parse(useLocation().search);

  const isFromLecture = checkIfFromLecture(questionType);

  const title =  isFromLecture ? '確認問題' : `Unit ${(unitId) ? unitId : '1'}`;

  const [isShowCommentary, setIsShowCommentary] = useState(false);

  // Handling Answers
  const [response, setResponse] = useState('');
  const [selected, setSelected] = useState('');
  const [sentence, setSentence] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isSavingResult, setIsSavingResult] = useState(false);

  // Close State
  const [interrupted, setInterrupted] = useState(false);

  // Setting Questions
  const {
    totalQuestionCount,
    Question,
    questionData,
    questionIndex,
    questionItem,
    questionSetIndex,
    setQuestion,
    setQuestionItem,
    setQuestionData,
    setQuestionIndex,
    setQuestionSetIndex,
    setTotalQuestionCount,
    setIsShowCommentaryBubble,
    getNextQuestion,
    getCorrectAnswers,
    isShowCommentaryBubble,
    filterIncorrectAnswers,
    formatAnswers,
    redirectToEnd,
    checkIfLastItemInRetry
   } = useQuestionHandler();

  const { hint, clearHint, hintQuestionHandler } = useHint(null);

  const {
    countdown,
    isCountdownScreen
  } = useCountDown({
    seconds: 3,
    shouldStart: !isFetching
  });

  const {
    timerMaxSeconds,
    timerSeconds,
    setTimerSeconds,
    setTimerMaxSeconds
   } = useTimer();

  // Identifiers
  const [hasTimeLimit, setHasTimeLimit] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isShowfooter, setIsShowfooter] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hasIncorrectAnswer, setHasIncorrectAnswer] = useState(false);
  const [ willUnmount, setWillUnmount ] = useState(false);
  const [retryIteration, setRetryIteration ] = useState(0);
  const {setDetectInterrupt} = useDetectInterrupt({ setInterrupted });
  const [blinkSpeaker, setBlinkSpeaker] = useState(false);

  // Audio
  const [isListeningAudio, setIsListeningAudio] = useState(false);
  

  // Modal State - To be Refactored
  const [openRetryModal, setOpenRetryModal] = useState(false);

  // Question
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
    getNextQuestion,
    questionType,
    unitId,
  });

  // question handler
  const setQuestionComponent = (setIndex, data = questionData) => {
    const selectedType = data[setIndex].category;

    setIsListeningAudio(questionAudioType(selectedType));
    setTimerMaxSeconds(getQuestionTimer(selectedType));
    setHasTimeLimit(isFromAdmin ? false : judgeHasTimeLimit(selectedType));
    setQuestion(() => getQuestionComponent(selectedType));
  };

  const nextQuestionHandler = async () => {
    let storedAnswers = answers;
    setResponse('');
    setHasAnswered(false);
    clearHint();
    stop();

    if (!selected?.length && timerSeconds != 0) {
      storedAnswers = formatAnswers(
        answers,
        hint,
        timerSeconds,
        questionItem,
        learningType,
        questionData[questionSetIndex].category
      );

      setAnswers(storedAnswers);
    }

    const { next, shouldSwitchCategory } = getNextQuestion();

    if (next) {
      setQuestionIndex(next.questionIndex);

      if (shouldSwitchCategory) {
        setQuestionSetIndex(next.questionSetIndex);
        setQuestionComponent(next.questionSetIndex);
      }
    } else {
      let showRetryModal = userPreference.length === 0 || userPreference[0].show_retry_modal;
      const totalQuestions = storedAnswers.length;

      storedAnswers = storedAnswers.map((result) => {
        return {
          ...result,
          is_correct: result.is_correct && !result.is_skipped,
        };
      });

      const correctAnswers = storedAnswers.filter((result) => result.is_correct).length;

      if (!hasIncorrectAnswer) {
        setIsSavingResult(true);
        await saveAnswers(storedAnswers);
        setIsSavingResult(false);

        if (showRetryModal) {
          setOpenRetryModal(true)
        }
      }


      const allAnswersAreCorrect = !checkIfHasIncorrectAnswers(storedAnswers);
      const payload = {
        isFromLecture,
        totalQuestions,
        correctAnswers,
        allAnswersAreCorrect,
        unitId,
        questionType,
        prevPath: `${location.pathname}${location.search}`,
      }

      redirectToEnd(payload, () => dispatch(resetState()))
    }
  };

  /**
   * Reassign all incorrect questions to questionSet
   * Answer incorrect questions again
   * @param object answers
   * @returns boolean (if it did retried)
   */
  const checkIfHasIncorrectAnswers = (answers) => {
    let correctAnswers = getCorrectAnswers(answers);

    setRetryIteration(retryIteration + 1);

    let filteredIncorrectAnswers = filterIncorrectAnswers(correctAnswers, questionData)

    if (filteredIncorrectAnswers.length != 0) {
      checkIfLastItemInRetry(filteredIncorrectAnswers[0].questions.length, setIsFetchingData)
      setHasIncorrectAnswer(true);
      setQuestionIndex(0);
      setQuestionSetIndex(0);
      setQuestionData(filteredIncorrectAnswers);
      setQuestionComponent(0, filteredIncorrectAnswers);
      forceSetAudioUrl(filteredIncorrectAnswers[0].questions[0]);
      localStorage.setItem('isRetry', true);
    }

    return filteredIncorrectAnswers.length != 0;
  };

  useEffect(() => {
    if (timerSeconds == 0) {
      setTimeout(() => {
        setIsTimerExceeded(true);
      }, 500);

      let correctAnswer = questionHelper.getCorrectAnswer(
        questionItem,
        learningType,
        questionData[questionSetIndex].category
      );

      // get evaluation when timers run out (either "Failed..." or "Keep it up!!")
      const evaluation = questionHelper.getEvaluationTimesUp(
        questionData[questionSetIndex].category
      );

      setSelected(correctAnswer);
      setResponse(evaluation);
      setAnswers([
        ...answers,
        {
          type: questionData[questionSetIndex].category,
          id: questionItem.id,
          answer_evaluation: evaluation,
          choice_id: null,
          is_correct: false,
          answer_time: 0,
          is_skipped: false,
          is_used_hint: hint ? true : false,
          input_spelling: null,
          voice_text: null,
          voice_accuracy_rate: null,
        },
      ]);
    }
  }, [timerSeconds]);

  // event handler for saving answer
  useEffect(() => {
    if (answers?.length && !hasAnswered) {
      const notCaseSensitiveCategories = ['instant-composition','word-typing','audio-typing','spelling'];
      const category = questionData[questionSetIndex].category;
      const forNotCaseSensitive = !notCaseSensitiveCategories.includes(category);
      const correctAnswer = questionHelper.getCorrectAnswer(
        questionItem,
        learningType,
        category
      );

      // check if timer has runs out & the user answer is correct
      const isCorrect = timerSeconds
        ? compareStrings(correctAnswer, selected, forNotCaseSensitive)
        : false;
      let answer = answers.pop();
      let newAnswer = {
        ...answer,
        answer_evaluation: isCorrect
          ? questionHelper.getResponseText(timerProps.percentage, timerProps.seconds)
          : response,
        is_correct: answer.is_used_hint ? false : isCorrect,
        answer_time: timerSeconds,
        is_skipped: answer.is_skipped ?? false,
      };

      answers.splice(0, answers.length, ...answers, newAnswer);
    }
  }, [answers]);

  // Questions
  const saveAnswers = async (answers) => {
    log('------ Question API Sample --------');
    log('answers:');
    log(answers);
    log('------------------------------');

    // console.log('Save answers!!!');

    if (isFromAdmin) {
      return;
    } else if (isFromLecture) {
      await dispatch(
        saveLectureResult({
          answers,
          lectureId: unitId,
          learningType,
        })
      ).then((response) => { });
    } else {
      await questionApi
        .saveResult(answers, unitId, questionType, learningType)
        .then((res) => {
          log('Response: ', res.data);
          localStorage.setItem('log_learn_session_id', res.data.id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Init Fetch
  useEffect(() => {
    localStorage.setItem('selected_lesson_type', learningType);
    const prevRoute = localStorage.getItem('prev_route');
    let prevRouteMatch = false;
    if (prevRoute) {
      prevRouteMatch = prevRoute.match(/\/training\/muscle-exam\/.*\/end/);

      if (!prevRouteMatch) {
        localStorage.setItem('training_set_id', 1);
      }
    }

    // When use finish exam it will redirect to Check list
    if (questionType === 'checklist') {
      localStorage.setItem('fromChecklist', true)
    }

    if (isFromAdmin) {
      dispatch(
        fetchLectureQuestionsPreview({ learningType, questionIds })
      );
    } else if (isFromLecture) {
      dispatch(
        fetchLectureQuestions({
          lectureId: unitId,
          learningType,
        })
      ).then((response) => {
        if (unitId === undefined) {
          setUnitId(response.payload.lectureId);
        }
      });
    } else {
      dispatch(
        fetchQuestions({
          unitId,
          learningType,
          questionType,
          categories,
        })
      ).then((response) => {
        const trainingSetId = localStorage.getItem('training_set_id');
        let tempUnitId = unitId;
  
        if (unitId === undefined) {
          tempUnitId = response.payload.inProgressUnitId;
          setUnitId(tempUnitId);
        }
        if (!prevRouteMatch || (prevRouteMatch && parseInt(trainingSetId) === 1)) {
          proficiencyApi
            .getOverallProficiencyByUnit(tempUnitId)
            .then((response) => {
              const { data } = response;
              questionHelper.setLocalStorageTotalProficiency(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }

    dispatch(resetResultData());
  }, []);

  useEffect(() => {
    if (willUnmount || isFetching) return;

    if (fetchedQuestionSet.length) {
      localStorage.setItem('examTotalQuestions', fetchedTotalQuestions);
      setTotalQuestionCount(fetchedTotalQuestions);
      setQuestionData(fetchedQuestionSet);
      setQuestionComponent(questionSetIndex, fetchedQuestionSet);

      if (userInProgressUnitId && !isFromLecture) {
        setUnitId(userInProgressUnitId);
        localStorage.setItem('unit_id', userInProgressUnitId);
      }

      setIsFetchingData(false);
    } else {
      const url = questionType == 'quick-start' ? '/' : '/training/muscle-courses';
      log(questionType)
      const message = `${questionType.replace('-', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, a => a.toUpperCase())}に属する単語はありません。`;

      history.push({
        pathname: url,
        params: {
          message: message
        }
      });
    }
  }, [isFetching]);

  useEffect(() => {
    return () => {
      setWillUnmount(true);
      dispatch(resetState());
      setDetectInterrupt(false);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('is_exam_interrupted', interrupted);
  }, [interrupted])

  useEffect(() => {
    if (questionData.length < 1) return;
    log('category: ', questionData[questionSetIndex].category);
    log(
      'question item: ',
      questionData[questionSetIndex].questions[questionIndex]
    );
    setQuestionItem(questionData[questionSetIndex].questions[questionIndex]);
    setResponse('');
    setSelected('');

    // setQuestionType(questionData[questionSetIndex].category);

    setTimerSeconds(getQuestionTimer(questionData[questionSetIndex].category));
    setIsTimerExceeded(false);
    setIsShowCommentary(false);
    dispatch(fetchPreferences());
  }, [questionData, questionIndex, questionSetIndex]);

  const [footerProps, setFooterProps] = useState({
    hasLightBulb: false,
    hasBack: false,
    hasSkip: false,
    hasSpeaker: true,
    hasNext: true,
  });

  // Hide speaker icon in footer when it's in commentary page.
  useEffect(() => {
    if (isShowCommentary) {
      setFooterProps({
        ...footerProps,
        hasSpeaker: false,
      });
    }
  }, [isShowCommentary]);


  const [isTimerExceeded, setIsTimerExceeded] = useState(false);

  const getCurrentQuestionNumber = () => {
    let questionCount = 0;

    questionData.slice(0, questionSetIndex).forEach((questionSet) => {
      questionCount += questionSet.question_count;
    });

    return questionCount + questionIndex + 1;
  };

  const onClickCommentaryHandler = () => {
    setIsShowCommentary(true);
  };

  const getQuestionTimer = (selectedType) => {
    return questionTimer[selectedType];
  };

  useEffect(() => {
    if (selected) {
      setHasAnswered(true);
    }
  }, [selected]);

  const timerProps = {
    seconds: timerSeconds,
    percentage: questionHelper.calculateTimerPercentage(
      !hasTimeLimit || isShowCommentary,
      timerSeconds,
      timerMaxSeconds
    ),
  };

  const checkAnswer = (is_correct, seconds) => is_correct && seconds != 0;


  // this will auto start & reset the timer to max by question category
  const resetTimerHandler = (isInterrupted = false) => {
    setInterrupted(isInterrupted);
    setTimerSeconds(getQuestionTimer(questionData[questionSetIndex].category));
  };

  const resultMessage = displayResultMessage({
    isFromAdmin,
    timerSeconds,
    hasTimeLimit,
    isShowCommentary,
    timerMaxSeconds
  });

  const examHeaderProps = {
    timerSeconds,
    timerHandler: setTimerSeconds,
    timerMaxSeconds,
    hasTimeLimit,
    isShowCommentary,
    isTimerExceeded,
    response,
    preventTimerUpdateConditions:
      isCountdownScreen || interrupted || (isListeningAudio && !isAudioEnded) || openRetryModal,
    totalQuestionCount,
    getCurrentQuestionNumber,
    retry: hasIncorrectAnswer,
  };

  const questionProps = {
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
    resultMessage,
    isShowfooter,
    setIsShowfooter,
    categories: questionData[questionSetIndex]?.category,
    learningType,
    hint,
    isAudioEnded,
    isAudioPlaying,
    AudioErrorModal,
    play,
    playSentence,
    setBlinkSpeaker,
    setIsShowCommentaryBubble,
    resetTimerHandler,
    setInterrupted,
    key: retryIteration + questionItem?.id,
  };

  const startCountdownProps = {
    countdown,
    isFetchingData,
    isFromLecture,
    isFromAdmin,
  };


  if (isFetchingData) {
    return <Loading height="h-screen" rootPosition="relative" />;
  } else if (isCountdownScreen) {
    return <StartCountdown {...startCountdownProps} />;
  } else {
    return (
      <Fragment>
        <QuestionWrapper questionProps={questionProps}>
          {isSavingResult && <Loading height="h-screen"/>}
          <div className={style.fixedBackground} />
        
          <div className="z-10 w-full min-h-screen mb-px-16 pb-px-57">
            <Header title={title} hasBack={false}>
              { !isFromAdmin &&
                <HeaderClose
                  setInterrupted={setInterrupted}
                  resetExamState={() => dispatch(resetState())}
                  retry={hasIncorrectAnswer}
                  isFromLecture={isFromLecture}
                />
              }
            </Header>
          
            <ExamHeader {...examHeaderProps} />

            {/* To be Refactored This is Body Component */}
            <div
              className={`${
                timerSeconds === 0 &&
                questionData[questionSetIndex].category === 'instant-utterance'
                  ? 'mb-px-100'
                  : ''
              }`}
            >
              <Question />
            </div>
    
            {/* For questions that have selections/choices, since client wants the button to appear below choices. */}
            {isShowCommentaryBubble && response && !isShowCommentary && (
              <CommentaryBubble
                onClick={onClickCommentaryHandler}
                className="mt-8 mb-10 mr-2 pb-14"
              />
            )}
    
            <RetryModal
              isOpen={openRetryModal}
              onClose={() => setOpenRetryModal(false)}
              userPreference={userPreference}
            />
            {/* To be Refactored This is Body Component */}
    
          </div>
    
          {isShowfooter && (
            <Fragment>
              <QuestionnaireFooter
                {...footerProps}
                isShowCommentary={isShowCommentary}
                nextQuestion={nextQuestionHandler}
                hintQuestion={hintQuestionHandler}
                play={play}
                isAudioEnded={isAudioEnded}
                isAudioPlaying={isAudioPlaying}
                correctAnswer={questionHelper.getCorrectAnswer(
                  questionItem,
                  learningType,
                  questionData[questionSetIndex].category
                )}
                category={questionData[questionSetIndex].category}
                blinkSpeaker={blinkSpeaker}
              />
    
            </Fragment>
          )}
        </QuestionWrapper>
      </Fragment>
    );
  };
};

export default Exam;
