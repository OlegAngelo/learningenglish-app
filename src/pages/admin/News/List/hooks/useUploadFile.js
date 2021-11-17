import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { fetchNewsList, importNewsList } from '../../../../../redux/news/slice';
import { disableScroll, enableScroll } from '../../../../../utils/scrollableHelper';

const useUploadFile = (props) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [showModalPercentage, setShowModalPercentage] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const uploadSuccessMessage = '記事がアップロードされました。';
  const uploadFailedMessage = 'エラーが発生しました。後ほど再度お試しください。';
  const [alertUploadMessage, setAlertUploadMessage] = useState('');
  const [isUploadSuccessRequest, setIsUploadSuccessRequest] = useState(false);
  const [isShowAlertModalUpload, setIsShowAlertModalUpload] = useState(false);
  const [errors, setErrors] = useState({
    data: [],
    status: 404,
  });

  const closeModal = () => {
    setIsShowAlertModalUpload(false);
    setIsShowModal(false);
    setUploadStatus(false);
    setErrors({
      data: [],
      status: 404,
    });
  };

  // event handler for drag & drop
  const fileDrop = (files, event) => {
    setFile({
      upload: files,
      name: files[0]['name'],
      size: files[0]['size'],
    });
    setUploading();
  };

  const onFileInputChange = (event) => {
    const upload = event.target.files;

    setFile({
      upload: upload,
      name: upload[0]['name'],
      size: upload[0]['size'],
    });
    setUploadPercentage(0);
    setUploading(upload);
  };

  // when loading files after select file
  const setUploading = (upload) => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus(true);
    }, 100);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  // event handler to get progress for sending a request
  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percentage = Math.floor((loaded * 100) / total);
    setUploadPercentage(percentage);
  };

  // event handler after clicking upload button
  const uploadDone = () => {
    if (uploadStatus !== true || !file) return;

    closeModal();
    setUploadStatus(false);

    setShowModalPercentage(true);

    dispatch(
      importNewsList({
        data: file.upload,
        callback: onUploadProgress,
      })
    )
      .then(({ payload }) => {
        let { status } = payload;

        // response went successful auto load news lit
        if (status === 201) {
          setAlertUploadMessage(uploadSuccessMessage);
          setIsUploadSuccessRequest(true);
          dispatch(fetchNewsList({}));
          setIsShowModal(false);
          setIsShowAlertModalUpload(true);
          return;
        }

        setErrors({
          data: status === 422 && (payload.data?.errors || payload.data),
          status: status,
          header:
            status === 422
              ? payload.data?.errors
                ? payload.data.errors[0]
                : 'エクセルファイルの中に入力された無効なデータがあります。詳細はこちらをクリックしてください。'
              : '内部サーバーエラー',
          validExcelFile: !payload.data?.errors && status !== 500,
        });

        setAlertUploadMessage(uploadFailedMessage);
        setIsUploadSuccessRequest(false);
        setIsShowModal(true);
        setUploadStatus(false);
      })
      .catch((err) => {
        setShowModalPercentage(false);
        closeModal();
        setAlertUploadMessage(uploadFailedMessage);
        setIsUploadSuccessRequest(false);
        setIsShowAlertModalUpload(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowModalPercentage(false);
        }, 100);
      });
  };

  useEffect(() => {
    if (isShowModal || showModalPercentage) disableScroll(true);
    else enableScroll();
  }, [isShowModal, showModalPercentage]);

  const modalProps = {
    fileInputRef,
    isShowModal,
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
    isShowModal: isShowModal,
    file: file,
    showModalPercentage: showModalPercentage,
    uploadPercentage: uploadPercentage,
    setIsShowModal: setIsShowModal,
    alertUploadMessage: alertUploadMessage,
    isUploadSuccessRequest: isUploadSuccessRequest,
    isShowAlertModalUpload: isShowAlertModalUpload,
  };
};

export default useUploadFile;
