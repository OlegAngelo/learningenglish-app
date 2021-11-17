import { createSelector } from 'reselect';

export const overallKnowledge = createSelector(
  (state) => state.proficiency,
  (proficiency) => proficiency.overallKnowledge
);

export const calculatePhrasePercentage = createSelector(
  (state) => state.proficiency,
  (proficiency) => {
    const {
      masterCount,
      inProgressCount,
      notTriedCount,
    } = proficiency.phrasesKnowledge;

    const total = masterCount + inProgressCount + notTriedCount;

    return [
      {
        name: 'In Progress',
        text: inProgressCount,
      },
      {
        name: 'Not Tried',
        text: notTriedCount,
      },
      {
        name: 'Mastered',
        text: masterCount,
      },
    ];
  }
);

export const calculateWordPercentage = createSelector(
  (state) => state.proficiency,
  (proficiency) => {
    const {
      masterCount,
      inProgressCount,
      notTriedCount,
    } = proficiency.wordsKnowledge;

    const total = masterCount + inProgressCount + notTriedCount;

    return [
      {
        name: 'Not Tried',
        text: notTriedCount,
      },
      {
        name: 'Mastered',
        text: masterCount,
      },
      {
        name: 'In Progress',
        text: inProgressCount,
      },
    ];
  }
);

export const overallKnowledgeByUnit = createSelector(
  (state) => state.proficiency,
  (proficiency) => proficiency.overallKnowledgeByUnit
);

export const calculatePhrasePercentageByUnit = createSelector(
  (state) => state.proficiency,
  (proficiency) => {
    const {
      masterCount,
      inProgressCount,
      notTriedCount,
    } = proficiency.phrasesKnowledgeByUnit;

    const total = masterCount + inProgressCount + notTriedCount;

    return [
      {
        name: 'In Progress',
        text: inProgressCount,
      },
      {
        name: 'Not Tried',
        text: notTriedCount,
      },
      {
        name: 'Mastered',
        text: masterCount,
      },
    ];
  }
);

export const calculateWordPercentageByUnit = createSelector(
  (state) => state.proficiency,
  (proficiency) => {
    const {
      masterCount,
      inProgressCount,
      notTriedCount,
    } = proficiency.wordsKnowledgeByUnit;

    const total = masterCount + inProgressCount + notTriedCount;

    return [
      {
        name: 'Not Tried',
        text: notTriedCount,
      },
      {
        name: 'Mastered',
        text: masterCount,
      },
      {
        name: 'In Progress',
        text: inProgressCount,
      },
    ];
  }
);

export const proficiencyForAllUnits = createSelector(
  (state) => state.proficiency,
  (proficiency) => proficiency.allUnits
);
