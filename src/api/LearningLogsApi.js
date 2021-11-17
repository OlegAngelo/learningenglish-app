import API from './base';

const LearningLogsApi = {
  getLogsByDate: (date) => {
    return API.get(`/learning-log/${date}`);
  },
  getCalendarLogs: () => {
    return API.get(`/learning-log`);
  },
  getLearningMission: (date) => {
    return API.get(`/learning-mission/${date}`);
  },
  getTrainingLogs: ({ date }) => {
    return API.get(`/learning-log/${date}/trainings`);
  },
  getLectureLogs: ({ date }) => {
    return API.get(`/learning-log/${date}/lectures`);
  },
  getNewsLogs: ({ date }) => {
    return API.get(`/learning-log/${date}/news`);
  },
};

export default LearningLogsApi;
