import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import lectureApi from '../../api/LectureApi';

export const fetchUserLectureList = createAsyncThunk(
  'userLectures/fetchUserLectureList',
  async (payload) => {
    try {
      const response = await lectureApi.fetchUserLectureList(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchThumbnail = createAsyncThunk(
  'userLectures/fetchThumbnail',
  async (payload) => {
    try {
      const response = await lectureApi.getThumbnail(payload);
      return response;
    } catch (e) {
      return e.response;
    }
});

export const fetchUserOnDemandVideos = createAsyncThunk(
  'userLectures/fetchUserOnDemandVideos',
  async (payload) => {
    try {
      const response = await lectureApi.fetchUserOnDemandVideos(payload);
      return response;
    } catch (e) {
      return e.response;
    }
});

export const saveOndemandLogs = createAsyncThunk(
  'userLectures/saveOndemandLogs',
async (payload) => {
  try {
    const response = await lectureApi.saveOnDemandLogs(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});

export const saveLiveLogs = createAsyncThunk(
  'userLectures/saveLiveLogs',
async (payload) => {
  try {
    const response = await lectureApi.saveLiveLogs(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});

export const saveLiveView = createAsyncThunk(
  'userLectures/saveLiveView',
async (payload) => {
  try {
    const response = await lectureApi.saveLiveView(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});

const userLecturesSlice = createSlice({
  name: 'userLectures',
  initialState: {
    // images
    thumbnailPreviews: {},

    // lectures
    userLecturesList: [],
    selectedLectureLiveId: null,
    showFilters: true,
    pageYOffset: 0,

    // for loading
    isFetchingUserLecturesList: true,
    isFetchingUserLectureDetails: true,

    // paginate
    currentPage: 1,
    lastPage: 1,
  },
  reducers: {
    resetUserLectures: (state) => {
      state.isFetchingUserLecturesList = true;
      state.userLecturesList = [];
      state.currentPage = 1;
      state.lastPage = 1;
      state.selectedLectureLiveId = null;
    },
    resetUserDetails: (state) => {
      state.isFetchingUserLectureDetails = true;
    },
    addThumbnailPreview: (state, action) => {
      const { key, value } = action.payload;
      let tempThumbnails = state.thumbnailPreviews;
      tempThumbnails[key] = value;
      state.thumbnailPreviews = tempThumbnails;
    },
    setSelectedLectureLiveId: (state, action) => {
      state.selectedLectureLiveId = action.payload;
    },
    setShowFilters: (state, action) => {
      const { pageYOffset, showFilters } = action.payload;
      state.showFilters = showFilters;
      state.pageYOffset = pageYOffset;
    },
    resetShowFilters: (state) => {
      state.showFilters = true;
      state.pageYOffset = 0;
    },
  },
  extraReducers: {
    [fetchUserLectureList.fulfilled]: (state, action) => {
      state.userLecturesList = [
        ...state.userLecturesList,
        ...action.payload.data.data,
      ];

      state.currentPage = action.payload.data.current_page;
      state.lastPage = action.payload.data.last_page;
      state.isFetchingUserLecturesList = false;
    },
    [saveOndemandLogs.fulfilled]: (state, action) => {
      state.isFetchingUserLectureDetails = false;
    },
    [saveLiveLogs.fulfilled]: (state, action) => {
      state.isFetchingUserLectureDetails = false;
    },
  },
});

export const {
  addThumbnailPreview,
  resetUserLectures,
  resetUserDetails,
  setSelectedLectureLiveId,
  setShowFilters,
  resetShowFilters,
} = userLecturesSlice.actions;

export default userLecturesSlice.reducer;
