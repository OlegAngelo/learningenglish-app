import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import ServerErrorMessages from '../components/ServerErrorMessages';

import { 
  fetchList, 
  importSLListening,
} from '../../../../redux/selfLearning/listening/admin/slice.js';

import useUpload from './useUpload';

const useUploadListening = ({ getJPTranslatedForAlert, getJPTranslatedMessages }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const [isShowAlertResultModal, setIsShowAlertResultModal] = useState(false);
  const [uploadResult, setUploadResult] = useState({
    response_code: 201,
    is_success: false,
    message: '',
  });
  const URLParams = new URLSearchParams();
  const {
    page = URLParams.page ?? 1,
    level = URLParams.level ?? 1,
  } = queryString.parse(useLocation().search);

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

  // event callback after clicking the upload ok button
  const onUploadFileCallback = (params) => {
    dispatch(
      importSLListening({
        data: file.upload,
        callback: onUploadProgress,
      })
    )
      .then(({ payload }) => {
        let { status, data } = payload;
        setUploadResult(getJPTranslatedForAlert(status));

        if (status === 201) setIsShowAlertResultModal(true);

        // check if request was successful
        if (status === 201) {
          dispatch(fetchList({ page, level}));
          setIsShowUploadModal(false);
          return;
        }

        setErrors(getJPTranslatedMessages(data));

        if (status !== 500) setIsShowUploadModal(true);
        setUploadStatus(false);
      })
      .catch((err) => {
        setIsShowModalPercentage(false);
        setUploadStatus(false);
        setIsShowUploadModal(false);
        if (err.toJSON().message !== 'Network Error') setIsShowAlertResultModal(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsShowModalPercentage(false);
        }, 100);
      });
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
  } = useUpload(hookProps);

  const ErrorMessages = () => <ServerErrorMessages errors={errors} />;

  useEffect(() => {
    if (!isShowUploadModal) setErrors(null);
  }, [isShowUploadModal]);

  const finalModalProps = {
    ...uploadModalProps,
    title: 'Excelデータをアップロードしてください',
    modalStyle: { top: 0 },
    icon: 'file',
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
  };
};

export default useUploadListening;
