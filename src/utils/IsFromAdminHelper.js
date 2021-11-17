import { useLocation } from 'react-router-dom';

export const IsFromAdminHelper = () => {
  const location = useLocation();
  return location.pathname.match('admin') ? true : false;
};
