import axios from 'axios';
import Cookies from 'js-cookie';

const TOKEN = Cookies.get('access_token');

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  }
});

export default API;
