import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import AudioControl from '../components/AudioControl';
import Content from './components/Content';
import DetailsHeader from './components/DetailsHeader';
import FlashMessage from '../components/FlashMessage';
import Loading from '../../../../shared/Loading';
import Alert from '../../../../shared/Alert';
import NewsModal from './components/NewsModal/NewsModal';
import VimeoPlayer from './components/VimeoPlayer';

import { resetVimeoPlayer } from '../../../../redux/vimeoPlayer/slice';
import {
  fetchUserNewsDetails,
  saveUserNewsAndPv,
  resetUserNews,
  fetchThumbnail,
  updateNewsDetails,
} from '../../../../redux/news/slice';

import { disableScroll } from '../../../../utils/scrollableHelper';

import style from './Details.module.css';
import { resetNewsDetailStates } from '../../../../redux/newsDetails/slice';

const Details = () => {
  // Redux
  const dispatch = useDispatch();
  const { currentTab } = useSelector((state) => state.newsDetail);

  // Local States
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowContent, setIsShowContent] = useState(true);
  const [showJpTranslatonFromModal, setShowJpTranslatonFromModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  
  const newsId = useParams().id;
  

  const {
    isFetchingNewsDetails,
    isSavingUserNewsAndPv,
    newsDetails,
    isProcessingFinishNews,
  } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchUserNewsDetails(newsId)).then((res) => {
      let detail = res.payload;
      let image = null;
      if (detail.thumbnail) {
        dispatch(fetchThumbnail(detail.thumbnail)).then((res) => {
          image = new Blob([res.payload.data], {
            type: 'image/jpg',
          });
          image = URL.createObjectURL(image);
          dispatch(
            updateNewsDetails({
              ...detail,
              image,
            })
          );
        });
      } else {
        dispatch(
          updateNewsDetails({
            ...detail,
            image,
          })
        );
      }

      let payload = {
        newsId: res.payload.id,
        news_status: localStorage.getItem('news_status') ?? 'null',
      };
      const started_at = Date.now();
      localStorage.setItem('started_at', started_at);
      dispatch(saveUserNewsAndPv(payload)).then(() => {
        localStorage.removeItem('news_status');
      });
      dispatch(resetUserNews());
    });

    return async () => {
      await dispatch(resetNewsDetailStates());
      await dispatch(resetVimeoPlayer());
    };
  }, []);

  useEffect(() => {
    if (newsDetails && (newsDetails.status == 'deleted' || newsDetails.status == 'not published')) {
      window.location = '/404'
    }
    if (newsDetails && newsDetails.status == 'expired') {
      setIsErrorModal(true);
      setIsExpired(true);
    }
    if(!isFetchingNewsDetails && !newsDetails.log_news){
      window.location = '/404'
    }
    if (showJpTranslatonFromModal) window.scrollTo(0, 0);
  }, [newsDetails, showJpTranslatonFromModal]);

  const closeModal = () => {
    window.scrollTo(0, 0);
    setIsShowModal(false);
  };

  useEffect(() => {
    if(isErrorModal) disableScroll();
  }, [isErrorModal])

  useEffect(() => {
    if (isShowModal) disableScroll();
  }, [isShowModal]);

  const contentProps = {
    setIsShowModal,
    isShowContent,
    currentTab
  };

  return (
    <Fragment>
      <div className={`w-full bg-background-200 ${style.content} flex flex-col`}>
        <FlashMessage />
        <DetailsHeader
          showJpTab={(newsDetails && newsDetails.log_news.length > 0) ||
            showJpTranslatonFromModal
          }
          isFetchingNewsDetails={isFetchingNewsDetails}
          currentTab={currentTab}
        />

        {isFetchingNewsDetails ||
        isSavingUserNewsAndPv ||
        isProcessingFinishNews ? (
          <div className="flex flex-col flex-1">
            <Loading
              className={`bg-background-200 ${style.screenSize}`}
              iconClass="bg-primary-500 text-primary-500"
            />
          </div>
        ) : (
          <Fragment>
            <Alert
              show={isErrorModal}
              msg={`このニュースは \n 掲載期間が終了しました`}
              callBack={() => {
                setIsErrorModal(false);
                window.location = '/news';
              }}
            />
            {!isExpired && (
              <div className={`${isExpired && 'hidden'} flex flex-col flex-1`}>
                <Content {...contentProps} />
                {newsDetails.vimeo_video_id && (
                  <VimeoPlayer
                    playerId={newsDetails.vimeo_video_id}
                    vimeoId={newsDetails.vimeo_video_id}
                    width={0}
                    height={0}
                  />
                )}
                {isShowModal && (
                  <NewsModal
                    closeModal={closeModal}
                    setShowJpTranslatonFromModal={setShowJpTranslatonFromModal}
                  />
                )}
                {newsDetails.vimeo_video_id && (
                  <AudioControl
                    isShowContent={isShowContent}
                    setIsShowContent={setIsShowContent}
                    showLetterButton={currentTab === 'en'}
                  />
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Details;
