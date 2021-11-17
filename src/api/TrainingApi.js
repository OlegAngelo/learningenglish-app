import API from './base';

const trainingApi = {
  getTrainings: (id, category) => {
    const options = {
      method: 'GET',
      url: `/training/${id}/${category}/status`,
    };

    return API.request(options);
  },
  getMuscleResult: (ids) => {
    const options = {
      method: 'GET',
      url: `/training/muscle-result`,
      params: {
        log_session_id: ids
      },
    };

    return API.request(options);
  },
  getTrainingVocabularies: (id) => {
    const options = {
      method: 'GET',
      url: `/training/muscle-exam/commentary/${id}`
    }
    return API.request(options);
  },
  getLastTrainingTimestamp: () => {
    const options = {
      method: 'GET',
      url: `/log-training/latest`
    }
    return API.request(options);
  },
  getLastMotivationTimestamp: () => {
    return API.get('/log-motivation/latest');
  },
  getMuscleResultByUnit: (training_unit_id) => {
    return API.get(`/training/muscle-result/${training_unit_id}`);
  },
  setLogSessionFinishedAt: () => {
    const options = {
      method: 'POST',
      url: `/training/muscle-exam/end-session`,
    };

    return API.request(options);
  },
};

export default trainingApi;
