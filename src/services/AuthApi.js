import API from '../api/base';
import Cookies from 'js-cookie';

const AuthApi = () => {
  const isAuthenticated = () => {
    return Cookies.get('access_token') ? true : false;
  };

  const isUser = () => {
    return Cookies.get('isUser') ? true : false;
  };

  const authenticate = (email, password, callback) => {
    API.post('/login', {
      'email': email,
      'password': password
    }).then(res => {
      Cookies.set('access_token', res.data.token);
      Cookies.set('isUser', res.data.isUser);
      if (res.data.is_password_initialized) {
        window.location = '/motivation';
      } else {
        window.location = '/first-login'
      }
    })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        // invoke callback function
        callback();
      });
  }
  const logout = () => {
    API.get('/logout').then(res => {
      Cookies.remove('access_token');
      Cookies.remove('isUser');
      localStorage.clear();
      window.location = '/login';
    });
  }
  return {
    isAuthenticated,
    authenticate,
    logout,
    isUser
  }

}

export default AuthApi();
