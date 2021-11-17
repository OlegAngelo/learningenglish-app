import axios from 'axios';
import Cookies from 'js-cookie';

const TOKEN = Cookies.get('admin_access_token');

const ADMINAPI = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  }
});

export default ADMINAPI;
