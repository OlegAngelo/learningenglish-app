import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import AdminReadingApi from '../../../../api/SelfLearning/Reading/AdminReadingApi';

export const fetchList = createAsyncThunk(
  'adminSLReading/fetchList',
  async (payload) => {
    try {
      const response = await AdminReadingApi.fetchList(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

export const importSLReading = createAsyncThunk(
  'adminSLReading/importSLReading',
  async (payload) => {
    try {
      const response = await AdminReadingApi.import(payload);
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

const readingSlice = createSlice({
  name: 'adminSLReading',
  initialState: {
    readingList: [],
    isFetchingList: true,
    listPaginator: null,
  },
  reducers: {
    resetReadingList: (state, action) => {
      state.readingList = [];
      state.isFetchingList = true;
      state.listPaginator = null;
    },
  },
  extraReducers: {
    [fetchList.pending]: (state, action) => {
      state.readingList = [];
      state.isFetchingList = true;
      state.listPaginator = null;
    },
    [fetchList.fulfilled]: (state, action) => {
      const { data } = action.payload.data;
      state.readingList = data;
      state.isFetchingList = false;
      state.listPaginator = action.payload.data;
    },
  },
});

export const {
  resetReadingList,
} = readingSlice.actions;

export default readingSlice.reducer;
