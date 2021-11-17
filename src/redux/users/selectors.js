import { createSelector } from 'reselect';

export const studentList = createSelector(
  (state) => state.users,
  (users) => users.students
);

export const isFetchingStudentList = createSelector(
  (state) => state.users,
  (users) => users.isFetchingStudentList
);
