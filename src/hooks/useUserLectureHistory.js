import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const useUserLectureHistory = () => {
  const location = useLocation();

  useEffect(() => {
    let regex = /^\/lectures\/([\w'-]+)$/;
    let breadcrumbs = localStorage.getItem('breadcrumbs');
    if (!breadcrumbs) return;

    breadcrumbs = breadcrumbs.split(',');
    if (regex.test(location.pathname) || location.pathname == '/lectures') {
      breadcrumbs.shift();
      breadcrumbs.unshift(location.pathname);
      localStorage.setItem('breadcrumbs', breadcrumbs);
    }
  }, [location.pathname]);
}

export default useUserLectureHistory;
