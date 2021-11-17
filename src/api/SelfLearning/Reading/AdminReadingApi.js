import API from '../../adminBase';

const AdminReadingApi = {
  fetchList: (payload) => {
    const options = {
      method: 'GET',
      url: '/admin/reading',
      params: {
        ...payload,
      },
    };

    return API.request(options);
  },

  import: (payload) => {
    const formData = new FormData();
    formData.append('file', payload.data[0]);

    const options = {
      method: 'POST',
      url: '/admin/reading/import',
      data: formData,
      onUploadProgress: payload.callback,
    };

    return API.request(options);
  },

  getSummary: (sentenceId) => {
      const options = {
        method: 'GET',
        url: `/admin/reading/${sentenceId}/summary`,
      };
  
      return API.request(options);
  },

  updateReading: (payload) => {
    const {levelId, ...rest} = payload;

    const options = {
      method: 'POST',
      url: `/admin/reading/${levelId}/update`,
      data: {...rest}
    };

    return API.request(options);
  }
};

export default AdminReadingApi;
