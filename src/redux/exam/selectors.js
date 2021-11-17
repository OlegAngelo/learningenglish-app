import { createSelector } from 'reselect';

export const questionSet = createSelector(
  (state) => state.exam,
  (exam) => exam.questionSet,
);

export const totalQuestions = createSelector(
  (state) => state.exam,
  (exam) => exam.totalQuestions
);

export const fetching = createSelector(
  (state) => state.exam,
  (exam) => exam.fetching
);

export const inProgressUnitId = createSelector(
  (state) => state.exam,
  (exam) => exam.inProgressUnitId
);

export const hasChoice = createSelector(
  (state) => state.exam,
  (exam) => exam.hasChoice
);
