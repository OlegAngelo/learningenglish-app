const calculatePercentage = (user_news_finished, user_news) => {
  return isNaN(user_news_finished / user_news)
    ? `-`
    : ((user_news_finished / user_news) * 100).toFixed(0) + '%';
};

export default calculatePercentage;
