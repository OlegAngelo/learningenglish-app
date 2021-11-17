import ADMINAPI from '../api/adminBase';
import Cookies from 'js-cookie';

const AdminAuthApi = () => {
  const isAuthenticated = () => {
    return Cookies.get('admin_access_token') ? true : false;
  };

  const isAdmin = () =>{
    return Cookies.get('isAdmin') ? true : false;
  }

  const authenticate = (email, password, callback) => {
    ADMINAPI.post('/admin/login', {
      'email': email,
      'password': password
    }).then(res => {
      Cookies.set('admin_access_token', res.data.token);
      Cookies.set('isAdmin',res.data.isAdmin);
      window.location = '/admin'
    })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        // invoke callback function
        callback();
      });
  }
  const logout = () => {
    ADMINAPI.get('/admin/logout').then(res => {
      Cookies.remove('admin_access_token');
      Cookies.remove('isAdmin');
      localStorage.clear();
      window.location = '/admin/login';
    });
  }

  return {
    isAuthenticated,
    authenticate,
    logout,
    isAdmin
  }

}

export default AdminAuthApi();
