import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import ProficiencyApi from '../../api/ProficiencyApi';

import trainingApi from '../../api/TrainingApi';

export const fetchLastTrainingTimestamp = createAsyncThunk(
  'training/fetchLastTrainingTimestamp',
  async () => {
    const response = await trainingApi.getLastTrainingTimestamp();

    return response.data;
  }
);

export const fetchLastMotivationTimestamp = createAsyncThunk(
  'training/fetchLastMotivationTimestamp',
  async () => {
    const { data } = await trainingApi.getLastMotivationTimestamp();

    return data;
  }
);

export const fetchOverAllProficiencyByUnit = createAsyncThunk(
  'training/proficiency',
  async (unitId) => {
    const { data } = await ProficiencyApi.getOverallProficiencyByUnit(unitId);

    return data;
  }
);

export const fetchMuscleTrainingResult = createAsyncThunk(
  'training/result',
  async (logSessionId) => {
    const { data } = await trainingApi.getMuscleResult(logSessionId);

    return data;
  }
);

export const fetchMuscleTrainingResultByUnit = createAsyncThunk(
  'training/fetchMuscleTrainingResultByUnit',
  async (trainingUnitId) => {
    const { data } = await trainingApi.getMuscleResultByUnit(trainingUnitId);
    return data;
  }
);

const trainingSlice = createSlice({
  name: 'training',
  initialState: {
    lastTrainingTimestamp: null,
    isFetchingLastTrainingTimestamp: true,
    lastMotivationTimestamp: null,
    isFetchingLastMotivationTimestamp: true,
    overAllProficiencyScore: null,
    proficiencyData: null,
    trainingResultData: [],
    trainingUnit: {},
    trainingVocabularies: [],
    trainingVocabularyIndex: -1,
    trainingResultByUnitData: [],
  },
  reducers: {
    resetResultData: (state) => {
      state.trainingResultData = [];
      state.trainingResultByUnitData = [];
      state.trainingUnit = {};
      state.trainingVocabularies = [];
      state.trainingVocabularyIndex = -1;
      state.overAllProficiencyScore = null;
      state.proficiencyData = null;
    },
    incrementTrainingVocabIndex: (state) => {
      state.trainingVocabularyIndex += 1;
    },
    decrementTrainingVocabIndex: (state) => {
      state.trainingVocabularyIndex -= 1;
    },
    setResultTrainingVocabIndex: (state, action) => {
      const { commentaryId, category } = action.payload;
      const data = category ? current(state.trainingResultByUnitData[category]) : current(state.trainingVocabularies);
      let index = -1;

      if (category) {
        index = data.findIndex((x) => x.id == commentaryId);  
      } else {
        index = data.findIndex((x) => x.logTrainingId == commentaryId)
      }
      
      state.trainingVocabularyIndex = index;
    },
    updateTrainingResultData: (state, action) => {
      const { id, type } = action.payload;
      const trainingResults = type
        ? state.trainingResultByUnitData[type]
        : state.trainingResultData;

      trainingResults.forEach((logTrainingVocab) => {
        const isUpdated = logTrainingVocab.user_proficiency.id === id;
        const isChecked = logTrainingVocab.user_proficiency.is_checked;

        if (isUpdated) {
          logTrainingVocab.user_proficiency.is_checked = !isChecked;
        }
      });
    },
  },
  extraReducers: {
    [fetchLastTrainingTimestamp.pending]: (state) => {
      state.isFetchingLastTrainingTimestamp = true;
    },
    [fetchLastTrainingTimestamp.fulfilled]: (state, action) => {
      state.lastTrainingTimestamp = action.payload;
      state.isFetchingLastTrainingTimestamp = false;
    },
    [fetchLastMotivationTimestamp.pending]: (state) => {
      state.isFetchingLastMotivationTimestamp = true;
    },
    [fetchLastMotivationTimestamp.fulfilled]: (state, action) => {
      state.lastMotivationTimestamp = action.payload;
      state.isFetchingLastMotivationTimestamp = false;
    },
    [fetchOverAllProficiencyByUnit.fulfilled]: (state, action) => {
      state.overAllProficiencyScore  = action.payload.overall;
      state.proficiencyData = action.payload;
    },
    [fetchMuscleTrainingResult.fulfilled]: (state, action) => {
      const results = action.payload;
      let questions = [];

      const {
        log_training_vocabularies: trainingVocabs,
      } = results;

      trainingVocabs.forEach((vocab) => {
        const type = vocab.user_proficiency.training_vocabularyable_type.split(
          'App\\Models\\MuscleTraining'
        );

        questions.push({
          logTrainingId: vocab.id,
          logTrainingType: type[1] === '\\Words\\TrainingWord' ? 'word' : 'phrase',
          question: vocab.user_proficiency.training_vocabularyable,
        });
      });

      state.trainingResultData = results.log_training_vocabularies;
      state.trainingVocabularies = questions;
      state.trainingUnit = results.unit;
    },
    [fetchMuscleTrainingResultByUnit.fulfilled]: (state, action) => {
      const results = action.payload;

      state.trainingResultByUnitData = results;
      state.trainingUnit = results.unit;
    },
  },
});

export const {
  resetResultData,
  incrementTrainingVocabIndex,
  decrementTrainingVocabIndex,
  setResultTrainingVocabIndex,
  updateTrainingResultData,
} = trainingSlice.actions;

export default trainingSlice.reducer;
