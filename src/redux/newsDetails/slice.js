import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTab: 'en'
};

export const newsDetailSlice = createSlice({
  name: 'newsDetail',
  initialState,
  reducers: {
    setTabValue: (state, action) => {
      state.currentTab = action.payload;
    },
    resetNewsDetailStates: (state) => {
      state.currentTab = 'en';
    }
  },
});

export const { setTabValue, resetNewsDetailStates } = newsDetailSlice.actions;

export default newsDetailSlice.reducer;
