import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import LectureItem from '../Item/Item';
import Loading from '../../../../../../shared/Loading';
import { linkItems } from '../../../../../../config/lectureLinkItems.json'

import {
  addThumbnailPreview,
  fetchUserLectureList,
  fetchThumbnail,
  resetUserLectures,
} from '../../../../../../redux/userLectures/slice';

import style from './ContentSection.module.css';
import Swipe from 'react-easy-swipe';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ContentSection = () => {
  const dispatch = useDispatch();
  const level = useQuery().get('level') ?? '0';
  const keyword = useQuery().get('keyword') ?? '';
  const currentTab = useParams().tab;
  const {
    currentPage,
    lastPage,
    isFetchingUserLecturesList,
    userLecturesList,
    showFilters,
    pageYOffset,
  } = useSelector(state => state.userLectures);
  const noData = '授業がありません';
  const history = useHistory();

  const fetchMoreLectures = () => {
    let params = {
      page: currentPage + 1,
      level,
      keyword,
      genre: currentTab,
    };
    dispatch(fetchUserLectureList(params)).then((res) => {
      getImageResources(res.payload?.data.data);
    });
  };

  const getImageResources = (data) => {
    data?.forEach(item => {
      if (item.thumbnail_preview) {
        dispatch(fetchThumbnail(item.thumbnail_preview)).then((res) => {
          let image = null;
          if (res.payload !== undefined) {
            image = new Blob([res.payload.data], {
              type: 'image/jpg'
            });
            image = URL.createObjectURL(image);
  
            dispatch(addThumbnailPreview({
              key: item.thumbnail_preview,
              value: image,
            }));
          }
        });
      }
    });
  };

  const currentIndex = () => {
    const linkItem = linkItems.findIndex(item => item.tab === currentTab);
    return linkItem === -1 ? 0 : linkItem ;
  };

  const onSwipeLeft = () => {
    if ((currentIndex() + 1) == linkItems.length) return;
    history.push(linkItems[currentIndex() + 1].to);
  };

  const onSwipeRight = () => {
    if (!currentIndex()) return;
    history.push(linkItems[currentIndex() - 1].to);
  };


  useEffect(() => {
    return () => {
      dispatch(resetUserLectures());
    };
  }, []);

  useEffect(() => {
    dispatch(resetUserLectures());

    let params = {
      keyword: keyword,
      level: level,
      genre: currentTab,
    };

    dispatch(fetchUserLectureList(params)).then((res) => {
      getImageResources(res.payload?.data.data);
    });
  }, [level, keyword, currentTab]);

  return (
    <Fragment>
      {isFetchingUserLecturesList ? (
        <Loading
          className="top-6 bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          zIndex="z-0"
          height="h-screen"
        />
      ) : (
        <Swipe
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          tolerance={100}
        >
          <div className={`${style.container} bg-background-200`}>
            <InfiniteScroll
              dataLength={userLecturesList.length}
              next={fetchMoreLectures}
              hasMore={currentPage < lastPage}
              loader={(
                <Loading
                  className={`top-0 ${style.loading}`}
                  iconClass="bg-primary-500 text-primary-500"
                  zIndex="z-0"
                  rootPosition="relative"
                />
              )}
              className={showFilters ? style.infiniteScrollHigherPadding : style.infiniteScrollShorterPadding}
              style={{overflow: 'unset'}}
            >
            
                {userLecturesList.length > 0 ? (
                  userLecturesList.map((data) => (
                    <LectureItem key={data.id} data={data} />
                  ))
                ) : (
                  <div className="flex justify-center pt-8 text-12">
                    { noData }
                  </div>
                )}
            </InfiniteScroll>
          </div>
        </Swipe>
      )}
    </Fragment>
  );
};

export default ContentSection;
