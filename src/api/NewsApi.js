import API from './adminBase';
import UserAPI from './base';

const NewsApi = {
  getAdminNewsList: (payload) => {
    const options = {
      method: 'GET',
      url: '/admin/news',
      params: {
        ...payload,
      },
    };

    return API.request(options);
  },
  getNewsDetails: (id) => {
    return API.get(`/admin/news/${id}/details`);
  },
  importNewsList: (payload) => {
    const formData = new FormData();
    formData.append('file', payload.data[0]);

    const options = {
      method: 'POST',
      url: '/admin/news/import ',
      data: formData,
      onUploadProgress: payload.callback,
    };

    return API.request(options);
  },
  exportNewsList: (payload) => {
    const formData = new FormData();
    formData.append('start_date', payload.startDate);
    formData.append('end_date', payload.endDate);

    const options = {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      method: 'POST',
      url: '/admin/news/export',
      responseType: 'blob',
      data: formData,
      onUploadProgress: payload.callback,
    };

    return API.request(options);
  },
  uploadThumbnail: ({ file, newsId, name }) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);

    const options = {
      method: 'POST',
      url: `/admin/news/${newsId}/upload-image`,
      data: formData,
    };

    return API.request(options);
  },
  createVideo: ({newsId, name, size}) => {
    const formData = new FormData();
    formData.append('filename', name);
    formData.append('size', size);

    const options = {
      method: 'POST',
      url: `/admin/news/${newsId}/create-video`,
      data: formData,
    };

    return API.request(options);
  },
  deleteNews: (newsId) => {
    return API.delete(`/admin/news/${newsId}`);
  },
  getAdminThumbnail: (payload) => {
    const options = {
      method: 'GET',
      url: `/admin/news/fetch-image`,
      responseType: 'blob',
      params: {
        image: payload,
      },
    };

    return API.request(options);
  },
  updatePublication: ({newsId, scheduled_published_at, unpublish_at}) => {
    const options = {
      method: 'PATCH',
      url: `/admin/news/${newsId}/update-publication`,
      data: {
        scheduled_published_at,
        unpublish_at,
      },
    };

    return API.request(options);
  },
  // User Side
  getBookmarkedNews: (payload) => {
    const options = {
      method: 'GET',
      url: '/news/bookmarks',
      params: {
        ...payload,
      },
    };

    return UserAPI.request(options);
  },
  toggleBookmark: (newsId) => {
    return UserAPI.post(`/news/${newsId}/bookmark`);
  },
  getThumbnail: (payload) => {
    const options = {
      method: 'GET',
      url: `/news/fetch-image`,
      responseType: 'blob',
      params: {
        image: payload,
      },
    };

    return UserAPI.request(options);
  },
  getUserNewsDetails: (id) => {
    return UserAPI.get(`/news/${id}/details`);
  },
  getUserNewsList: (payload) => {
    const options = {
      method: 'GET',
      url: '/news',
      params: {
        ...payload,
      },
    };

    return UserAPI.request(options);
  },

  // For Admin and User side
  verifyNewsIfExist : (newsId, side) => {
    const apis = {
      'admin': {
        instance: API,
        url: `/admin/news/${newsId}/verifyNewsIfExist`
      },
      'user': {
        instance: UserAPI,
        url: `/news/${newsId}/verifyNewsIfExist`
      }
    }

    const options = {
      method: 'GET',
      url: apis[side].url,
    };

    return apis[side].instance.request(options);
  },
};

export default NewsApi;
