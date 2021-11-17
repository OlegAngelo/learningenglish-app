import API from '../../base';

const UserReadingApi = {
  fetchLevels: () => {
    return API.get('/reading/levels');
  },
  fetchImage: (image) => {
    const options = {
      method: 'GET',
      url: '/reading/fetch-image',
      responseType: 'blob',
      params: {
        image,
      },
    };

    return API.request(options);
  },
  getReadingSentences: ({ levelId, status }) => {
    const options = {
      method: 'GET',
      url: `/reading/${levelId}/sentences`,
      params: {
        status
      }
    };

    return API.request(options);
  },
  getSentenceChunks: (sentenceId) => {
    const options = {
      method: 'GET',
      url: `/reading/${sentenceId}/chunks`,
    };

    return API.request(options);
  },

  getLevel: (id) => {
    const options = {
      method: 'GET',
      url: `/reading/${id}/level`,
    };
    
    return API.request(options);
  },

  fetchResult: ({ logId }) => {
    const options = {
      method: 'GET',
      url: `/reading/${logId}/result`,
    };

    return API.request(options);
  },

  saveReadingLog: (payload) => {
    const options = {
      method: 'POST',
      url: `/reading/save-reading-log`,
      data: payload
    };

    return API.request(options);
  },

  getLearningLog: ({ date }) => {
    const options = {
      method: 'GET',
      url: `/reading/learning-log/${date}`,
    };

    return API.request(options);
  },
};

export default UserReadingApi;
