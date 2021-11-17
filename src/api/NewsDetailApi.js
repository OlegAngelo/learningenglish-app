import API from './base';

const NewsDetailApi = {
  getNewsDetails: ({ id }) => {
    return API.get(`/news/${id}/details/`);
  },
  saveUserNewsAndPv: ({ newsId, news_status }) => {
    const options = {
      method: 'POST',
      url: `/news/${newsId}/save-news-and-pvs/`,
      data: {
        newsId: newsId,
        news_status: news_status,
      },
    };
    return API.request(options);
  },
  saveNewsLog: ({ newsId, started_at, userEnableWPMCalculation }) => {
    const options = {
      method: 'POST',
      url: `/news/${newsId}/save-logs/`,
      data: {
        started_at,
        userEnableWPMCalculation,
      },
    };
    return API.request(options);
  },
  getRecommendedNews: (level) => {
    return API.get(`/news/${level}/recommendation`);
  },
  getNewsStatus: (newsId) => {
    return API.get(`/news/${newsId}/status`);
  },
};

export default NewsDetailApi;
