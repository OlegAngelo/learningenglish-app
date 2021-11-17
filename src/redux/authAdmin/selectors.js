import { createSelector } from 'reselect';

export const authAdmin = createSelector(
  (state) => state.authAdmin,
  (authAdmin) => authAdmin.profile
);

export const isFetchingAuthAdmin = createSelector(
  (state) => state.authAdmin,
  (authAdmin) => authAdmin.isFetchingAuthAdmin
);
