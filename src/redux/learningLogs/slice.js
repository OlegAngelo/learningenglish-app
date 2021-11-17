import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import LearningLogsApi from '../../api/LearningLogsApi';

export const fetchLearningMission = createAsyncThunk(
  'learningLogs/fetchLearningMission',
  async (payload) => {
    const date = DateTime.fromJSDate(payload.date).toFormat('yyyy-MM-dd');

    try {
      const response = await LearningLogsApi.getLearningMission(date);

      return response.data;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchCalendarLearningLogs = createAsyncThunk(
  'learningLogs/fetchCalendarLearningLogs',
  async () => {
    try {
      const response = await LearningLogsApi.getCalendarLogs();
      return response.data;
    } catch(e) {
      console.error(e)
    }
  }
);

export const fetchTrainingLogs = createAsyncThunk(
  'userSLReading/fetchTrainingLogs',
  async (payload) => {
    try {
      const response = await LearningLogsApi.getTrainingLogs(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchLectureLogs = createAsyncThunk(
  'userSLReading/fetchLectureLogs',
  async (payload) => {
    try {
      const response = await LearningLogsApi.getLectureLogs(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchNewsLogs = createAsyncThunk(
  'userSLReading/fetchNewsLogs',
  async (payload) => {
    try {
      const response = await LearningLogsApi.getNewsLogs(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

// slice
const learningLogsSlice = createSlice({
  name: 'learningLogs',
  initialState: {
    logMission: null,
    calendarLogs: null,
    fetchingData: true,
    fetchingLogMission: true,
    fetchingTrainingLogs: true,
    fetchingLectureLogs: true,
    lectureLogs: [],
    fetchingNewsLogs: true,
    newsLogs: [],
    muscleTrainingLogs: [],
    listeningLogs: [],
    readingLogs: [],
  },
  reducers: {
    resetLogs: (state) => {
      state.fetchingLogMission = true;
      state.fetchingTrainingLogs = true;
      state.fetchingLectureLogs = true;
      state.fetchingNewsLogs = true;
      state.lectureLogs = [];
      state.newsLogs = [];
      state.muscleTrainingLogs = [];
      state.listeningLogs = [];
      state.readingLogs = [];
    },
  },
  extraReducers: {
    [fetchLearningMission.pending && fetchCalendarLearningLogs.pending]: (state) => {
      state.fetchingData = true;
    },
    [fetchLearningMission.pending]: (state) => {
      state.fetchingLogMission = true;
    },
    [fetchLearningMission.fulfilled]: (state, action) => {
      state.logMission = action.payload;
      state.fetchingData = false;
      state.fetchingLogMission = false;
    },
    [fetchCalendarLearningLogs.fulfilled]: (state, action) => {
      state.calendarLogs = action.payload;
      state.fetchingData = false;
    },
    [fetchTrainingLogs.pending]: (state, action) => {
      state.fetchingTrainingLogs = true;
    },
    [fetchTrainingLogs.fulfilled]: (state, action) => {
      state.fetchingTrainingLogs = false;
      if (!action?.payload) return;
      const { payload } = action;
      state.muscleTrainingLogs = payload?.data?.muscle_training;
      state.readingLogs = payload?.data?.reading;
      state.listeningLogs = payload?.data?.listening;
    },
    [fetchLectureLogs.pending]: (state, action) => {
      state.fetchingLectureLogs = true;
    },
    [fetchLectureLogs.fulfilled]: (state, action) => {
      state.fetchingLectureLogs = false;
      if (!action?.payload) return;
      const { payload } = action;
      state.lectureLogs = payload?.data;
    },
    [fetchNewsLogs.pending]: (state, action) => {
      state.fetchingNewsLogs = true;
    },
    [fetchNewsLogs.fulfilled]: (state, action) => {
      state.fetchingNewsLogs = false;
      if (!action?.payload) return;
      const { payload } = action;
      state.newsLogs = payload?.data;
    }
  },
});

export const { setFetchingData, resetLogs } = learningLogsSlice.actions;

export default learningLogsSlice.reducer;
