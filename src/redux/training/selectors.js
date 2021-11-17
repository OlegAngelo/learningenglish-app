import { createSelector } from 'reselect';

export const lastTrainingTimestamp = createSelector(
  (state) => state.training,
  (training) => training.lastTrainingTimestamp
);

export const isFetchingLastTrainingTimestamp = createSelector(
  (state) => state.training,
  (training) => training.isFetchingLastTrainingTimestamp
);

export const lastMotivationTimestamp = createSelector(
  (state) => state.training,
  (training) => training.lastMotivationTimestamp
);

export const isFetchingLastMotivationTimestamp = createSelector(
  (state) => state.training,
  (training) => training.isFetchingLastMotivationTimestamp
);

export const getTrainingOverallProficiencyScore = createSelector(
  (state) => state.training,
  (training) => training.overAllProficiencyScore,
);

export const getTrainingProficiencyData = createSelector(
  (state) => state.training,
  (training) => training.proficiencyData
);

export const getTrainingResults = createSelector(
  (state) => state.training,
  (training) => training.trainingResultData,
);

export const getTrainingVocabularies = createSelector(
  (state) => state.training,
  (training) => training.trainingVocabularies
);

export const getTrainingUnit = createSelector(
  (state) => state.training,
  (training) => training.trainingUnit
);

export const getTrainingVocabIndex = createSelector(
  (state) => state.training,
  (training) => training.trainingVocabularyIndex
);

export const getTrainingResultsByUnit = createSelector(
  (state) => state.training,
  (training) => training.trainingResultByUnitData
);
