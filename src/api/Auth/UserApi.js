import API from '../base';

const UserApi = {
  register: (payload) => {
    const options = {
      method: 'POST',
      url: '/register',
      params: {
        ...payload,
        baseUrl: process.env.REACT_APP_FRONTEND_URL,
      },
    };

    return API.request(options);
  },
  verifyAccount: (payload) => {
    const options = {
      method: 'POST',
      url: '/verify-account',
      params: {
        ...payload
      },
    };

    return API.request(options);
  },
  sendVerificationLink: (payload) => {
    const options = {
      method: 'POST',
      url: '/send-verification-link',
      params: {
        ...payload,
        baseUrl: process.env.REACT_APP_FRONTEND_URL,
      },
    };

    return API.request(options);
  },

};

export default UserApi;
