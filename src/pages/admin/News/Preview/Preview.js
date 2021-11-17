import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import breadcrumb from '../../../../utils/breadcrumb';
import Loading from '../../../../shared/Loading/Loading';
import NewsModal from '../../../user/News/Details/components/NewsModal/NewsModal';
import DetailsHeader from '../../../user/News/Details/components/DetailsHeader';
import Content from '../../../user/News/Details/components/Content';
import AudioControl from '../../../user/News/components/AudioControl/AudioControl';
import Footer from '../../../user/News/Details/components/Footer';
import VimeoPlayer from '../../../user/News/Details/components/VimeoPlayer';
import FlashMessage from '../../../user/News/components/FlashMessage';

import { resetVimeoPlayer } from '../../../../redux/vimeoPlayer/slice';
import {
  fetchNewsDetails,
  fetchAdminThumbnail,
  updateNewsDetails,
} from '../../../../redux/news/slice';

import style from './Preview.module.css';

const Preview = () => {
  const dispatch = useDispatch();
  const { currentTab } = useSelector((state) => state.newsDetail);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowContent, setIsShowContent] = useState(true);
  const [isShowOption, setIsShowOption] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);
  const newsId = useParams().id;
  const tab = currentTab;
  const { isFetchingNewsDetails, newsDetails } = useSelector(
    (state) => state.news
  );
  tab === 'en' && breadcrumb.init();

  useEffect(() => {
    dispatch(fetchNewsDetails(newsId)).then((res) => {
      let detail = res.payload;
      let image = null;
      if (detail.thumbnail) {
        dispatch(fetchAdminThumbnail(detail.thumbnail)).then((res) => {
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
    });

    return () => {
      dispatch(resetVimeoPlayer());
    };
  }, []);

  const closeModal = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    if (isShowModal) {
      let scrollY = window.scrollY;
      setWindowOffset(scrollY);
      document.body.setAttribute(
        'style',
        `position: fixed; top: -${scrollY}px; left: 0; right: 0; overflow: hidden`
      );
    } else {
      document.body.setAttribute('style', '');
      window.scrollTo(0, windowOffset);
    }
  }, [isShowModal]);

  const contentProps = {
    setIsShowModal,
    isShowContent,
    currentTab
  };

  return (
    <Fragment>
      {isFetchingNewsDetails ? (
        <div className="flex w-full justify-center pt-px-20 bg-black">
          <Loading
            className={`bg-background-200 ${style.screenSize}`}
            iconClass="bg-primary-500 text-primary-500"
          />
        </div>
      ) : (
        <div
          className={`${
            isShowOption ? `overflow-hidden` : `overflow-x-scroll`
          } bg-background-200 relative ${style.screenSize} ${style.noScrollbar} flex flex-col`}
        >
          <DetailsHeader
            setIsShowOption={setIsShowOption}
            currentTab={currentTab}
            disableBack={true}
            showTabs={true}
          />
          <div className="flex flex-col flex-1">
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
                className={`${style.modalSize}`}
                outerClassname="justify-center"
              />
            )}
            <div className={`fixed ${style.footer}`}>
              {newsDetails.vimeo_video_id && (
                <AudioControl
                  className={null}
                  setIsShowContent={setIsShowContent}
                  isShowContent={isShowContent}
                  showLetterButton={currentTab === 'en'}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Preview;
