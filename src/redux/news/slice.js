import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import moment from 'moment';
import _ from 'lodash';

import newsApi from '../../api/NewsApi';
import newsDetailApi from '../../api/NewsDetailApi';

export const fetchNewsList = createAsyncThunk(
  'news/fetchNewsList',
  async (payload) => {
    const response = await newsApi.getAdminNewsList(payload);

    return response.data;
  }
);
export const fetchUserNewsList = createAsyncThunk(
  'news/fetchUserNewsList',
  async (payload) => {
    try {
      const response = await newsApi.getUserNewsList(payload);
      return response.data;
    } catch(e) {
      console.error(e);
    }
  }
);
export const fetchNewsDetails = createAsyncThunk(
  'news/fetchNewsDetails',
  async (id) => {
    try {
      const response = await newsApi.getNewsDetails(id);
      return response.data;
    } catch(e) {
      console.error(e);
    }
  }
);
export const fetchUserNewsDetails = createAsyncThunk(
  'news/fetchUserNewsDetails',
  async (id) => {
    try {
      const response = await newsApi.getUserNewsDetails(id);
      return response.data;
    } catch(e) {
      console.error(e);
    }
  }
);
export const uploadThumbnail = createAsyncThunk('news/uploadThumbnail', async (payload) => {
  try {
    const response = await newsApi.uploadThumbnail(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const createVideo = createAsyncThunk(
  'news/createVideo',
  async (payload) => {
    const response = await newsApi.createVideo(payload);

    return response;
  }
);
export const importNewsList = createAsyncThunk('news/importNewsList', async (payload) => {
  try {
    const response = await newsApi.importNewsList(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const saveUserNewsAndPv = createAsyncThunk('news/saveUserNewsAndPv', async (payload) => {
  try {
    const response = await newsDetailApi.saveUserNewsAndPv(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const fetchThumbnail = createAsyncThunk('news/fetchThumbnail', async (payload) => {
  try {
    const response = await newsApi.getThumbnail(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const fetchAdminThumbnail = createAsyncThunk('news/fetchAdminThumbnail', async (payload) => {
  try {
    const response = await newsApi.getAdminThumbnail(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const toggleNewsBookmark = createAsyncThunk('news/toggleNewsBookmark', async (payload) => {
  try {
    const param = (typeof payload === 'object') ? payload.newsId : payload;
    const response = await newsApi.toggleBookmark(param);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const fetchBookmarkedNews = createAsyncThunk('news/fetchBookmarkedNews', async (payload) => {
    try {
      const response = await newsApi.getBookmarkedNews(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);
export const updatePublication = createAsyncThunk('news/updatePublication', async (payload) => {
  try {
    const response = await newsApi.updatePublication(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const saveNewsLog = createAsyncThunk('news/saveNewsLog', async (payload) => {
  try {
    const response = await newsDetailApi.saveNewsLog(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const fetchRecommendedNews = createAsyncThunk('news/fetchRecommendedNews', async (payload) => {
  try {
    const response = await newsDetailApi.getRecommendedNews(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const fetchNewsStatus = createAsyncThunk('news/fetchNewsStatus', async (payload) => {
  try {
    const response = await newsDetailApi.getNewsStatus(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});
export const exportNewsList = createAsyncThunk('news/exportNewsList', async (payload) => {
  try {
    const response = await newsApi.exportNewsList(payload);
    return response;
  } catch (e) {
    return e.response;
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    // news list
    isFetchingNewsList: true,
    userNews: [],
    currentPage: 1,
    lastPage: 1,
    
    // news detail
    news: null,
    newsDetails: null,
    hasBookmarked: false,
    isFetchingNewsDetails: true,

    // bookmark list
    bookmarkedNews: [],
    bookmarkCurrentPage: 1,
    bookmarkLastPage: 1,
    bookmarkTotal: 0,
    isReplaceBookmarkList: false,
    
    // others (unorganized)
    thumbnailPreviews: {},
    isSavingUserNewsAndPv: true,
    isFinishSortingFinalNews: false,
    finalUserNews: [],
    logNews: null,
    isProcessingFinishNews: false,
    studyDuration: 0,
    showFlash: false,
    hasFinished: false,
    recommendedNews: null,
    newsStatus: null,
    isFetchingNewsStatus: false,
    exportNewsParams: null,
    showTabsWhenFinished: false
  },
  reducers: {
    pushFinalUserNews: (state, action) => {
      let newData = action.payload;
      state.finalUserNews.push({ ...newData, image: newData.image ?? 'empty' });
    },
    setFinalUserNews: (state, action) => {
      state.finalUserNews = action.payload;
      state.isFinishSortingFinalNews = true;
    },
    resetUserNews: (state, action) => {
      state.userNews = [];
      state.currentPage = 1;
      state.lastPage = 1;
    },
    resetBookmarkNewsList: (state, action) => {
      if (action.payload) {
        state.isReplaceBookmarkList = true;
      } else {
        state.bookmarkedNews = [];
      }
      state.bookmarkCurrentPage = 1;
      state.bookmarkLastPage = 1;
      state.bookmarkTotal = 0;
    },
    resetNewsDetails: (state, action) => {
      state.newsDetails = null;
    },
    enableUserNewsFetching: (state) => {
      state.isFetchingNewsList = true;
    },
    updateNewsDetails: (state, action) => {
      state.newsDetails = action.payload;
    },
    addImageInBookmarkNews: (state, action) => {
      const newData = action.payload;
      let copyData = current(state.bookmarkedNews);

      state.bookmarkedNews = copyData.map((data) => {
        if (data.id === newData.id) return { ...data, image: newData.image ?? 'empty' };
        else return data;
      });
    },
    updateRecommendedNews: (state, action) => {
      state.recommendedNews = action.payload;
      state.isProcessingFinishNews = false;
    },
    addThumbnailPreview: (state, action) => {
      const { key, value } = action.payload;
      let tempThumbnails = state.thumbnailPreviews;
      tempThumbnails[key] = value;
      state.thumbnailPreviews = tempThumbnails;
    },
    resetExportParams: (state) => {
      state.exportNewsParams = null;
    },
    removeBookmark: (state, action) => {
      state.bookmarkedNews = state.bookmarkedNews.filter((news) => {
        return news.id !== action.payload;
      });
    },
  },
  extraReducers: {
    [fetchNewsList.pending]: (state) => {
      state.isFetchingNewsList = true;
    },
    [fetchNewsList.fulfilled]: (state, action) => {
      state.news = action.payload;
      state.isFetchingNewsList = false;
      state.newsDetails = null;
    },
    [fetchUserNewsList.pending]: (state, action) => {
      state.isFetchingNewsList = true;
    },
    [fetchUserNewsList.fulfilled]: (state, action) => {
      state.userNews = [
        ...state.userNews,
        ...action.payload.data,
      ];

      state.currentPage = action.payload.current_page;
      state.lastPage = action.payload.last_page;

      state.newsDetails = null;
      state.hasBookmarked = false;
      state.isFetchingNewsDetails = true;
      state.isFetchingNewsList = false;
      state.hasFinished = false; // to be able to show the finish button again
    },
    [fetchNewsDetails.fulfilled]: (state, action) => {
      const {log_news} = action.payload;

      state.newsDetails = action.payload;
      state.showTabsWhenFinished = log_news.length > 0;
      state.isFetchingNewsDetails = false;
    },
    [fetchUserNewsDetails.pending]: (state) => {
      state.isFetchingNewsDetails = true;
    },
    [fetchUserNewsDetails.fulfilled]: (state, action) => {
      const {log_news} = action.payload;

      state.newsDetails = action.payload;
      state.showTabsWhenFinished = log_news.length > 0;
      state.hasBookmarked = !!action.payload?.news_bookmarks?.length;
      state.isFetchingNewsDetails = false;
    },
    [saveUserNewsAndPv.fulfilled]: (state) => {
      state.isSavingUserNewsAndPv = false;
    },
    [fetchBookmarkedNews.fulfilled]: (state, action) => {
      let news = action.payload.data.data;

      state.bookmarkCurrentPage = action.payload.data.current_page;
      state.bookmarkLastPage = action.payload.data.last_page;
      state.bookmarkTotal = action.payload.data.total;

      if (state.isReplaceBookmarkList) {
        state.bookmarkedNews = news;
      } else {
        state.bookmarkedNews = [
          ...state.bookmarkedNews,
          ...news
        ];
      }

      state.isReplaceBookmarkList = false;
      state.newsDetails = null;
      state.hasBookmarked = false;
      state.userNews = [] = state.finalUserNews = [];
      state.isFinishSortingFinalNews = false;
      state.isFetchingNewsDetails = true;
      state.hasFinished = false; // to be able to show the finish button again
    },
    [saveNewsLog.fulfilled]: (state, action) => {
      const data = action.payload.data;
      state.logNews = data.log_news;
      state.news = data.news;
      state.hasBookmarked = data.news.news_bookmarks?.length;
      state.hasFinished = true;

      var startTime = moment(data.log_news.started_at);
      var end = moment(data.log_news.finished_at);
      state.studyDuration = moment.duration(end.diff(startTime)).asMinutes();
    },
    [saveNewsLog.pending]: (state, action) => {
      state.isProcessingFinishNews = true;
    },
    [toggleNewsBookmark.pending]: (state, action) => {
      state.showFlash =
        typeof action.meta.arg === 'object' ? action.meta.arg.flash : true;
      state.hasBookmarked = !state.hasBookmarked;
    },
    [toggleNewsBookmark.fulfilled]: (state, action) => {
      state.showFlash = false;
    },
    [fetchRecommendedNews.fulfilled]: (state, action) => {
      const data = action.payload.data;
      if (typeof data === 'string' || (typeof data === 'object' && data[0].thumbnail === null)) {
        state.isProcessingFinishNews = false;
      }
      state.recommendedNews = typeof data === 'string' ? data : data[0];
    },
    [fetchNewsStatus.pending]: (state, action) => {
      state.newsStatus = null;
      state.isFetchingNewsStatus = true;
    },
    [fetchNewsStatus.fulfilled]: (state, action) => {
      state.newsStatus = action.payload.data;
      state.isFetchingNewsStatus = false;
    },
    [exportNewsList.fulfilled]: (state, action) => {
      const { meta } = action;
      state.exportNewsParams = {
        startDate: meta.arg.startDate,
        endDate: meta.arg.endDate,
      };
    },
  }
});

export const {
  pushFinalUserNews,
  setFinalUserNews,
  resetUserNews,
  resetBookmarkNewsList,
  resetNewsDetails,
  updateNewsDetails,
  addImageInBookmarkNews,
  updateRecommendedNews,
  enableUserNewsFetching,
  addThumbnailPreview,
  resetExportParams,
  removeBookmark,
} = newsSlice.actions;

export default newsSlice.reducer;
