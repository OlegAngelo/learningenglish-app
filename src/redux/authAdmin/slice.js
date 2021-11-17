import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminApi from '../../api/AdminApi.js';

export const fetchAuthAdmin = createAsyncThunk(
  'admin/fetchAuthAdmin',
  async () => {
    const response = await adminApi.getAuthAdmin();

    return response.data;
  }
);

const authAdminSlice = createSlice({
  name: 'authAdmin',
  initialState: {
    profile: null,
    isFetchingAuthAdmin: true,
  },
  extraReducers: {
    [fetchAuthAdmin.pending]: (state) => {
      state.isFetchingAuthAdmin = true;
    },
    [fetchAuthAdmin.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isFetchingAuthAdmin = false;
    },
  }
});

export default authAdminSlice.reducer;
