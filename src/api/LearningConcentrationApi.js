import API from './base';

const LearningConcentrationApi = {
  save: (payload) => {
    const options = {
      method: 'POST',
      url: '/survey',
      data: payload,
    };

    return API.request(options);
  },
};

export default LearningConcentrationApi;
