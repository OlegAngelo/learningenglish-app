import React, { useState, useEffect, useRef } from 'react';

import { disableScroll, enableScroll } from '../../../../../../utils/scrollableHelper';

const useUploadFile = ({ title, setTitle, setList }) => {
  const fileInputRef = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [showModalPercentage, setShowModalPercentage] = useState(false);
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

  // event handler after clicking upload button
  const uploadDone = () => {
    if (uploadStatus !== true || !file) return;
    closeModal();
    addVideo();
  };

  const addVideo = () => {
    if (!title) return;

    setList(prevState => [
      ...prevState,
      {
        'title' : title,
        'updated_at_date' : '2021/5/12',
        'updated_at_time' : '14:02',
        'num_views' : '-',
        'num_viewers' : '-',
      }
    ]);
    setTitle('');
  }

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
    setIsShowModal: setIsShowModal,
    alertUploadMessage: alertUploadMessage,
    isUploadSuccessRequest: isUploadSuccessRequest,
    isShowAlertModalUpload: isShowAlertModalUpload,
  };
};

export default useUploadFile;
