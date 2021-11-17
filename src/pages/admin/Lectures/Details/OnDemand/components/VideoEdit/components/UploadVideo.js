import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UploadModal from '../../../../../components/UploadModal';
import AlertModal from '../../../../../../../../shared/AlertModal';
import Button from '../../../../../../../../shared/Button';
import UploadLoadingScreen from '../../../../../../../../shared/UploadLoadingScreen';
import AddBoxIcon from '../../../../../../../../shared/icons/AddBoxIcon';

import useUploadFile from '../../../../../components/hooks/useUploadFile';
import { enableScroll, disableScroll } from '../../../../../../../../utils/scrollableHelper';
import {
  createOnDemandVideo,
  setVideoDetails,
} from '../../../../../../../../redux/lectures/slice';

const UploadVideo = () => {
  const dispatch = useDispatch();
  const [windowOffset, setWindowOffset] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const {
    videoDetails,
  } = useSelector((state) => state.lectures);

  const fileType = {
    video : null,
  };

  let uploadFunction = 'uploadOnDemandVideo';

  const useUploadFileProps = {
    createOnDemandVideo,
    fileType,
    uploadFunction,
    setVideoList,
    videoTitle: videoDetails?.title,
    setVideoTitle: () => {},
  };

  const {
    modalProps,
    showUploadModal,
    setShowUploadModal,
    file,
    alertMessage,
    isSuccessRequest,
    isShowAlertModal,
    setIsShowAlertModal,
    showUploadLoading,
    uploadPercentage,
  } = useUploadFile(useUploadFileProps);

  // prevent scroll when modals are opened
  useEffect(() => {
    if (showUploadModal) disableScroll(true);
    else enableScroll();
  }, [showUploadModal]);

  useEffect(() => {
    if (videoList.length > 0) {
      localStorage.setItem('newly_added_vimeoId', videoList[0].vimeoVideoId);
      dispatch(setVideoDetails({
        ...videoDetails,
        file_name: videoList[0].file_name,
        url: videoList[0].vimeoVideoId,
        duration: videoList[0].duration,
      }));
    }
  }, [videoList]);

  return (
    <div>
      {showUploadModal && (
        <UploadModal
          title="動画ファイルをアップロードしてください"
          icon="subscription"
          file={file[showUploadModal]}
          modalStyle={{ top: windowOffset }}
          {...modalProps}
        />
      )}

      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
        onClickOutsideClose={false}
      />

      {showUploadLoading && (
        <UploadLoadingScreen 
          percentage={uploadPercentage}
        />
      )}

      <Button
        className="pt-px-16"
        type="blue-square"
        icon={<AddBoxIcon color="white" width="18" height="18" />}
        onClick={(e) => {
          e.target.blur();
          if (!videoDetails?.title) return;
          setVideoList([]);
          setShowUploadModal('video');
        }}
        disabled={(!!videoDetails?.title && !!!videoDetails?.file_name) ? false : true}
      >
        動画をアップロード
      </Button>
    </div>
  );
};

export default UploadVideo;
