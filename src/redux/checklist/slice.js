import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import ProficiencyApi from '../../api/ProficiencyApi';

// Async thunk actions
export const fetchChecklist = createAsyncThunk(
  'checklist/fetch',
  async (payload) => {
    const { learningType } = payload;
    const { data } = await ProficiencyApi.getChecklist(payload);

    return { data, learningType };
  }
);

// Slice
const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    word: [],
    phrase: [],
    isFetching: true,
    checkListUnit: [],
    checkListIndex: -1,
  },
  reducers: {
    toggleIsChecked(state, { payload }) {
      const { category, index } = payload;
      const checklistItem = state[category][index];

      checklistItem.is_checked = !checklistItem.is_checked;
    },
    setCheckListIndex: (state, action) => {
      const { commentaryId, category } = action.payload;
      const data = current(state[category]);
      let index = -1;
      index = data.findIndex((x) => x.id == commentaryId);  
      
      state.checkListIndex = index;
    },
    incrementCheckListIndex: (state) => {
      state.checkListIndex += 1;
    },
    decrementCheckListIndex: (state) => {
      state.checkListIndex -= 1;
    },
  },
  extraReducers: {
    [fetchChecklist.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchChecklist.fulfilled]: (state, action) => {
      const { data, learningType } = action.payload;

      state[learningType] = data;
      state.isFetching = false;
    },
  },
});

export const {
  clearChecklist,
  toggleIsChecked,
  removeUncheckedItems,
  setCheckListIndex,
  checkListIndex,
  incrementCheckListIndex,
  decrementCheckListIndex,
} = checklistSlice.actions;

export default checklistSlice.reducer;
