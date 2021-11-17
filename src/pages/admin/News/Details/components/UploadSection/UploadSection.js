import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import UploadModal from '../../../components/UploadModal/UploadModal';
import UploadLoading from '../../../components/UploadLoading';
import ImageUploadSection from '../ImageUploadSection';
import AudioUploadSection from '../AudioUploadSection';
import AlertModal from '../../../../../../shared/AlertModal';
import { uploadThumbnail, createVideo } from '../../../../../../redux/news/slice';
import VimeoApi from '../../../../../../api/VimeoApi';

const UploadSection = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [showUploadModal, setShowUploadModal] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [showUploadLoading, setShowUploadLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [windowOffset, setWindowOffset] = useState(0);
  const newsId = useParams().id;
  const [errors, setErrors] = useState({
    data: [],
  });
  const [file, setFile] = useState({
    image : null,
    audio : null,
  });
  const [uploadedfile, setUploadedFile] = useState({
    image : null,
    audio : null,
  });
  const modalDisplayData = {
    image: {
      title: '画像データをアップロードしてください',
      icon: 'image',
    },
    audio: {
      title: '音声ファイルをアップロードしてください',
      icon: 'audio',
    },
  };

  const msgSuccessRequest = 'ファイルをアップロードしました。';
  const msgFailRequest = 'エラーが発生しました。後ほど再度お試しください。';
  const msgVideoFileNameRequired = 'ファイル名は必須項目です。';
  const msgVideoFileNameMax = 'ファイル名は255文字以内である必要があります。'
  const msgVideoFileFormatAllowed = 'ファイル形式はMP4, MOV, WMV, AVI, FLVのいずれかである必要があります。';
  const msgInvalidVideoFile = '無効なビデオファイルです。';
  const msgFileIsTooLarge = 'ファイルサイズが大きすぎます。';
  const msgErrorOccurred = 'エラーが発生しました。後ほど再度お試しください。';
  const msgInvalidImgFile = '画像ファイルが無効です';

  const showAlertSuccess = () => {
    resetUpload();
    closeModal();
    setIsSuccessRequest(true);
    setIsShowAlertModal(true);
  }

  const showAlertFail= () => {
    resetUpload();
    closeModal();
    setIsSuccessRequest(false);
    setIsShowAlertModal(true);
  }

  const closeModal = () => {
    setShowUploadModal(null);
    resetUpload();
  };
  
  const resetUpload = () => {
    setUploadStatus(false);
    setIsSuccessRequest(true);
    setErrors({
      data: [],
    });
    setFile({
      image : null,
      audio : null,
    });
  };

  const fileDrop = (upload, event) => {
    event.preventDefault();
    resetUpload();
    setUploadStatus('uploading');
    setUploading(upload);
  };

  const onFileInputChange = (event) => {
    resetUpload();
    setUploadStatus('uploading');
    let upload = event.target.files;
    setUploading(upload);
  };

  const setUploading = (upload) => {
    setFile({
      [showUploadModal]: {
        file : upload[0],
        name: upload[0]['name'],
        size: upload[0]['size'],
        newsId: newsId,
      }
    });
    setUploadStatus(true);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const validateAudioInput = () => {
    const nameMaxLength = 255;
    const nameMinLength = 1;
    const fileType = [
      'video/mp4',
      'video/quicktime',
      'video/x-ms-wmv',
      'video/x-msvideo',
      'video/x-flv'
    ];
    const {file: input , name, size} = file[showUploadModal];

    let errorMsgs = [];

    if (name <= nameMinLength) {
      errorMsgs.push(msgVideoFileNameRequired);
    }
    
    if (name >= nameMaxLength) {
      errorMsgs.push(msgVideoFileNameMax);
    }

    if (!fileType.includes(input.type)) {
      errorMsgs.push(msgVideoFileFormatAllowed);
    }

    if (errorMsgs.length) {
      resetUpload();
      setErrors({
        data: errorMsgs,
        header: msgInvalidVideoFile,
      });

      return false;
    }

    return true;
  };

  const uploadDone = () => {
    if (uploadStatus !== true) return;
    setUploadStatus('uploading');
    if (file) {
      if (showUploadModal == 'image') {
        uploadImage();
      } else if (showUploadModal == 'audio') {
        if (validateAudioInput()) {
          uploadAudio();
        }
      }
    }
  };

  const uploadAudio = () => {
    dispatch(createVideo({ 
      ...file[showUploadModal]
    }))
      .then(async (res) => {
        setShowUploadLoading(true);
        const uploadParams = {
          uploadLink: res.payload.data.upload_link,
          file: file[showUploadModal].file,
          onUploadProgress: (data) => {
            const { loaded, total } = data;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadPercentage(percentage);
          }
        };

        VimeoApi.upload(uploadParams)
          .then(res => {
            setShowUploadLoading(false);
            setUploadedFile({
              [showUploadModal] : file[showUploadModal].name
            });
            setUploadPercentage(0);
            showAlertSuccess();
          })
          .catch(err => {
            showAlertFail();
            console.error(err);
          });
      })
      .catch((err) => {
        setShowUploadLoading(false);
        showAlertFail();
        console.error(err);
      });
  }

  const uploadImage = () => {
    dispatch(uploadThumbnail(file[showUploadModal]))
      .then(({ payload }) => {
        let { status } = payload;
        if (status === 200) {
          setUploadedFile({
            [showUploadModal] : file[showUploadModal].name
          });
          showAlertSuccess();
        } else if (status === 422) {
          resetUpload();
          setErrors({
            header : msgInvalidImgFile,
            data : [msgInvalidImgFile],
          });
        } else {
          resetUpload();
          setErrors({
            header : msgErrorOccurred,
            data : [msgErrorOccurred],
          });
        }
      })
      .catch((err) => {
        showAlertFail();
      });
  }

  const modalProps = {
    fileInputRef,
    closeModal,
    uploadStatus,
    fileDrop,
    onFileInputChange,
    setUploading,
    onTargetClick,
    uploadDone,
    errors,
  };

  useEffect(() => {
    if (showUploadModal) {
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
  }, [showUploadModal]);

  return (
    <Fragment>
      {showUploadModal && (
        <UploadModal
          modalStyle={{top: windowOffset}}
          title={modalDisplayData[showUploadModal].title}
          icon={modalDisplayData[showUploadModal].icon}
          file={file[showUploadModal]}
          filenameClass={showUploadModal === 'audio' ? 'text-12' : 'underline'}
          {...modalProps}
        />
      )}
      {showUploadLoading && (
        <UploadLoading 
          percentage={uploadPercentage}
        />
      )}
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={isSuccessRequest ? msgSuccessRequest : msgFailRequest}
      />
      <ImageUploadSection 
        onClick={(e) => {e.preventDefault(); setShowUploadModal('image')}} 
        file={uploadedfile}
      />
      <AudioUploadSection 
        onClick={(e) => {e.preventDefault(); setShowUploadModal('audio')}} 
        file={uploadedfile}
      />
    </Fragment>
  );
};

export default UploadSection;
