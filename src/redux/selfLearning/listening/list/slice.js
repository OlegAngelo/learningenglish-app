import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserListeningApi from '../../../../api/SelfLearning/Listening/UserListeningApi';

// async thunk actions
export const fetchListeningSets = createAsyncThunk(
  'listeningList/fetchListeningSets',
  async (payload) => {
    const response = await UserListeningApi.getListeningSets(payload);
    return response.data;
  }
);

// slice
const listeningListSlice = createSlice({
  name: 'listeningList',
  initialState: {
    isFetchingSets: true,
    sets: [],
  },
  reducers: {
    resetStates: (state) => {
      state.sets = [];
      state.isFetchingSets = true;
    },
  },
  extraReducers: {
    [fetchListeningSets.fulfilled]: (state, action) => {
      state.sets = action.payload;
      state.isFetchingSets = false;
    },
  },
});

export const {
  resetStates,
} = listeningListSlice.actions;

export default listeningListSlice.reducer;
