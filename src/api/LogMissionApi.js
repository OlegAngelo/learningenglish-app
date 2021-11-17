import API from './base';

const LogMissionApi = {
  getLogMission: () => {
    return API.get('/learning-mission');
  }
};

export default LogMissionApi;
