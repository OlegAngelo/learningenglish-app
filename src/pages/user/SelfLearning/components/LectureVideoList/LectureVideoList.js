import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LectureReadingItem from '../LectureReadingItem/LectureReadingItem';

import style from '../LectureVideoList.module.css';

import Loading from '../../../../../shared/Loading/Loading';

const LectureVideoList = ({
  loading,
  error,
  hasMore,
  lectureList,
  setLectureList,
  pageNumber,
  setPageNumber  
}) => {  
  const observer = useRef();
  const lastReadingItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const checkLastItemOfList = (index) => {
    return lectureList.length === index + 1;
  };

  const getUrl = (item) => {
    return item.is_live
      ? `/lectures/${item.id}/live`
      : `/lectures/${item.id}/on-demand/overview`;
  };

  useEffect(() => {
    setPageNumber(1);
    return () => setLectureList([]);
  }, []);

  return (
    <div className={`pt-px-8 ${style.scroll}`}>
      {lectureList.map((item, index) => (
        <Link
          key={item.id}
          {...(checkLastItemOfList(index) && { ref: lastReadingItemRef })}
          to={getUrl(item)}
          className={`${style.navItem}`}
        >
          <LectureReadingItem item={item} />
        </Link>
      ))}
      <div>
        {loading ? (
          <div className={`${style.navItem} ${style.centerLoader}`}>
            <Loading
              className="relative"
              iconClass="bg-basic-300 text-basic-300"
              height="h-7"
            />
          </div>
        ) : lectureList?.length ? (<div className={`${style.navItem} invisible`} />) : ''}
      </div>
      <div>
        {error && (
          <div className={`${style.navItem} ${style.centerLoader}`}>
            Something went wrong.
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureVideoList;
