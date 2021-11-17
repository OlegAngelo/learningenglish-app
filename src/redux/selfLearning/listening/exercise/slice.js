import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import moment from 'moment';

import UserListeningApi from '../../../../api/SelfLearning/Listening/UserListeningApi';

import {
  getFinalWordsAnswer,
  getFinalPhraseAnswer,
} from '../../../../pages/user/SelfLearning/Listening/Exercise/Main/components/ContentSection/computed';

// async thunk actions
export const fetchQuestions = createAsyncThunk(
  'exercise/fetchQuestions',
  async (setId) => {
    const response = await UserListeningApi.getQuestions(setId);
    return response.data;
  }
);

export const saveResult = createAsyncThunk(
  'exercise/saveResult',
  async (payload) => {
    const response = await UserListeningApi.saveResult(payload);
    return response.data;
  }
);

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    set: null,
    level: null,
    questions: [],
    currentQuestionNo: 1,
    currentPhraseId: null,
    isFetchingQuestions: true,
    hasUsedPunctuationMark: false,
    exerciseInfo: [],
    phraseLogs: [],
    wordsLogs: [],
    isSavingResult: false,
    userProficiency: {}
  },
  reducers: {
    goToNextQuestion: (state) => {
      if (state.currentQuestionNo >= state.questions.length) return;
      state.currentQuestionNo = state.currentQuestionNo + 1;
    },
    resetStates: (state) => {
      state.questions = [];
      state.set = null;
      state.level = null;
      state.isFetchingQuestions = true;
      state.isSavingResult = false;
      state.userProficiency = {};
    },
    startExercise: (state) => {
      state.currentPhraseId = state.questions[state.currentQuestionNo - 1].id;
      state.exerciseInfo[state.currentQuestionNo - 1] = {
        totalWords:
          state.questions[state.currentQuestionNo - 1]?.sentence.split(' ')?.length,
        started_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
    },
    updatePhraseLogs: (state, action) => {
      const value = action.payload;
      const exerciseInfo = state.exerciseInfo[state.currentQuestionNo - 1];
      state.phraseLogs[state.currentQuestionNo - 1] = {
        ...value,
        did_shadowing: 0,
        started_at: exerciseInfo?.started_at,
        finished_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
    },
    updateWordsLogs: (state, action) => {
      const wordsLogs = current(state.wordsLogs);
      state.wordsLogs = {
        ...wordsLogs,
        [state.currentPhraseId]: action.payload
      };
    },
    setPunctuationMark: (state, action) => {
      state.hasUsedPunctuationMark = action.payload;
    },
    triedRecording: (state) => {
      const phraseLogs = current(state.phraseLogs[state.currentQuestionNo - 1]);
      state.phraseLogs[state.currentQuestionNo - 1] = {
        ...phraseLogs,
        did_shadowing: 1,
      };
    },
    assignEmptyValues: (state) => {
      const { started_at, totalWords } = current(
        state.exerciseInfo[state.currentQuestionNo - 1]
      );

      const params = [
        {
          ...current(state.questions[state.currentQuestionNo - 1]),
          hasUsedPunctuationMark: state.hasUsedPunctuationMark,
        },
        new Array(totalWords).fill(''),
      ];

      state.phraseLogs[state.currentQuestionNo - 1] = {
        ...getFinalPhraseAnswer(params[0], params[1]),
        did_shadowing: 0,
        started_at: started_at,
        finished_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      state.wordsLogs = {
        ...current(state.wordsLogs),
        [state.currentPhraseId]: getFinalWordsAnswer(params[0], params[1]),
      };
    },
  },
  extraReducers: {
    [saveResult.pending]: (state, action) => {
      state.isSavingResult = true;
    },
    [saveResult.fulfilled]: (state, action) => {
      state.isSavingResult = false;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      const data = action.payload.questions;
      const proficiency = action.payload.userProficiency;

      state.questions = data;
      state.userProficiency = proficiency;
      if (data.length > 0) {
        state.currentQuestionNo = 1;
        state.set = data[0].set;
        state.level = data[0].set.level;
      }
      state.isFetchingQuestions = false;
    },
  },
});

export const {
  resetStates,
  goToNextQuestion,
  startExercise,
  endExercise,
  updatePhraseLogs,
  updateWordsLogs,
  setPunctuationMark,
  triedRecording,
  assignEmptyValues,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
