import React, { useState, useEffect } from 'react';

import { enableScroll, disableScroll } from '../utils/scrollableHelper';

const useScrollbar = () => {
  const [scrollbar, setScrollbar] = useState(true);
  const [windowOffset, setWindowOffset] = useState(0);

  useEffect(() => {
    if (scrollbar) {
      document.body.setAttribute('style', '');
      window.scrollTo(0, windowOffset);
      enableScroll();
    } else {
      let scrollY = window.scrollY;
      setWindowOffset(scrollY);
      document.body.setAttribute(
        'style',
        `position: fixed; top: -${scrollY}px; left: 0; right: 0; overflow: hidden`
      );
      disableScroll(true);
    }
  }, [scrollbar]);

  return {
    setScrollbar,
  };
};

export default useScrollbar;
