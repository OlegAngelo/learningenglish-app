import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LectureVideoList from '../LectureVideoList';
import ChunkSet from '../ChunkSet';
import Loading from '../../../../../shared/Loading';

import useLRListFetch from '../../../../../hooks/useLRListFetch';

import style from './ContentSection.module.css';

const ContentSection = ({
  description,
  classroom,
  videoTip,
  chunkTitle,
  redirectTo,
  fetchLevelsApi,
}) => {
  const [isFetchingLectures, setIsFetchingLectures] = useState(true);
  const [isFetchingLevels, setIsFetchingLevels] = useState(true);
  const [levels, setLevels] = useState([]);

  const fetchCompleteCallback = () => {
    setIsFetchingLectures(false);
  };

  const {
    loading,
    error,
    hasMore,
    lectureList,
    setLectureList,
    pageNumber,
    setPageNumber,
  } = useLRListFetch(fetchCompleteCallback);

  useEffect(() => {
    fetchLevelsApi()
      .then(res => {
        setLevels(res.data);
        setIsFetchingLevels(false);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  const isLoading = () => {
    return (isFetchingLectures && isFetchingLevels);
  };

  return (
    <div className={`${style.container} pt-16 bg-background-white `}>
      {!isLoading() ? (
        <Fragment>
          <p className="pt-px-16 font-normal text-basic-100 text-14 px-px-16">
            {description}
          </p>
          <div className="font-bold flex justify-between px-px-16 pt-px-38 items-center text-primary-500">
            <h2 className="text-18">映像授業</h2>
            <Link to={redirectTo}>
              <h3 className="text-11">{classroom}</h3>
            </Link>
          </div>
          <div className="flex mx-px-16 p-px-8 bg-primary-50 font-bold text-14">{videoTip}</div>
          <LectureVideoList
            loading={loading}
            error={error}
            hasMore={hasMore}
            lectureList={lectureList}
            setLectureList={setLectureList}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
          <ChunkSet
            chunkTitle={chunkTitle}
            levels={levels}
          />
        </Fragment>
      ) : (
        <Loading
          className="bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          zIndex="z-0"
        />
      )}
    </div>
  );
};

export default ContentSection;
