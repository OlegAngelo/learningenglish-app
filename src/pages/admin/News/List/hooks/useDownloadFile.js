import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { exportNewsList, resetExportParams } from '../../../../../redux/news/slice';

const useDownloadFile = () => {
  const dispatch = useDispatch();
  const { exportNewsParams } = useSelector((state) => state.news);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [downloadErrors, setDownloadErrors] = useState(null);
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [showDownloadPercentage, setShowDownloadPercentage] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [alertDownloadMessage, setAlertDownloadMessage] = useState('');
  const [isDownloadSuccessRequest, setIsDownloadSuccessRequest] = useState(false);
  const [isShowAlertModalDownload, setIsShowAlertModalDownload] = useState(false);

  const closeDownloadModal = (params) => {
    setDownloadErrors(null);
    setShowDownloadModal(false);
    dispatch(resetExportParams());
  };

  // event handler to get progress for sending a request
  const onDownloadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percentage = Math.floor((loaded * 100) / total);
    setDownloadPercentage(percentage);
  };

  useEffect(() => {
    setStartDate(exportNewsParams?.startDate ?? null);
    setEndDate(exportNewsParams?.endDate ?? null);
  }, [showDownloadModal, exportNewsParams]);

  const submitOnClick = async (params) => {
    let payload = {
      startDate,
      endDate,
      callback: onDownloadProgress,
    };

    setIsShowAlertModalDownload(false);
    setShowDownloadModal(false);
    setShowDownloadPercentage(true);
    dispatch(exportNewsList(payload)).then(({ payload, meta }) => {
      setShowDownloadPercentage(false);

      // auto-download if the api has returned successfully the excel file
      if (payload.status === 200) {
        const formatStartDate = moment(startDate).format('YYYYMMDD');
        const formatEndDate = moment(endDate).format('YYYYMMDD');
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(payload.data);
        link.download = `${formatStartDate}_to_${formatEndDate}_news.xlsx`;
        link.click();
        link.remove();
        closeDownloadModal();
        return;
      }

      setShowDownloadModal(true);
      if (payload.status === 500) {
        setDownloadErrors({
          error: 'エラーが発生しました。後ほど再度お試しください。',
        });
        return;
      }

      let b = new Blob([payload.data], { type: 'application/json' });
      let reader = new FileReader();

      reader.onload = function () {
        setDownloadErrors(JSON.parse(this.result));
      };

      reader.readAsText(b);
    })
    .catch((err) => {
      closeDownloadModal();
      setAlertDownloadMessage('エラーが発生しました。後ほど再度お試しください。');
      setIsDownloadSuccessRequest(false);
      setIsShowAlertModalDownload(true);
    });
  };

  const downloadModalProps = {
    closeDownloadModal,
    submitOnClick,
    setStartDate,
    setEndDate,
    downloadErrors,
    startDate,
    endDate,
  };

  return {
    downloadModalProps,
    downloadPercentage,
    showDownloadPercentage,
    showDownloadModal,
    setShowDownloadModal,
    alertDownloadMessage,
    isDownloadSuccessRequest,
    isShowAlertModalDownload,
  };
};

export default useDownloadFile;
