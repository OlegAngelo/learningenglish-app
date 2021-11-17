import API from './adminBase';

const SLAdminListeningApi = {
  import: (payload) => {
    const formData = new FormData();
    formData.append('file', payload.data[0]);

    const options = {
      method: 'POST',
      url: '/admin/listening/import',
      data: formData,
      onUploadProgress: payload.callback,
    };

    return API.request(options);
  },

  fetchPhrases: (payload) => {
    const options = {
      method: 'GET',
      url: '/admin/listening/sets',
      params: {
        ...payload,
      },
    };

    return API.request(options);
  },
};

export default SLAdminListeningApi;
