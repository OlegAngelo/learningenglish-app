import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import ServerErrorMessages from '../components/ServerErrorMessages';

import useUpload from './useUpload';

const useUploadSetAudio = ({
  getJPTranslatedForAlert,
  getJPTranslatedMessages,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const [isShowAlertResultModal, setIsShowAlertResultModal] = useState(false);
  const [uploadResult, setUploadResult] = useState({
    response_code: 201,
    is_success: false,
    message: '',
  });
  const [audioFileName, setAudioFileName] = useState();
  const [audioRaw, setAudioRaw] = useState(null);

  // event when click import button
  const importOnClickHandler = (event) => {
    setIsShowUploadModal(true);
    event.target.blur();
  };

  // event handler to get progress for sending a request
  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percentage = Math.floor((loaded * 100) / total);
    setUploadPercentage(percentage);
  };

  const fileTypes = ['video/mp4', 'audio/mp3', 'audio/mpeg'];

  // event callback after clicking the upload ok button
  const onUploadFileCallback = (params) => {
    setIsShowModalPercentage(false);

    if (!fileTypes.includes(file.upload[0].type)) {
      setErrors(getJPTranslatedMessages(file.upload[0]));
      setIsShowUploadModal(true);
      setFile();
    } else {
      const upload = file.upload;
      setAudioFileName(upload[0]['name']);
      setAudioRaw(upload[0]);
      setFile({
        upload: upload,
        name: upload[0]['name'],
        size: upload[0]['size'],
      });
    }
  };

  const hookProps = {
    onUploadFileCallback,
    onUploadProgress,
  };

  const {
    uploadModalProps,
    isShowModalPercentage,
    uploadPercentage,
    isShowUploadModal,
    file,
    setIsShowUploadModal,
    setIsShowModalPercentage,
    setUploadPercentage,
    setUploadStatus,
    setFile,
  } = useUpload(hookProps);

  const ErrorMessages = () => <ServerErrorMessages errors={errors} />;

  useEffect(() => {
    if (!isShowUploadModal) setErrors(null);
  }, [isShowUploadModal]);

  const finalModalProps = {
    ...uploadModalProps,
    title: '音声ファイルをアップロードしてください',
    modalStyle: { top: 0 },
    icon: 'audio',
    file,
    ErrorMessages,
  };

  return {
    importOnClickHandler,
    setIsShowAlertResultModal,
    isShowUploadModal,
    isShowAlertResultModal,
    uploadModalProps: finalModalProps,
    uploadResult,
    isShowModalPercentage,
    uploadPercentage,
    audioFileName,
    audioRaw,
    setAudioRaw,
  };
};

export default useUploadSetAudio;
