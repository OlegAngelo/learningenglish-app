import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Player from '@vimeo/player';

import lectureApi from '../../api/LectureApi';
import UserLectureDetailApi from '../../api/UserLectureDetailApi';

export const fetchUserLectureDetails = createAsyncThunk(
  'userLectureDetails/fetchUserLectureDetails',
  async (payload, thunkAPI) => {
    try {
      const response = payload?.isAdminPreview
        ? await lectureApi.adminPreviewLectureDetails(payload?.lectureId)
        : await lectureApi.fetchUserLectureDetails(payload);

      if (payload?.isAdminPreview) {
        thunkAPI.dispatch(
          fetchThumbnail({
            thumbnail: response.data.thumbnail,
            isAdminPreview: true,
          })
        );
      } else thunkAPI.dispatch(fetchThumbnail(response.data.thumbnail));
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchLectureDetails = createAsyncThunk(
  'userLectureDetails/fetchLectureDetails',
  async (payload, thunkAPI) => {
    const { lectureId } = payload;
    try {
      const response = await UserLectureDetailApi.getDetails({lectureId});
      thunkAPI.dispatch(fetchThumbnail(response.data.details.thumbnail))
      return response.data;
    } catch(err) {
      console.error(err)
    }
  }
);

export const fetchThumbnail = createAsyncThunk(
  'userLectureDetails/fetchThumbnail',
  async (payload) => {
    const response = payload?.isAdminPreview
      ? await UserLectureDetailApi.previewAdminImage(payload?.thumbnail)
      : await UserLectureDetailApi.fetchImage(payload);
    return response.data;
  }
);

export const saveOnDemandVideoLogs = createAsyncThunk(
  'userLectures/saveOnDemandVideoLogs',
  async (payload) => {
    try {
      const response = await lectureApi.saveOnDemandVideoLogs(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const updateOnDemandVideoLogs = createAsyncThunk(
  'userLectures/updateOnDemandVideoLogs',
  async (payload) => {
    try {
      const response = await lectureApi.updateOnDemandVideoLogs(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

const initialState = {
  lectureData: {},
  thumbnail: null,
  fetcthing: true,

  //vimeo video
  vimeoId: null,
  videoId: null,
  videoLogId: null,
  firstPlayOfVideo: false,
  videoTime: {},
  videoRealTime: {},
  isDefaultVideo: false,
  isPlaying: false,
  playbackRate: 1,
  hasCompletedVideo: false,
  videoCompleted: false,

  // lecture details:
  lecture: null,
};

export const userLectureDetailSlice = createSlice({
  name: 'userLectureDetails',
  initialState,
  reducers: {
    setVimeoId: (state, action) => {
      state.vimeoId = action.payload.vimeoId;
      state.videoId = action.payload.videoId;
      state.isDefaultVideo = action.payload.isDefault ?? false;
    },
    resetVimeoPlayer: (state) => {
      state.vimeoId = null;
      state.videoId = null;
      state.videoLogId = null;
      state.firstPlayOfVideo = false;
      state.videoTime = {};
      state.videoRealTime = {};
      state.isDefaultVideo = false;
      state.isPlaying = false;
      state.playbackRate = 1;
      state.videoCompleted = false;
    },
    removeThumbnail: (state) => {
      state.thumbnail = null;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVideoCompleted: (state, action) => {
      state.videoCompleted = action.payload;
    },
    setFirstPlayOfVideo: (state, action) => {
      state.firstPlayOfVideo = action.payload;
    },
    setVideoTime: (state, action) => {
      state.videoTime = action.payload;
    },
    setVideoRealTime: (state, action) => {
      state.videoRealTime = action.payload;
    },
    setVideoLogId: (state, action) => {
      state.videoLogId = action.payload;
    },
    togglePlay: (state, action) => {
      let player = new Player('handstick', {
        id: state.vimeoId,
      });

      if (state.isPlaying) {
        player
          .pause()
          .catch(function (error) {
            console.error(error)
            action.payload.onErrorCallback(error)
          });
      } else {
        player
          .play()
          .catch(function (error) {
            action.payload.onErrorCallback(error)
          });
      }
      state.isPlaying = !state.isPlaying;
    },
    setPlaybackRate: (state, action) => {
      let player = new Player('handstick', {
        id: state.playerId,
      });

      player
        .setPlaybackRate(action.payload)
        .then((playbackRate) => {
          state.playbackRate = action.payload;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setHasCompletedVideo: (state, action) => {
      state.hasCompletedVideo = action.payload;
    },
    resetHasCompletedVideo: (state) => {
      state.hasCompletedVideo = false;
    },
  },
  extraReducers: {
    [fetchUserLectureDetails.pending]: (state, action) => {
      state.lecture = null;
    },
    [fetchUserLectureDetails.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.lecture = data;
    },
    [fetchLectureDetails.fulfilled]: (state, action) => {
      state.lectureData = action.payload;
      state.fetching = false;
    },
    [fetchThumbnail.fulfilled]: (state, action) => {
      state.thumbnail = action.payload;
    },
  }
});

export const {
  setVimeoId,
  resetVimeoPlayer,
  setIsPlaying,
  togglePlay,
  setPlaybackRate,
  reducerName,
  updateVideo,
  setFirstPlayOfVideo,
  setVideoTime,
  setVideoLogId,
  setHasCompletedVideo,
  resetHasCompletedVideo,
  removeThumbnail,
  resetDetails,
  setVideoRealTime,
  setVideoCompleted,
} = userLectureDetailSlice.actions;

export default userLectureDetailSlice.reducer;
