import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { disableScroll, enableScroll } from '../../../../utils/scrollableHelper';

const useUpload = (props) => {
  const { onUploadFileCallback = () => {} } = props;
  const fileInputRef = useRef(null);
  const [isShowUploadModal, setIsShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [isShowModalPercentage, setIsShowModalPercentage] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isShowAlertModalUpload, setIsShowAlertModalUpload] = useState(false);

  const closeModal = () => {
    setIsShowAlertModalUpload(false);
    setIsShowUploadModal(false);
    setUploadStatus(false);
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

  // event handler after clicking upload button
  const uploadDone = () => {
    if (uploadStatus !== true || !file) return;

    closeModal();
    setUploadStatus(false);
    setIsShowModalPercentage(true);
    onUploadFileCallback();
  };

  useEffect(() => {
    if (isShowUploadModal || isShowModalPercentage) disableScroll(true);
    else enableScroll();
  }, [isShowUploadModal, isShowModalPercentage]);

  const uploadModalProps = {
    fileInputRef,
    isShowUploadModal,
    closeModal,
    uploadStatus,
    fileDrop,
    onFileInputChange,
    setUploading,
    onTargetClick,
    uploadDone,
  };

  return {
    uploadModalProps,
    isShowUploadModal,
    file,
    isShowModalPercentage,
    uploadPercentage,
    isShowAlertModalUpload,
    setIsShowUploadModal,
    setIsShowModalPercentage,
    setUploadPercentage,
    setUploadStatus,
    setFile
  };
};

export default useUpload;
