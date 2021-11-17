import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const useNewsHistory = () => {
  const location = useLocation();

  useEffect(() => {
    let regex = /^\/news\/([\w'-]+)$/;
    let breadcrumbs = localStorage.getItem('breadcrumbs').split(',');

    if (regex.test(location.pathname) || location.pathname == '/news') {
      breadcrumbs.shift();
      breadcrumbs.unshift(location.pathname);
      localStorage.setItem('breadcrumbs', breadcrumbs);
    }
  }, [location.pathname]);
}

export default useNewsHistory;
