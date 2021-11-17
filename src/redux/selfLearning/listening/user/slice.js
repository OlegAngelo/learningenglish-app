import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserListeningApi from '../../../../api/SelfLearning/Listening/UserListeningApi';

export const getListeningLogs = createAsyncThunk(
  'userSLListening/getLearningLog',
  async (payload) => {
    const response = await UserListeningApi.getListeningLogs(payload);
    return response.data;
  }
);

const exerciseSlice = createSlice({
  name: 'userSLListening',
  initialState: {
    result: null,
    isFetchingResult: true,
  },
  reducers: {
    resetStates: {},
  },
  extraReducers: {},
});

export const { resetStates } = exerciseSlice.actions;

export default exerciseSlice.reducer;
