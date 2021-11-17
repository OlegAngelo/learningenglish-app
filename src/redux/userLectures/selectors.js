import { createSelector } from 'reselect';

export const userLecturesList = createSelector(
  (state) => state.userLectures,
  (userLectures) => userLectures.userLecturesList
);

export const isFetchingUserLecturesList = createSelector(
  (state) => state.userLectures,
  (userLectures) => userLectures.isFetchingUserLecturesList
);
