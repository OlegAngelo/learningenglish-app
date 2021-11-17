import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserReadingApi from '../../../../api/SelfLearning/Reading/UserReadingApi';

export const fetchResult = createAsyncThunk(
  'userSLReading/fetchResult',
  async (payload) => {
    try {
      const response = await UserReadingApi.fetchResult(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const getLearningLog = createAsyncThunk(
  'userSLReading/getLearningLog',
  async (payload) => {
    try {
      const response = await UserReadingApi.getLearningLog(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

const exerciseSlice = createSlice({
  name: 'userSLReading',
  initialState: {
    result: null,
    isFetchingResult: true,
  },
  reducers: {
    resetStates: (state, action) => {
      state.result = null;
      state.isFetchingResult = true;
    },
  },
  extraReducers: {
    [fetchResult.pending]: (state, action) => {
      state.result = null;
      state.isFetchingResult = true;
    },
    [fetchResult.fulfilled]: (state, action) => {
      state.result = action.payload.data;
      state.isFetchingResult = false;
    },
  },
});

export const { resetStates } =  exerciseSlice.actions;

export default exerciseSlice.reducer;
