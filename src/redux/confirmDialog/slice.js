import { createSlice } from '@reduxjs/toolkit';

const confirmDialogSlice = createSlice({
  name: 'confirmDialog',
  initialState: {
    confirmBeforeLeaving: false,
    hasPressOkey: false,
  },
  reducers: {
    ccnfirmBeforeLeaving: (state) => {
      state.confirmBeforeLeaving = true;
    },
    hasPressOkey: (state) => {
      state.hasPressOkey = true;
    },
    removeConfirmDailog: (state) => {
      state.confirmBeforeLeaving = false;
      state.hasPressOkey = false;
    },
  },
  extraReducers: {},
});

export const { ccnfirmBeforeLeaving, hasPressOkey, removeConfirmDailog } =
  confirmDialogSlice.actions;

export default confirmDialogSlice.reducer;
