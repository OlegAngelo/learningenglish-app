import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import QuestionApi from '../../api/QuestionApi';
import { log } from '../../utils/loggerHelper';

// async thunk actions
export const fetchQuestions = createAsyncThunk(
  'exam/questions',
  async (payload) => {
    const { unitId, ...params } = payload;
    const { data } = await QuestionApi.getQuestions(unitId, params);

    return {
      questionData: data.questionData ?? data,
      inProgressUnitId: data.inProgressUnitId,
    };
  }
);
export const fetchLectureQuestions = createAsyncThunk(
  'exam/fetchLectureQuestions',
  async (payload) => {
    const { lectureId, ...params } = payload;
    const { data } = await QuestionApi.getLectureQuestions(lectureId, params);

    return {
      questionData: data.questionData ?? data,
      lectureId: lectureId,
    };
  }
);
export const fetchLectureQuestionsPreview = createAsyncThunk(
  'exam/fetchLectureQuestionsPreview',
  async (payload) => {
    const { data } = await QuestionApi.getLectureQuestionsPreview(payload);

    return {
      questionData: data.questionData ?? data,
    };
  }
);
export const saveLectureResult = createAsyncThunk(
  'exam/saveLectureResult',
  async (payload) => {
    const { data } = await QuestionApi.saveLectureResult(payload);

    return data;
  }
);

// slice
const examSlice = createSlice({
  name: 'exam',
  initialState: {
    fetching: true,
    questionSet: [],
    totalQuestions: 0,
    inProgressUnitId: null,
    lectureId: null,
    hasChoice: false
  },
  reducers: {
    resetState: (state) => {
      state.fetching = true;
      state.questionSet = [];
      state.totalQuestions = 0;
    },
    setHasChoice : (state,action) =>{
      state.hasChoice = action.payload
    }
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.fetching = true;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      log('normal: ', action.payload);
      const { questionData, inProgressUnitId } = action.payload;

      let questionCount = 0;

      questionData.forEach((questionSet) => {
        questionCount += questionSet.question_count;
      });

      state.questionSet = questionData;
      state.totalQuestions = questionCount;
      state.inProgressUnitId = inProgressUnitId;
      state.fetching = false;
    },
    [fetchLectureQuestions.fulfilled]: (state, action) => {
      log('normal: ', action.payload);
      const { questionData, lectureId } = action.payload;

      let questionCount = 0;

      questionData.forEach((questionSet) => {
        questionCount += questionSet.question_count;
      });

      state.questionSet = questionData;
      state.totalQuestions = questionCount;
      state.lectureId = lectureId;
      state.fetching = false;
    },
    [fetchLectureQuestionsPreview.fulfilled]: (state, action) => {
      log('normal: ', action.payload);
      const { questionData } = action.payload;

      let questionCount = 0;

      questionData.forEach((questionSet) => {
        questionCount += questionSet.question_count;
      });

      state.questionSet = questionData;
      state.totalQuestions = questionCount;
      state.fetching = false;
    },
  },
});

export const { resetState, setHasChoice } = examSlice.actions;
export default examSlice.reducer;
