import API from '../../base';

const UserListeningApi = {
  getListeningSets: ({levelId, status}) => {
    const options = {
      method: 'GET',
      url: `/listening/${levelId}/sets`,
      params: {
        status
      }
    };

    return API.request(options);
  },
  getQuestions: (setId) => {
    const options = {
      method: 'GET',
      url: `/listening/${setId}/questions`,
    };

    return API.request(options);
  },
  getResults: (logId) => {
    const options = {
      method: 'GET',
      url: `/listening/${logId}/result`,
    };

    return API.request(options);
  },
  saveResult: (payload) => {
    const options = {
      method: 'POST',
      url: `/listening/${payload?.setId}/result`,
      data: payload,
    };

    return API.request(options);
  },
  getListeningLogs: ({ date }) => {
    const options = {
      method: 'GET',
      url: `/listening/learning-logs/${date}`,
    };

    return API.request(options);
  },
};

export default UserListeningApi;
