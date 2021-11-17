import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProficiencyApi from '../../api/ProficiencyApi';

// constants
const initKnowledgeCount = {
  masterCount: 0,
  inProgressCount: 0,
  notTriedCount: 0,
};

// async thunk actions
export const fetchOverallKnowledgeProficiency = createAsyncThunk(
  'proficiency/overall',
  async () => {
    const response = await ProficiencyApi.getOverallProficiency();
    return response.data;
  }
);

export const fetchOverallKnowledgeProficiencyByUnit = createAsyncThunk(
  'training/proficiency',
  async (unitId) => {
    const response = await ProficiencyApi.getOverallProficiencyByUnit(unitId);
    return response.data;
  }
);

export const fetchKnowledgeProficiencyForAllUnits = createAsyncThunk(
  'proficiency/allUnits',
  async () => {
    const response = await ProficiencyApi.getProficiencyForAllUnits();
    return response.data;
  }
);

// slice
const proficiencySlice = createSlice({
  name: 'proficiency',
  initialState: {
    overallKnowledge: null,
    phrasesKnowledge: initKnowledgeCount,
    wordsKnowledge: initKnowledgeCount,
    overallKnowledgeByUnit: null,
    phrasesKnowledgeByUnit: initKnowledgeCount,
    wordsKnowledgeByUnit: initKnowledgeCount,
    allUnits: [],
  },
  extraReducers: {
    [fetchOverallKnowledgeProficiency.fulfilled]: (state, action) => {
      const { overall, phrase, word } = action.payload;
      state.overallKnowledge = overall;
      state.phrasesKnowledge = phrase;
      state.wordsKnowledge = word;
    },
    [fetchOverallKnowledgeProficiencyByUnit.fulfilled]: (state, action) => {
      const { overall, phrase, word } = action.payload;
      state.overallKnowledgeByUnit = overall;
      state.phrasesKnowledgeByUnit = phrase;
      state.wordsKnowledgeByUnit = word;
    },
    [fetchKnowledgeProficiencyForAllUnits.fulfilled]: (state, action) => {
      state.allUnits = action.payload;
    },
  },
});

export default proficiencySlice.reducer;
