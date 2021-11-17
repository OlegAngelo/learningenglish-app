import { useLocation } from 'react-router';

const IsFromAdmin = () => {
  const location = useLocation();
  return location.pathname.includes('preview');
};

export const isFromAdmin = window.location.pathname.match('admin') ? true : false;

export default IsFromAdmin;
