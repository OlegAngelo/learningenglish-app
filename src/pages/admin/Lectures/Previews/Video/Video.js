import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import Header from '../../../../../shared/Header';
import Loading from '../../../../../shared/Loading';
import Menu from '../../../../../shared/Menu';
import Tab from '../../../../../shared/Menu/components/Tab';
import PlaySpeedModal from '../../../../user/Lectures/OnDemand/components/PlaySpeedModal';
import VideoPlayer from '../../../../user/Lectures/components/Video';

import {
  fetchUserLectureDetails,
  setVimeoId,
  resetVimeoPlayer,
} from '../../../../../redux/userLectureDetails/slice';
import useModal from '../../../../../hooks/useModal';

import style from './Video.module.css';

const Video = (props) => {
  const [isFetching, setIsFetching] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const { lectureId, videoId } = useParams();
  const [show, displayModal] = useModal();
  const { thumbnail } = useSelector((state) => state.userLectureDetails);

  const setDefaultVideo = async () => {
    await dispatch(fetchUserLectureDetails({ lectureId, isAdminPreview: true })).then(
      (res) => {
        if (res.payload.status === 404) history.push('/404');
        setIsFetching(false);
      }
    );
  };

  useEffect(async () => {
    await setDefaultVideo();
    dispatch(
      setVimeoId({
        vimeoId: videoId,
        isDefault: true,
        videoId: 54,
      })
    );

    return () => {
      dispatch(resetVimeoPlayer());
    };
  }, []);

  const convertToImage = (img) => {
    if (!img) return;
    let blob = new Blob([img], {
      type: 'image/jpg',
    });

    return URL.createObjectURL(blob);
  };

  return (
    <Fragment>
      {isFetching || !thumbnail ? (
        <div className="flex w-full justify-center pt-px-20 bg-black">
          <Loading
            className={`bg-background-200 ${style.screenSize}`}
            iconClass="bg-primary-500 text-primary-500"
          />
        </div>
      ) : (
        <div
          className={`${
            false ? `overflow-hidden` : `overflow-x-scroll`
          } bg-background-200 relative ${style.screenSize} ${
            style.noScrollbar
          } flex flex-col`}
        >
          <div className="sticky top-0 z-10">
            <Header title="大教室" hasBack={true} forcedUrl="#"></Header>
            {isFetching ? (
              <Loading
                className="top-16 bg-background-200"
                iconClass="bg-primary-500 text-primary-500"
                zIndex="z-0"
              />
            ) : (
              <Fragment>
                <VideoPlayer
                  errorMessage="プレビューするために、Vimeo側にて処理を行っています。後ほど再度お試しください。"
                  thumbnail={convertToImage(thumbnail)}
                  moreOptionHandler={displayModal}
                />
                <Menu bgColor="primary-500" spaceX="1" isTabFlat forNews>
                  <Tab
                    type="flat"
                    className={`pt-px-12 pb-px-12 ${style.cursorDefault} ${style.tabs}`}
                    size="sm"
                  >
                    概要
                  </Tab>
                  <Tab
                    type="flat"
                    className={`pt-px-12 pb-px-12 ${style.cursorDefault} ${style.tabs}`}
                    size="sm"
                  >
                    動画一覧
                  </Tab>
                </Menu>
              </Fragment>
            )}
          </div>

          <PlaySpeedModal show={show} onCloseModalHandler={displayModal} />

          <div className="m-px-16">
            <div className="flex flex-wrap"></div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Video;
