import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import {
  goToNextQuestion,
  fetchQuestions,
  resetStates,
  startExercise,
  updatePhraseLogs,
  updateWordsLogs,
  setPunctuationMark,
  saveResult,
  triedRecording,
  assignEmptyValues,
} from '../../../../../../../redux/selfLearning/listening/exercise/slice';
import {
  questionsSelector,
  currentQuestionSelector,
  phraseLogSelector,
  currentLevelSelector,
} from '../../../../../../../redux/selfLearning/listening/exercise/selectors';

const useSLListeningExercise = (usePunctuationMark) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const setId = useParams().id;
  const questions = useSelector(questionsSelector);
  const currentQuestion = useSelector(currentQuestionSelector);
  const phraseLog = useSelector(phraseLogSelector);
  const currentLevel = useSelector(currentLevelSelector);
  const {
    currentQuestionNo,
    level,
    isFetchingQuestions,
    userProficiency,
    hasUsedPunctuationMark,
    phraseLogs,
    wordsLogs,
    isSavingResult,
  } = useSelector((state) => state.selfLearningListeningExercise);

  const correctAnswer = currentQuestion?.sentence;
  const questionPageNumber = `${currentQuestionNo}/${questions.length}`;
  const audioUrl = `${process.env.REACT_APP_SERVER_API}/api/lr-listening-audio/${currentLevel}/${currentQuestion?.audio_file}`;

  const hasReachToMaximum = () => currentQuestionNo === questions.length;
  const startDictation = () => dispatch(startExercise());
  const loadQuestions = () => dispatch(fetchQuestions(setId));
  const resetQuestions = () => dispatch(resetStates());
  const nextQuestion = () => dispatch(goToNextQuestion());
  const skipQuestion = () => dispatch(assignEmptyValues());
  const submitEvaluation = (phraseData, wordsData) => {
    dispatch(updatePhraseLogs(phraseData));
    dispatch(updateWordsLogs(wordsData));
  };
  const recordingOnHandler = () => dispatch(triedRecording());
  const proceedToResultPage = (logId) => history.push(`/self-learning/listening/${logId}/end`);
  const submitResultToApi = () => {
    const params = {
      'setId': setId,
      'wordsResult': wordsLogs,
      'phrasesResult': phraseLogs,
    };

    dispatch(saveResult(params)).then((res) => proceedToResultPage(res.payload.id));
  };

  useEffect(() => {
    if (usePunctuationMark !== undefined)
      dispatch(setPunctuationMark(usePunctuationMark));
  }, [usePunctuationMark]);

  return {
    audioUrl,
    correctAnswer,
    currentLevel,
    currentQuestionNo,
    currentQuestion,
    level,
    hasUsedPunctuationMark,
    isFetchingQuestions,
    userProficiency,
    questionPageNumber,
    setId,
    phraseLog,
    isSavingResult,
    hasReachToMaximum,
    proceedToResultPage,
    submitEvaluation,
    loadQuestions,
    nextQuestion,
    resetQuestions,
    startDictation,
    submitResultToApi,
    recordingOnHandler,
    skipQuestion,
  };
};

export default useSLListeningExercise;
