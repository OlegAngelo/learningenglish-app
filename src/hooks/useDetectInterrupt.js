import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

export const useDetectInterrupt = (data) => {
  const [detectInterrupt, setDetectInterrupt] = useState(true);
  const { setInterrupted } = data;
  const location = useLocation();

  const handleInterruptAction = () => {
    window.onbeforeunload = (event) => {
      if (detectInterrupt) {
        if (setInterrupted === undefined) {
          localStorage.setItem('is_exam_interrupted', true);
        } else {
          setInterrupted(true);
        }
        const e = event || window.event;
        e.preventDefault();
      }
    };
    window.onpopstate = (event) => {
      event.preventDefault();
      localStorage.setItem('exam_interrupted_prev_path', location.pathname);
    };
  };

  useEffect(() => {
    handleInterruptAction();
  }, []);

  useEffect(() => {
    handleInterruptAction();
  }, [detectInterrupt]);

  return { setDetectInterrupt };
};

export default useDetectInterrupt;
