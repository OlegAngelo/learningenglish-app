import { useState, useEffect } from 'react';

export const useCheckIfInterrupted = (data) => {
  const [detectInterrupt, setDetectInterrupt] = useState(false);
  const { localStorageKey } = data;

  const handleInterruptAction = () => {
    window.onbeforeunload = (event) => {
      if (!detectInterrupt) {
        localStorage.setItem(localStorageKey, true);
        setDetectInterrupt(true);
        const e = event || window.event;
        e.preventDefault();
      }
    };
  };

  useEffect(() => {
    handleInterruptAction();
  }, []);

  return { detectInterrupt };
};

export default useCheckIfInterrupted;
