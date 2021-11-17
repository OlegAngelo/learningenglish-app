import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserReadingApi from '../../../../api/SelfLearning/Reading/UserReadingApi';

import { addTagsInChunks } from '../../../../utils/renderTooltip';

// async thunk actions
export const fetchSentenceChunks = createAsyncThunk(
  'exercise/fetchSentenceChunks',
  async (id) => {
    const response = await UserReadingApi.getSentenceChunks(id);
    return response.data;
  }
);

export const saveReadingLog = createAsyncThunk(
  'exercise/saveReadingLog',
  async (payload) => {
    const response = await UserReadingApi.saveReadingLog(payload);
    return response.data;
  }
);

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    // header props
    maxTimer: null,
    timer: null,

    totalChunks: 0,
    level: null,
    sentence: null,
    isFetchingChunks: true,
    chunks: [],
    unreadLines: [],
    finishedLines: [],
    totalOfLinesAnswered: 0, 
    userProficiency: {},
    timerWasStopped: false,

    logId: null,
  },
  reducers: {
    setFinishedLines: (state, action) => {
      const chunksWithTags = addTagsInChunks(state.sentence?.script, action.payload?.map(data => data.chunk));
      const finalChunks = action.payload?.slice().map((data, index) => {
        const final = {...data, chunk_with_tag: chunksWithTags[index]};
        return final;
      });

      localStorage.setItem('chunks_result', JSON.stringify(finalChunks));
      state.finishedLines = action.payload;
      state.totalOfLinesAnswered = state.totalOfLinesAnswered + 1;
    },
    setUnreadLines: (state, action) => {
      state.unreadLines = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload.timer;
      state.maxTimer = action.payload.maxTimer;
    },
    startTimer: (state) => {
      state.timerWasStopped = false;
    },
    stopTimer: (state) => {
      state.timerWasStopped = true;
    },
    resetStates: (state) => {
      state.maxTimer = 10;
      state.timer = 10;
      state.script = null;
      state.level = null;
      state.sentence = null;
      state.isFetchingChunks = true;
      state.unreadLines = [];
      state.finishedLines = [];
      state.totalOfLinesAnswered = 0;
      state.timerWasStopped = false;
      state.logId = null;
    },
  },
  extraReducers: {
    [fetchSentenceChunks.fulfilled]: (state, action) => {
      const data = action.payload;
      state.sentence = data;
      state.level = data.level;
      state.chunks = data.chunks;
      state.unreadLines = data.chunks;
      state.totalChunks = data.chunks?.length;
      if (data.chunks?.length > 0) {
        state.timer = data.chunks[0].limit_sec;
        state.maxTimer = data.chunks[0].limit_sec;
      }
      state.isFetchingChunks = false;
      state.userProficiency = data.user_proficiency;
    },
    [saveReadingLog.fulfilled]: (state, action) => {
      state.logId = action.payload[1].id;
    },
  },
});

export const {
  setFinishedLines,
  setUnreadLines,
  setTimer,
  setScript,
  resetStates,
  finishedLines,
  startTimer,
  stopTimer,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
