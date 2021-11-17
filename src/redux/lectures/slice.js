import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import _ from 'lodash';

import lectureApi from '../../api/LectureApi';

export const uploadThumbnail = createAsyncThunk(
  'lectures/uploadThumbnail',
  async (payload) => {
    try {
      const response = await lectureApi.uploadThumbnail(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const uploadExcerise = createAsyncThunk(
  'lectures/uploadExcerise',
  async (payload) => {
    try {
      const response = await lectureApi.uploadExcerise(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const hardDeleteExcerises = createAsyncThunk(
  'lectures/hardDeleteExcerises',
  async (payload) => {
    try {
      const response = await lectureApi.hardDeleteExcerises(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const createOnDemandVideo = createAsyncThunk(
  'lectures/createOnDemandVideo',
  async (payload) => {
    const response = await lectureApi.createOnDemandVideo(payload);
    return response;
  }
);

export const deleteVimeoVideo = createAsyncThunk(
  'lectures/deleteVimeoVideo',
  async (payload) => {
    try {
      const response = await lectureApi.deleteVimeoVideo(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchLectureList = createAsyncThunk(
  'lectures/fetchLectureList',
  async (payload) => {
    try {
      const response = await lectureApi.fetchLectureList(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchOnDemandVideos = createAsyncThunk(
  'lectures/fetchOnDemandVideos',
  async (payload) => {
    try {
      const response = await lectureApi.fetchOnDemandVideos(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchOnDemandVideoDetails = createAsyncThunk(
  'lectures/fetchOnDemandVideoDetails',
  async (payload) => {
    try {
      const response = await lectureApi.fetchOnDemandVideoDetails(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchLecture = createAsyncThunk(
  'lectures/fetchLecture',
  async (payload) => {
    try {
      const response = await lectureApi.fetchLecture(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const updateOnDemandVideoDetails = createAsyncThunk(
  'lectures/updateOnDemandVideoDetails',
  async (payload) => {
    try {
      const response = await lectureApi.updateOnDemandVideoDetails(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchAdminLectureDetail = createAsyncThunk(
  'lectures/fetchAdminLectureDetail',
  async (payload) => {
    try {
      const response = await lectureApi.fetchAdminLectureDetail(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const deleteOnDemandVideoDetails = createAsyncThunk(
  'lectures/deleteOnDemandVideoDetails',
  async (payload) => {
    try {
      const response = await lectureApi.deleteOnDemandVideoDetails(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const deleteLectureDetails = createAsyncThunk(
  'lectures/deleteLectureDetails',
  async (payload) => {
    try {
      const response = await lectureApi.deleteLectureDetails(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchThumbnail = createAsyncThunk(
  'lectures/fetchThumbnail',
  async (payload) => {
    try {
      const response = await lectureApi.getAdminThumbnail(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchLectureExercise = createAsyncThunk(
  'lectures/fetchLectureExercise',
  async (payload) => {
    try {
      const response = await lectureApi.fetchLectureExercise(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const deleteLectureExercise = createAsyncThunk(
  'lectures/deleteLectureExercise',
  async (payload) => {
    try {
      const response = await lectureApi.deleteLectureExercise(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const addLectureExcerise = createAsyncThunk(
  'lectures/addLectureExcerise',
  async (payload) => {
    try {
      const response = await lectureApi.addLectureExcerise(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const publishOnDemand = createAsyncThunk(
  'lectures/publishOnDemand',
  async (payload) => {
    try {
      const response = await lectureApi.publishOnDemand(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

const lecturesSlice = createSlice({
  name: 'lectures',
  initialState: {
    lecturesList: [],
    lecturesListPaginator: null,
    isFetchingLecturesList: true,
    adminLectureDetail: null,
    isFetchingLecture: true,
    lectureDetails: null,
    fetchingLectureExercise: true,
    lectureExercise: null,
    fetchingVideoDetails: true,
    videoDetails: {},
    adminVideoList: [],
    fetchingVideoList: true,
    lectureExerciseIdsToUpload: [],

    // lectures edit
    isClickSave: false,

    // lecture live convert to ondemand
    isClickTab: false,
    tabLink: '',
  },
  reducers: {
    setIsClickTab: (state, action) => {
      state.isClickTab = action.payload;
    },
    setTabLink: (state, action) => {
      state.tabLink = action.payload;
    },
    setIsClickSave: (state, action) => {
      state.isClickSave = action.payload;
    },
    resetLecturesList: (state, action) => {
      state.lecturesList = [];
      state.lecturesListPaginator = null;
      state.isFetchingLecturesList = true;
    },
    resetAdminLectureDetail: (state) => {
      state.adminLectureDetail = null;
    },
    resetLectureDetails: (state, action) => {
      state.isFetchingLecture = true;
      state.lectureDetails = null;
    },
    resetLectureExercise: (state, action) => {
      state.fetchingLectureExercise = true;
      state.lectureExercise = null;
    },
    resetVideoDetails: (state) => {
      state.fetchingVideoDetails = true;
      state.videoDetails = {};
    },
    resetAdminVideoList: (state) => {
      state.fetchingVideoList = true;
      state.adminVideoList = [];
    },
    resetLectureExerciseIdsToUpload: (state) => {
      state.lectureExerciseIdsToUpload = [];
    },
    setVideoDetails: (state, action) => {
      state.videoDetails = action.payload;
    },
  },
  extraReducers: {
    [fetchLectureList.fulfilled]: (state, action) => {
      const { data } = action.payload.data;
      state.lecturesList = data;
      state.isFetchingLecturesList = false;
      state.lecturesListPaginator = action.payload.data;
    },
    [fetchAdminLectureDetail.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.adminLectureDetail = data;
    },
    [fetchLecture.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.lectureDetails = data;
      state.isFetchingLecture = false;
    },
    [fetchLectureExercise.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.lectureExercise = data;
      state.fetchingLectureExercise = false;
    },
    [uploadExcerise.fulfilled]: (state, action) => {
      if (!action?.payload) return;
      state.lectureExerciseIdsToUpload = action.payload.data.map((item) => item.id);
    },
    [addLectureExcerise.fulfilled]: (state, action) => {
      if (!action?.payload) return;
      const { data } = action.payload;
      state.lectureExercise = data;
      state.fetchingLectureExercise = false;
    },
    [fetchOnDemandVideoDetails.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.fetchingVideoDetails = false;
      state.videoDetails = data;
    },
    [deleteLectureExercise.fulfilled]: (state, action) => {
      if (!action.payload) return;

      const { status } = action.payload;
      if (status === 201) state.lectureExercise = [];
    },
    [fetchOnDemandVideos.fulfilled]: (state, action) => {
      if (!action?.payload) return;

      const { data } = action.payload;
      state.adminVideoList = data;
      state.fetchingVideoList = false;
    },
    [fetchOnDemandVideos.pending]: (state, action) => {
      state.adminVideoList = [];
      state.fetchingVideoList = true;
    },
  },
});

export const {
  setIsClickTab,
  setTabLink,
  setIsClickSave,
  resetLecturesList,
  resetAdminLectureDetail,
  resetLectureDetails,
  resetLectureExercise,
  setVideoDetails,
  resetVideoDetails,
  resetAdminVideoList,
  resetLectureExerciseIdsToUpload,
} = lecturesSlice.actions;

export default lecturesSlice.reducer;
