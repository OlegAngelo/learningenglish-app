import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../../../../../shared/Modal/Modal';
import SpeedModal from '../SpeedModal';
import CloseIcon from '../../../../../../shared/icons/CloseIcon';
import FavoriteBorderIcon from '../../../../../../shared/icons/FavoriteBorderIcon';
import FavoriteIcon from '../../../../../../shared/icons/FavoriteIcon';
import SlowMotionIcon from '../../../../../../shared/icons/SlowMotionIcon';

import { toggleNewsBookmark } from '../../../../../../redux/news/slice';
import { enableScroll } from '../../../../../../utils/scrollableHelper';
import { setPlaybackRate } from '../../../../../../redux/vimeoPlayer/slice';
import isFromAdminUtil from '../../../../../../utils/IsFromAdmin'

import style from './OptionModal.module.css';

const OptionModal = (props) => {
  const {
    closeModal,
    isFavorite,
    setIsFavorite,
    speed,
    speedHandler,
  } = props;
  const dispatch = useDispatch();
  const { id: newsId } = useParams();
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const { newsDetails } = useSelector((state) => state.news);
  const isFromAdmin = isFromAdminUtil();

  const onCloseModalHandler = (params) => {
    enableScroll();
    closeModal();
  }

  const favoriteClickHandler = () => {
    dispatch(toggleNewsBookmark(newsId));
    setIsFavorite(!isFavorite);
    onCloseModalHandler();
  };

  const speedOnChangeHandler = (option) => {
    speedHandler(option);
    onCloseModalHandler();
    dispatch(setPlaybackRate(option.value));
  };

  return (
    <Fragment>
      <Modal
        className="z-40"
        outerClassname={style.modal}
        isClearIconShow={false}
        key="optionmodal"
      >
        <div className="flex flex-col w-full pt-px-15 pb-px-6 border-b border-basic-300">
          <div
            className="flex items-center hover:bg-adminGray-100 cursor-pointer py-px-12 px-px-16"
            onClick={() => isFromAdmin ? onCloseModalHandler() : favoriteClickHandler()}
          >
            {isFavorite ? (
              <FavoriteIcon className="mr-px-20" color="#141414" />
            ) : (
              <FavoriteBorderIcon className="mr-px-20" color="#141414" />
            )}

            <p className="text-15 text-basic-100">
              {isFavorite
                ? 'この記事のブックマークを削除'
                : 'この記事をブックマークに追加'}
            </p>
          </div>
          {newsDetails.vimeo_video_id && (
            <div
              className="flex items-center hover:bg-adminGray-100 cursor-pointer py-px-12 px-px-16"
              onClick={() => setShowSpeedModal(true)}
            >
              <SlowMotionIcon className="mr-px-20" color="#141414" />
              <p className="text-15 text-basic-100">
                再生速度 <span className="text-basic-300 ml-px-3">{speed}</span>
              </p>
            </div>
          )}
        </div>

        <div
          className={`w-full px-px-16 flex items-center py-px-20 mb-px-34 hover:bg-adminGray-100 cursor-pointer`}
          onClick={onCloseModalHandler}
        >
          <CloseIcon height="19" width="19" className="mr-px-20" color="#141414" />
          <p className="text-15 text-basic-100">キャンセル</p>
        </div>
      </Modal>

      {showSpeedModal && (
        <SpeedModal
          selected={speed}
          closeSpeedModal={() => setShowSpeedModal(false)}
          speedOnChangeHandler={speedOnChangeHandler}
        />
      )}
    </Fragment>
  );
};

export default OptionModal;
