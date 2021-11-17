import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './FlassMessage.module.css';

const FlashMessage = ({ timeOut = 3000 }) => {
  const { hasBookmarked, showFlash } = useSelector((state) => state.news);
  const [fadingOut, setFadingOut] = useState(true);
  const [message, setMessage] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (showFlash) {
      clearTimeout(timer.current);
      setMessage(
        hasBookmarked
          ? 'この記事をブックマークに追加しました'
          : 'この記事をブックマークから削除しました'
      );

      setFadingOut(false);
      timer.current = setTimeout(() => setFadingOut(true), timeOut - 1.5);
    }
  }, [showFlash]);

  return (
    <div
      className={`${
        fadingOut ? style.fadingOut : ''
      } fixed bottom-0 z-50 w-full text-basic-500 text-14 py-px-10 text-center bg-primary-400`}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
