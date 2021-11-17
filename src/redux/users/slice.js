
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from '../../api/UserApi';

export const fetchStudentList = createAsyncThunk(
  'student/fetchStudentList',
  async (params, {getState}) => {
    const { users } = getState();
    const recordsPerPage = users.recordsPerPage;
    const response = await UserApi.getStudentList({ recordsPerPage, ...params });
    return response.data;
  }
);

const userListSlice = createSlice({
  name: 'users',
  initialState: {
    students: null,
    recordsPerPage: 10,
    isFetchingStudentList: true,
  },
  reducers: {},
  extraReducers: {
    [fetchStudentList.pending]: (state) => {
      state.isFetchingStudentList = true;
    },
    [fetchStudentList.fulfilled]: (state, action) => {
      state.students = action.payload;
      state.isFetchingStudentList = false;
    },
  }
});

export default userListSlice.reducer;
