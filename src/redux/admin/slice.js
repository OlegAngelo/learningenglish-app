import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminApi from '../../api/AdminApi.js';

export const fetchAdminList = createAsyncThunk(
  'admin/fetchAdminList',
  async (params) => {
    const response = await adminApi.getAdminList(params);

    return response.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: null,
    isFetchingAdminList: true,
  },
  reducers: {},
  extraReducers: {
    [fetchAdminList.fulfilled]: (state, action) => {
      state.admins = action.payload;
      state.isFetchingAdminList = false;
    },
  }
});

export default adminSlice.reducer;
