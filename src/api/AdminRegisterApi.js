import ADMINAPI from '../api/adminBase';

const AdminRegisterApi = {

    registerAdmin: ({ name, email, password, confirmation }) => {
      const options = {
        method: 'POST',
        url: '/admin/register',
        data: {
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmation,
          baseUrl: process.env.REACT_APP_FRONTEND_URL,
        },
      };
  
      return ADMINAPI.request(options);
    },
};
  
export default AdminRegisterApi;
