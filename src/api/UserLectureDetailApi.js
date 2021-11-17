import API from './base';
import adminApi from './adminBase';

const UserLectureDetailApi = {
  getDetails: (payload) => {
    const { lectureId } = payload;

    const options = {
      method: 'GET',
      url: `/lectures/${lectureId}/details`,
    };

    return API.request(options);
  },
  fetchImage: (image) => {
    const options = {
      method: 'GET',
      url: '/lectures/fetch-image',
      responseType: 'blob',
      params: {
        image,
      },
    };

    return API.request(options);
  },
  previewAdminImage: (image) => {
    const options = {
      method: 'GET',
      url: '/lectures/fetch-image',
      responseType: 'blob',
      params: {
        image,
      },
    };

    return adminApi.request(options);
  },
};

export default UserLectureDetailApi;
