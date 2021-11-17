import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserReadingApi from '../../../../api/SelfLearning/Reading/UserReadingApi';

// async thunk actions
export const fetchReadingSentences = createAsyncThunk(
  'readingList/fetchReadingSentences',
  async (payload) => {
    const response = await UserReadingApi.getReadingSentences(payload);
    return response.data;
  }
);
export const fetchLevel = createAsyncThunk(
  'readingList/fetchLevel',
  async (id) => {
    const response = await UserReadingApi.getLevel(id);
    return response.data;
  }
);


// slice
const readingListSlice = createSlice({
  name: 'readingList',
  initialState: {
    isFetchingSentences: true,
    sentences: [],
    level: null,
  },
  reducers: {
    resetStates: (state) => {
      state.sentences = [];
      state.isFetchingSentences = true;
      state.level = null;
    },
  },
  extraReducers: {
    [fetchReadingSentences.fulfilled]: (state, action) => {
      const data = action.payload;
      state.sentences = data;
    },
    [fetchLevel.fulfilled]: (state, action) => {
      state.level = action.payload;
      state.isFetchingSentences = false;
    },
  },
});

export const {
  resetStates,
} = readingListSlice.actions;

export default readingListSlice.reducer;
