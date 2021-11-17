import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API
import QuestionApi from '../../api/QuestionApi'

export const fetchPreferences = createAsyncThunk(
  'userPreference/fetchPreferences',
  async () => {
    const response = await QuestionApi.getPreference();
    return response.data;
  }
);

const userPreference = createSlice({
  name: 'unit',
  initialState: {
    preferences: [],
    isFetchingPreferences: true,
  },
  extraReducers: {
    [fetchPreferences.fulfilled]: (state, action) => {
      state.preferences = action.payload
      state.isFetchingPreferences = false;
    }    
  }
});

export default userPreference.reducer;
