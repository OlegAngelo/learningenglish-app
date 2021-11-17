import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import unitApi from '../../api/UnitApi.js';

export const fetchUnitList = createAsyncThunk(
  'units/fetchUnitList',
  async () => {
    const response = await unitApi.getUnitList();

    return response.data;
  }
);

export const fetchSelectedUnit = createAsyncThunk(
  'units/fetchSelectedUnit',
  async (id) => {
    const response = await unitApi.getSelectedUnit(id);

    return response.data;
  }
);

const unitListSlice = createSlice({
  name: 'unit',
  initialState: {
    units: [],
    selectedUnit: null,
    isFetchingUnitList: true,
    isFetchingUnit: true,
  },
  reducers: {},
  extraReducers: {
    [fetchUnitList.pending]: (state) => {
      state.isFetchingUnitList = true;
    },
    [fetchSelectedUnit.pending]: (state) => {
      state.isFetchingUnit = true;
    },
    [fetchUnitList.fulfilled]: (state, action) => {
      state.units = action.payload;
      state.isFetchingUnitList = false;
    },
    [fetchSelectedUnit.fulfilled]: (state, action) => {
      state.selectedUnit = action.payload;
      state.isFetchingUnit = false;
    },
  }
});

export default unitListSlice.reducer;
