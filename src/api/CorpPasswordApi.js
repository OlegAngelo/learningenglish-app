import API from './base';

const CorpPasswordApi = {
  sendEmailVerification: (email) => {
    const options = {
      method: 'POST',
      url: '/corp/passwords/email-verification',
      data: {
        email,
        baseUrl: process.env.REACT_APP_FRONTEND_URL,
      },
    };

    return API.request(options);
  },
  adminResetPassword: ({ token, email, password, password_confirmation }) => {
    const options = {
      method: 'POST',
      url: 'corp/passwords/reset',
      data: {
        token: token,
        email: email,
        password: password,
        password_confirmation,
      },
    };

    return API.request(options);
  },
  validateToken: ({ email, token }) => {
    const options = {
      method: 'GET',
      url: `corp/passwords/validate-token?email=${email}&token=${token}`,
    };

    return API.request(options);
  },
};

export default CorpPasswordApi;
