import { createSelector } from 'reselect';

export const newsList = createSelector(
  (state) => state.news,
  (news) => news.news
);

export const isFetchingNewsList = createSelector(
  (state) => state.news,
  (news) => news.isFetchingNewsList
);

export const userNewsList = createSelector(
  (state) => state.news,
  (news) => news.userNews
);

export const isSavingUserNewsAndPv = createSelector(
  (state) => state.news,
  (news) => news.isSavingUserNewsAndPv
);

export const isFinishSortingFinalNews = createSelector(
  (state) => state.news,
  (news) => news.isFinishSortingFinalNews
);

export const finalUserNews = createSelector(
  (state) => state.news,
  (news) => news.finalUserNews
);

export const recommendedNews = createSelector(
  (state) => state.news,
  (news) => news.recommendedNews
);

export const newsStatus = createSelector(
  (state) => state.news,
  (news) => news.newsStatus
);

export const isFetchingNewsStatus = createSelector(
  (state) => state.news,
  (news) => news.isFetchingNewsStatus
);
