import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import ImageFilterIcon from '../../../../../../../shared/icons/ImageFilterIcon';
import Button from '../../../../../../../shared/Button';
import AlertModal from '../../../../../../../shared/AlertModal';

import {
  fetchOnDemandVideoDetails,
  updateOnDemandVideoDetails,
  setVideoDetails,
  resetVideoDetails,
} from '../../../../../../../redux/lectures/slice';

import style from './VideoEdit.module.css';
import UploadVideo from './components/UploadVideo';
import useConfirmBeforeOnLeave from '../../../../../../../hooks/useConfirmBeforeOnLeave';

const VideoEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { videoId, id: lectureId } = useParams();
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isAlertSuccess, setIsAlertSuccess] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSubmittedToApi, setIsSubmittedToApi] = useState(false);
  const errorMsg = {
    true: '小テーマを編集しました。',
    false: 'タイトルの変更に失敗しました。',
    noInternet: 'エラーが発生しました。後ほど再度お試しください。',
  };
  const {
    adminLectureDetail,
    fetchingVideoDetails,
    videoDetails,
  } = useSelector((state) => state.lectures);
  const [prompt, setShowDiscardModal] = useConfirmBeforeOnLeave({message: '編集内容を破棄してページを移動しますか？'});

  const saveDetails = () => {
    setIsSubmittedToApi(true);
    localStorage.removeItem('newly_added_vimeoId');
    dispatch(updateOnDemandVideoDetails({
      videoId: videoId,
      data: videoDetails,
    }))
      .then((res) => {
        const { status } = res.payload;
        if (status === 200) {
          setAlertMessage(errorMsg.true);
          setIsAlertSuccess(true);
          setIsShowAlertModal(true);
        } else {
          setAlertMessage(errorMsg.false);
          setIsAlertSuccess(false);
          setIsShowAlertModal(true);
        }
      })
      .catch((e) => {
        setAlertMessage(errorMsg.noInternet);
        setIsAlertSuccess(false);
        setIsShowAlertModal(true);
      })
      .finally(() => {
        setIsSubmittedToApi(false);
        setShowDiscardModal(false);
      });
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchOnDemandVideoDetails(videoId));

    return () => {
      dispatch(resetVideoDetails());
    };
  }, []);

  const openPreview = (event, videoDetails) => {
    event.target.blur();
    const { lecture_id, url: vimeoId } = videoDetails;
    window.open(`/admin/lectures/${lecture_id}/video/${vimeoId}/preview`, '_blank');
  };

  const onDelete = () => {
    setShowDiscardModal(true);
    dispatch(setVideoDetails({
      ...videoDetails,
      file_name: null
    }))
  };

  const titleOnKeyUp = (e) => {
    setShowDiscardModal(true);
    dispatch(setVideoDetails({
      ...videoDetails,
      title: e.target.value,
    }))
  };

  return (
    <Fragment>
      {prompt}
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isAlertSuccess}
        message={alertMessage}
        handleOnClickOk={() => history.push(`/admin/lectures/on-demand/details/${lectureId}/video-list`)}
        onClickOutsideClose={false}
      />
      <div>
        <p className="font-bold font-normal text-12 text-gray-400 mb-px-8">
          タイトル
        </p>
        <p className="text-gray-900 text-14 font-normal">
          {adminLectureDetail?.title}
        </p>
      </div>
      <div className="mt-px-40">
        <p className="font-bold font-normal text-12 text-gray-400 mb-px-8">
          小テーマ <span className="text-adminRed-400">*</span>
        </p>
        <input
          className={`border-px-2 border-adminGray-200 ${style.inputVideoEdit}`}
          type="text"
          defaultValue={videoDetails?.title ?? ''}
          onChange={(e) => titleOnKeyUp(e)}
          onKeyUp={(e) => e.target.value === '' && 
          dispatch(setVideoDetails({
            ...videoDetails,
            title: e.target.value,
          }))}
          disabled={fetchingVideoDetails}
        />
      </div>
      <div className="mt-px-40">
        <p className="font-bold text-18 text-base-dark pb-px-18">動画</p>
        <div className="flex items center h-px-20">
          <span className="pr-px-20 text-12 text-basic-100">
            {fetchingVideoDetails
              ? '読み込み中...'
              : videoDetails.file_name ?? ' なし'
            }
          </span>
          {(!fetchingVideoDetails && videoDetails.file_name) && (
            <DeleteIcon
              width="20"
              height="20"
              className="cursor-pointer"
              onClick={() => onDelete()}
            />
          )}
        </div>
        <div className="flex">
          <Button
            className="pt-px-16 mr-px-10"
            type="blue-square"
            icon={<ImageFilterIcon color="white" width="18" height="18" />}
            onClick={(event) => openPreview(event, videoDetails)}
            disabled={fetchingVideoDetails ? true : !videoDetails.file_name}
          >
            動画をプレビュー
          </Button>

          <UploadVideo />
        </div>
        <div className="mt-px-40">
          <Button
            className=""
            innerClass={`px-px-34 ${!isSubmittedToApi && 'cursor-pointer'}`}
            type="blue-square"
            disabled={(videoDetails?.title && videoDetails?.file_name && !fetchingVideoDetails) ? false : true}
            onClick={saveDetails}
          >
            {isSubmittedToApi ? '登録中...' : '登録'}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default VideoEdit;
