import API from '../../adminBase';

const AdminListeningApi = {
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

  fetchList: (payload) => {
    const options = {
      method: 'GET',
      url: '/admin/listening',
      params: {
        ...payload,
      },
    };

    return API.request(options);
  },

  getSummary: (id) => {
    const options = {
      method: 'GET',
      url: `/admin/listening/${id}/summary`,
    };

    return API.request(options);
  },

  saveSetDetails: (payload) => {
    const options = {
      method: 'POST',
      url: '/admin/listening/phrase/save-set-details',
      data: payload,
    };

    return API.request(options);
  },

  fetchPhraseData: (phrase_id) => {
    const options = {
      method: 'GET',
      url: `/admin/listening/phrase/${phrase_id}`,
    };

    return API.request(options);
  },

  fetchAudioData: ({level, fileName}) => {
    const options = {
      method: 'GET',
      responseType: 'blob',
      url: `/admin/listening/fetch-audio/${level}/${fileName}`,
    };

    return API.request(options);
  },

};

export default AdminListeningApi;
