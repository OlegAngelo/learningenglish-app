import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

const inputWordLinesSlice = createSlice({
  name: 'inputWordLines',
  initialState: {
    activeLineIndex: -1,
    lineValues: [],
    correctLines: [],
    areAllLinesFilled: false,
    maxLines: 0,
  },
  reducers: {
    resetState: (state, action) => {
      state.activeLineIndex = -1;
      state.lineValues = [];
      state.areAllLinesFilled = false;
      state.maxLines = 0;
    },
    initializeMaxLines: (state, action) => {
      state.maxLines = action.payload;
      state.lines = new Array(action.payload);
    },
    setActiveLineIndex: (state, action) => {
      state.activeLineIndex = action.payload;
    },
    setCorrectLines: (state, action) => {
      state.correctLines = action.payload;
    },
    updateLineValue: (state, action) => {
      const space = String.fromCharCode(160);
      const lineValues = current(state.lineValues);
      const currentValue = state.lineValues[action.payload.index];

      if (currentValue?.slice(-1) === space && action.payload?.value?.slice(-1) === space)
        return;

      for (let c = 0; c <= action.payload.index; c++) {
        if (lineValues[c] === undefined) state.lineValues[c] = '';
        if (c === action.payload.index) state.lineValues[c] = action.payload.value;
      }

      let flag = state.lineValues.length === state.maxLines;
      state.lineValues.map(function (data) {
        if (data.trim() === '') flag = false;
      });
      state.areAllLinesFilled = flag;
    },
  },
  extraReducers: {},
});

export const {
  initializeMaxLines,
  setActiveLineIndex,
  updateLineValue,
  resetState,
  setCorrectLines,
} = inputWordLinesSlice.actions;

export default inputWordLinesSlice.reducer;
