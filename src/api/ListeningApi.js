import API from './base';

const ListeningApi = {
  fetchLevels: () => {
    return API.get('/listening/levels');
  },
};

export default ListeningApi;
