import API from './base';
import AdminAPI from './adminBase';

const questionApi = {
  getQuestions: (unitId, params) => {
    let url = `/muscle-training/${unitId}/generate-questions`;

    if (params.questionType === 'quick-start') {
      url = '/muscle-training/quick-start/generate-questions';
    } else if (params.questionType === 'checklist') {
      url = '/muscle-training/checklist';
    }

    return API.get(url, { params });
  },
  getLectureQuestions: (lectureId, params) => {
    let url = `/lectures/${lectureId}/generate-questions`;

    return API.get(url, { params });
  },
  getLectureQuestionsPreview: (params) => {
    const options = {
      url: 'admin/lectures/generate-questions',
      method: 'GET',
      params: params,
    };

    return AdminAPI.request(options);
  },
  
  initLearningLog: (lessonId) => {
    return API.get(`lesson/${lessonId}/learning-log`);
  },
  saveResult: (answers, unitId, questionType, examType) => {
    let type = 'normal'; // for questionTypes normal and in-progress

    if (questionType === 'master') {
      type = 'review';
    } else if (questionType === 'quick-start' || questionType === 'checklist') {
      type = questionType;
    }

    const options = {
      method: 'POST',
      url: `lesson/${unitId}/save-result`,
      data: {
        question_results: answers,
        question_type: type,
        exam_type: examType,
      },
    };

    return API.request(options);
  },
  saveLectureResult: ({answers, lectureId, learningType}) => {
    const options = {
      method: 'POST',
      url: `lecture/${lectureId}/save-result`,
      data: {
        question_results: answers,
        exam_type: learningType,
      },
    };

    return API.request(options);
  },
  savePreference: (showUtteranceTutorial, showRetryModal, showLrListenTutorial) => {
    const options = {
      method: 'POST',
      url: `/preference/save-preference`,
      params: {
        show_utterance_tutorial: showUtteranceTutorial,
        show_retry_modal: showRetryModal,
        show_lr_listen_tutorial: showLrListenTutorial
      },
    };

    return API.request(options);
  },
  getPreference: () => {
    const options = {
      method: 'GET',
      url: `/preference`,
    };

    return API.request(options);
  },
  getQuestion: (learningType, questionId) => {
    const options = {
      method: 'GET',
      url: `/training/muscle-exam-test`,
      params: {
        learningType: learningType,
        questionId: questionId,
      },
    };

    return API.request(options);
  },
};

export default questionApi;
