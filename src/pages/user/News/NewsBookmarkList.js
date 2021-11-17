import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from '../../../shared/Footer/Footer';
import Header from '../../../shared/Header/Header';
import Loading from '../../../shared/Loading';
import NewsItem from './components/NewsItem/NewsItem';

import {
  fetchBookmarkedNews,
  fetchMoreBookmarkNews,
  fetchThumbnail,
  addImageInBookmarkNews,
  resetBookmarkNewsList,
  addThumbnailPreview,
} from '../../../redux/news/slice';

import style from './NewsBookmarkList.module.css';

const NewsBookmarkList = () => {
  const dispatch = useDispatch();
  const {
    bookmarkedNews,
    isFetchingBookmarkedNews,
    bookmarkCurrentPage,
    bookmarkLastPage,
    bookmarkTotal,
  } = useSelector((state) => state.news);
  const [loading, setLoading] = useState(true);
  const [loadingUpdates, setLoadingUpdates] = useState(true);

  const headerProps = {
    hasBack: true,
    title: 'ブックマーク',
  };

  useEffect(async () => {
    let isReplaceBookmarkList = true;
    setLoading(true);
    handleFetchBookmarkList(isReplaceBookmarkList);
  }, []);

  useEffect(() => {
    if (!loading && !loadingUpdates && bookmarkedNews.length <= 5 && bookmarkedNews.length < bookmarkTotal) {
      let isReplaceBookmarkList = true;
      setLoadingUpdates(true);
      handleFetchBookmarkList(isReplaceBookmarkList);
    }
  }, [bookmarkedNews, loading]);

  const handleFetchBookmarkList = async (isReplaceBookmarkList = false) => {
    await dispatch(resetBookmarkNewsList(isReplaceBookmarkList));

    dispatch(fetchBookmarkedNews())
      .then(res => {
        setLoading(false);
        setLoadingUpdates(false);
        let news = res.payload.data.data;
        getImageResources(news);
      });
  };

  const getImageResources = (news) => {
    news?.forEach(item => {
      if (item.thumbnail_preview) {
        dispatch(fetchThumbnail(item.thumbnail_preview)).then((res) => {
          let image = null;
          image = new Blob([res.payload.data], {
            type: 'image/jpg'
          });
          image = URL.createObjectURL(image);

          dispatch(addThumbnailPreview({
            key: item.thumbnail_preview,
            value: image,
          }));
        });
      }
    });
  };

  const fetchMore = () => {
    dispatch(fetchBookmarkedNews({page: bookmarkCurrentPage + 1}))
      .then(res => {
        let news = res.payload.data.data;
        getImageResources(news);
      });
  };

  const convertBookmarkRespToArray = (data) => {
    let bookmark = [];
    for (const item in data) {
      bookmark.push(data[item]);
    }
    return bookmark;
  };

  return (
    <div className="h-screen">
      <Header
        {...headerProps}
        rootClass="fixed z-10 w-full"
      />
      <div className="pt-16 pb-20">
        {loading ? (
          <Loading
            className="bg-background-200"
            iconClass="bg-primary-500 text-primary-500"
            height="h-screen"
            rootPosition="relative"
            zIndex="z-0"
          />
        ) : (
          <InfiniteScroll
            dataLength={bookmarkedNews.length}
            next={fetchMore}
            hasMore={bookmarkCurrentPage < bookmarkLastPage}
            loader={(
              <Loading
                className={`top-0 ${style.loading}`}
                iconClass="bg-primary-500 text-primary-500"
                zIndex="z-0"
                rootPosition="relative"
              />
            )}
            style={{overflow: 'unset'}}
          >
            { bookmarkedNews?.length ? (
              bookmarkedNews.map((data, key) => 
                <NewsItem data={data} key={key} from="bookmarks" />
              )
            ) : (
              <div className="flex justify-center pt-px-20 text-12">
                該当のニュースが見つかりません
              </div>
            )}
          </InfiniteScroll>
        )}
      </div>
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default NewsBookmarkList;
