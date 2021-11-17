import { createSelector } from 'reselect';

export const adminList = createSelector(
  (state) => state.admin,
  (admin) => admin.admins
);

export const isFetchingAdminList = createSelector(
  (state) => state.admin,
  (admin) => admin.isFetchingAdminList
);
