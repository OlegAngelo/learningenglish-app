import API from './base';

const MotivationApi = {
  saveMotivationAndEnvCheck: ({
    userEnableSpeaking,
    userMotivation,
  }) => {
    const options = {
      method: 'POST',
      url: '/learning-log/save-motivation',
      data: {
        enable_speaking: userEnableSpeaking,
        motivations: userMotivation,
      },
    };

    return API.request(options);
  },
};

export default MotivationApi;
