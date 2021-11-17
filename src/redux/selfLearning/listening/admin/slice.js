import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import AdminListeningApi from '../../../../api/SelfLearning/Listening/AdminListeningApi';

// async thunk actions
export const importSLListening = createAsyncThunk(
  'adminSLListening/importSLListening',
  async (payload) => {
    try {
      const response = await AdminListeningApi.import(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchList = createAsyncThunk(
  'adminSLListening/fetchList',
  async (payload) => {
    try {
      const response = await AdminListeningApi.fetchList(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);


export const saveSetDetails = createAsyncThunk(
  'adminSLListening/saveSetDetails',
  async (payload) => {
    try {
      const response = await AdminListeningApi.saveSetDetails(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const fetchPhraseData = createAsyncThunk(
  'adminSLListening/fetchPhraseData',
  async (payload) => {
    try {
      const response = await AdminListeningApi.fetchPhraseData(payload);
      return response.data;
    } catch (e) {
      return e.response;
    }
  }
);

const readingSlice = createSlice({
  name: 'adminSLListening',
  initialState: {
    listeningList: [],
    isFetchingList: true,
    listPaginator: null,
        
    // Phrase data
    isFetchingPhraseData: true,
    phraseData: {}
  },
  reducers: {
    resetListeningList: (state, action) => {
      state.listeningList = [];
      state.isFetchingList = true;
      state.listPaginator = null;
    },
    resetPhraseData: (state, action) => {
      state.phraseData = {};
      state.isFetchingList = true;
    },
  },
  extraReducers: {
    [fetchList.pending]: (state, action) => {
      state.listeningList = [];
      state.isFetchingList = true;
      state.listPaginator = null;
    },
    [fetchList.fulfilled]: (state, action) => {
      const { data } = action.payload.data;
      state.listeningList = data;
      state.isFetchingList = false;
      state.listPaginator = action.payload.data;
    },
    [fetchPhraseData.pending]: (state, action) => {
      state.isFetchingPhraseData = true;
    },
    [fetchPhraseData.fulfilled]: (state, action) => {
      state.phraseData = action.payload;
      state.isFetchingPhraseData = false;
    },
  },
});

export const {
  resetListeningList,
  resetPhraseData,
} = readingSlice.actions;

export default readingSlice.reducer;
