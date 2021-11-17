import { createSelector } from 'reselect';

export const word = createSelector(
  (state) => state.checklist,
  (checklist) => checklist.word,
);

export const phrase = createSelector(
  (state) => state.checklist,
  (checklist) => checklist.phrase,
);

export const isFetching = createSelector(
  (state) => state.checklist,
  (checklist) => checklist.isFetching,
);

export const getCheckListResults = createSelector(
  (state) => state.checklist,
  (checklist) => checklist
);

export const getCheckListByUnit = createSelector(
  (state) => state.checklist,
  (checklist) => checklist.checkListUnit
);

export const getCheckListIndex = createSelector(
  (state) => state.checklist,
  (checklist) => checklist.checkListIndex
);
