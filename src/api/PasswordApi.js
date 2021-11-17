import API from './base';

const PasswordApi = {
  updatePassword: (password, confirmation) => {
    const options = {
      method: 'POST',
      url: '/update-password',
      data: {
        password: password,
        password_confirmation: confirmation
      },
    };

    return API.request(options);
  },
  sendPasswordResetEmail: (email) => {
    const options = {
      method: 'POST',
      url: '/forgot-password',
      data: {
        email,
        baseUrl: process.env.REACT_APP_FRONTEND_URL,
      },
    };

    return API.request(options);
  },
  resetPassword: ({ token, email, password, confirmation }) => {
    const options = {
      method: 'POST',
      url: '/reset-password',
      data: {
        token: token,
        email: email,
        password: password,
        password_confirmation: confirmation,
      },
    };

    return API.request(options);
  },
  adminResetPassword: ({ token, email, oldPassword, password, confirmation }) => {
    const options = {
      method: 'POST',
      url: '/admin/reset-password',
      data: {
        token: token,
        email: email,
        old_password: oldPassword,
        password: password,
        password_confirmation: confirmation,
      },
    };

    return API.request(options);
  },
};

export default PasswordApi;
