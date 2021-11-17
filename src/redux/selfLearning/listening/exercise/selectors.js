import { createSelector } from 'reselect';
import { useParams } from 'react-router';

export const questionsSelector = createSelector(
  (state) => state.selfLearningListeningExercise,
  (data) => {
    return data?.questions;
  }
);

export const currentQuestionSelector = createSelector(
  (state) => state.selfLearningListeningExercise,
  (data) => {
    const setId = useParams().id;
    const questions = data?.questions;
    const currentQuestionNo = data?.currentQuestionNo - 1;

    let question = questions ? questions[currentQuestionNo] : null;
    return question && { ...question, setId };
  }
);

export const currentLevelSelector = createSelector(
  (state) => state.selfLearningListeningExercise,
  (data) => {
    const setId = useParams().id;
    const questions = data?.questions;
    const currentQuestionNo = data?.currentQuestionNo - 1;

    return questions[currentQuestionNo]?.set?.level?.order ?? null;
  }
);

export const phraseLogSelector = createSelector(
  (state) => state.selfLearningListeningExercise,
  (data) => {
    const phraseLogs = data?.phraseLogs;

    return phraseLogs ? phraseLogs[data?.currentQuestionNo - 1] : null;
  }
);
