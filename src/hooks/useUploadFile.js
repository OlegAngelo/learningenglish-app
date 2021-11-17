import React, { useState, useEffect, useRef } from 'react';

import {
  disableScroll,
  enableScroll,
} from '../utils/scrollableHelper';

const useUploadFile = (props) => {
  const fileInputRef = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [showModalPercentage, setShowModalPercentage] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const uploadSuccessMessage = '記事がアップロードされました。';
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
      ...files,
      upload: files,
      name: files[0]['name'],
      size: files[0]['size'],
    });
    setUploading();
  };

  const onFileInputChange = (event) => {
    const upload = event.target.files;

    setFile({
      ...file,
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
    }, 1000);
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
    setIsShowModal(false);
    setFile({
      ...file,
      ready: true,
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
