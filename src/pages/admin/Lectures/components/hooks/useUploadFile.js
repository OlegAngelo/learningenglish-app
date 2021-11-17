import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import moment from 'moment';

import VimeoApi from '../../../../../api/VimeoApi';

const useUploadFile = (props) => {
  const [windowOffset, setWindowOffset] = useState(0);
  const dispatch = useDispatch();
  const lecturesId = useParams().id;
  const fileInputRef = useRef(null);
  const [showUploadModal, setShowUploadModal] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showUploadLoading, setShowUploadLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const msgSuccessRequest = 'ファイルをアップロードしました。';
  const msgFailRequest = 'エラーが発生しました。後ほど再度お試しください。';
  const msgErrorOccurred = 'エラーが発生しました。後ほど再度お試しください。';
  const msgInvalidImgFile = '画像ファイルが無効です';
  const msgFileNameRequired = 'ファイル名は必須項目です。';
  const msgFileNameMax = 'ファイル名は255文字以内である必要があります。'
  const msgVideoFileFormatAllowed = 'ファイル形式はMP4, MOV, WMV, AVI, FLVのいずれかである必要があります。';
  const msgInvalidVideoFile = '無効なビデオファイルです。';
  const msgInvalidFile = 'ファイル形式が無効です。';

  const {
    uploadThumbnail = null,
    createOnDemandVideo = null,
    uploadExcerise = null,
    fileType,
    uploadFunction,
    setVideoList,
    videoTitle,
    setVideoTitle,
    handleOnClickUpload = () => {},
    handleOnSuccessUpload = () => {},
  } = props;

  const [errors, setErrors] = useState({
    data: [],
  });
  const [file, setFile] = useState(fileType);
  const [uploadedfile, setUploadedFile] = useState(fileType);
  
  const showAlertSuccess = () => {
    resetUpload();
    closeModal();
    setAlertMessage(msgSuccessRequest);
    setIsSuccessRequest(true);
    setIsShowAlertModal(true);
  }

  const showAlertFail= () => {
    resetUpload();
    closeModal();
    setAlertMessage(msgFailRequest);
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
    setFile(fileType);
  };

  const fileDrop = (upload, event) => {
    event.preventDefault();
    resetUpload();
    setUploadStatus('uploading');
    setUploading(upload);
  };
  
  const getVideoDuration = (file) => {
    let video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      setVideoDuration(video.duration);
    }

    video.src = URL.createObjectURL(file);
  };

  const setUploading = (upload) => {
    if (showUploadModal === 'video') {
      getVideoDuration(upload[0]);
    }
    setFile({
      [showUploadModal]: {
        file: upload[0],
        name: upload[0]['name'],
        size: upload[0]['size'],
        id: lecturesId,
      }
    });
    setTimeout(() => {
      setUploadStatus(true);
    }, 500);
  }

  const onFileInputChange = (event) => {
    resetUpload();
    setUploadStatus('uploading');
    let upload = event.target.files;
    setUploading(upload);
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
      errorMsgs.push(msgFileNameRequired);
    }
    
    if (name >= nameMaxLength) {
      errorMsgs.push(msgFileNameMax);
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

  const validateImageInput = () => {
    const nameMaxLength = 255;
    const nameMinLength = 1;
    const fileType = [
      'image/jpg',
      'image/jpeg',
      'image/png',
    ];
    const {file: input , name, size} = file[showUploadModal];

    let errorMsgs = [];

    if (name <= nameMinLength) {
      errorMsgs.push(msgFileNameRequired);
    }
    
    if (name >= nameMaxLength) {
      errorMsgs.push(msgFileNameMax);
    }
    
    if (!fileType.includes(input.type)) {
      errorMsgs.push(msgInvalidImgFile);
    }

    if (errorMsgs.length) {
      resetUpload();
      setErrors({
        data: errorMsgs,
        header: msgInvalidImgFile,
      });

      return false;
    }

    return true;
  };

  const validateExcelInput = () => {
    const nameMaxLength = 255;
    const nameMinLength = 1;
    const fileType = [
     'application/wps-office.xlsx',
     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
     'application/vnd.ms-excel',
    ];
    const {file: input , name, size} = file[showUploadModal];

    let errorMsgs = [];

    if (name <= nameMinLength) {
      errorMsgs.push(msgFileNameRequired);
    }
    
    if (name >= nameMaxLength) {
      errorMsgs.push(msgFileNameMax);
    }
    
    if (!fileType.includes(input.type)) {
      errorMsgs.push(msgInvalidFile);
    }

    if (errorMsgs.length) {
      resetUpload();
      setErrors({
        data: errorMsgs,
        header: msgInvalidFile,
      });

      return false;
    }

    return true;
  };

  const uploadDone = () => {
    if (uploadStatus !== true) return;
    setUploadStatus('uploading');
    
    if (file) {
      if (uploadFunction == 'imageUpload') {
        if (validateImageInput()) {
          uploadImage();
        }
      } else if (uploadFunction == 'uploadOnDemandVideo') {
        if (validateAudioInput()) {
          uploadOnDemandVideo();
        }
      } else if (uploadFunction == 'uploadImageReady') {
        if (validateImageInput()) {
          closeModal();
          uploadImageReady();
        }
      } else if (uploadFunction == 'uploadExercise') {
        if (validateExcelInput()) {
          closeModal();
          handleUploadExercise();
        }
      } else {
        closeModal();
      }
    }
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

  const uploadImageReady = () => {
    handleOnClickUpload(file[showUploadModal].file);
  }

  const handleUploadExercise = () => {
    setUploadPercentage(0);
    setShowUploadLoading(true);

    dispatch(uploadExcerise({
      ...file[showUploadModal],
      onUploadProgress: (data) => {
        const { loaded, total } = data;
        const percentage = Math.floor((loaded * 100) / total);
        setUploadPercentage(percentage);
      }
    }))
      .then((res) => {
        setShowUploadLoading(false);

        if (res.payload.status == 200) {
          handleOnSuccessUpload(res);
          showAlertSuccess();
        } else {
          showAlertFail();
          console.error(res);
        }
      })
      .catch((err) => {
        setShowUploadLoading(false);
        showAlertFail();
        console.error(err);
      });
  };

  const uploadOnDemandVideo = () => {
    dispatch(createOnDemandVideo({ 
      ...file[showUploadModal]
    }))
      .then(async (res) => {
        setShowUploadLoading(true);
        const {upload_link, vimeoVideoId, file_name} = res.payload.data;
        const uploadParams = {
          uploadLink: upload_link,
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
            setVideoList(prevState => [
              ...prevState,
              {
                title : videoTitle,
                updated_at_date : moment(new Date()).format('YYYY/MM/DD'),
                updated_at_time : moment(new Date()).format('HH:mm'),
                last_modified: `${moment(new Date()).format('YYYY/MM/DD')} \n ${moment(new Date()).format('HH:mm')}`,
                num_views : '-',
                num_viewers : '-',
                url : upload_link,
                vimeoVideoId : vimeoVideoId,
                file_name : file_name,
                duration: parseInt(videoDuration),
              }
            ]);
            setVideoTitle('');
            setVideoDuration(null);
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

  return {
    modalProps: modalProps,
    showUploadModal: showUploadModal,
    setShowUploadModal: setShowUploadModal,
    file: file,
    uploadedfile: uploadedfile,
    alertMessage: alertMessage,
    isSuccessRequest: isSuccessRequest,
    isShowAlertModal: isShowAlertModal,
    setIsShowAlertModal: setIsShowAlertModal,
    setIsSuccessRequest,
    setIsShowAlertModal,
    showUploadLoading,
    uploadPercentage,
    setAlertMessage,
    setIsSuccessRequest,
    showAlertFail,
  };
};

export default useUploadFile;
