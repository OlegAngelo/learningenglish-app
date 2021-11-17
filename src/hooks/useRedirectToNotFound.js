import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useRedirectToNotFound = ({ route = '', text = '' }) => {
  const history = useHistory();

  const redirect404 = () => {
    history.push({
      pathname: '/404',
      state: {
        route: route,
        text: text,
      },
    });
  };

  return {
    redirect404,
  }
};

export default useRedirectToNotFound;
