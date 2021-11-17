import { useEffect, useState } from 'react';
import { disableScroll, enableScroll } from '../utils/scrollableHelper';

const useCheckNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('offline', updateNetwork);
    window.addEventListener('online', updateNetwork);

    return () => {
      window.removeEventListener('offline', updateNetwork);
      window.removeEventListener('online', updateNetwork);
    };
  });

  useEffect(() => {
    !isOnline ? disableScroll() : enableScroll();
  }, [isOnline]);

  return isOnline;
};

export default useCheckNetwork;
