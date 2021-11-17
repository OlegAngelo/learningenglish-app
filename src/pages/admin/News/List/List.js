import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Breadcrumb from '../../../../shared/Breadcrumb';
import DownloadModal from '../components/DownloadModal';
import TableList from './components/TableList';
import TopSection from './components/TopSection';
import UploadLoading from '../components/UploadLoading';
import UploadModal from '../components/UploadModal/UploadModal';
import AlertModal from '../../../../shared/AlertModal';
import ConfirmationModal from '../../../../shared/ConfirmationModal';
import NewsApi from '../../../../api/NewsApi';

import { fetchNewsList } from '../../../../redux/news/slice';

import useUploadFile from './hooks/useUploadFile';
import useDownloadFile from './hooks/useDownloadFile';
import { disableScroll, enableScroll } from '../../../../utils/scrollableHelper';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const List = () => {
  const dispatch = useDispatch();
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] = useState(false);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const deleteConfirmationMessage = 'このニュースを消去しますか？';
  const deleteSuccessMessage = 'ニュースを消去しました';
  const deleteFailedMessage = 'エラーが発生しました。後ほど再度お試しください。';
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [alertMessage, setAlertMessage] = useState(true);
  const [windowOffset, setWindowOffset] = useState(0);
  const page = useQuery().get('page');
  const keyword = useQuery().get('keyword');
  const records = useQuery().get('records');
  const [progressPercentage, setProgressPercentage] = useState(0);

  const {
    modalProps,
    showModalPercentage: showUploadPercentage,
    uploadPercentage,
    isShowModal: isShowUploadModal,
    file,
    setIsShowModal: setUploadModal,
    alertUploadMessage,
    isUploadSuccessRequest,
    isShowAlertModalUpload,
  } = useUploadFile();

  const {
    downloadModalProps,
    downloadPercentage,
    showDownloadPercentage,
    showDownloadModal,
    setShowDownloadModal,
    alertDownloadMessage,
    isDownloadSuccessRequest,
    isShowAlertModalDownload,
  } = useDownloadFile();

  useEffect(() => {
    if (downloadPercentage || uploadPercentage) {
      if (downloadPercentage) setProgressPercentage(downloadPercentage);
      else setProgressPercentage(uploadPercentage);
    }
  }, [downloadPercentage, uploadPercentage]);

  useEffect(() => {
    if (isShowAlertModalUpload) {
      setAlertMessage(alertUploadMessage);
      setIsSuccessRequest(isUploadSuccessRequest);
      setIsShowAlertModal(true);
    }
  }, [isShowAlertModalUpload])

  useEffect(() => {
    if (isShowAlertModalDownload) {
      setAlertMessage(alertDownloadMessage);
      setIsSuccessRequest(isDownloadSuccessRequest);
      setIsShowAlertModal(true);
    }
  }, [isShowAlertModalDownload])

  const deleteNews = (newsId) => {
    setSelectedNewsId(newsId);
    setIsShowConfirmDeleteModal(true);
  };

  const onConfirmDelete = () => {
    NewsApi.deleteNews(selectedNewsId)
      .then((res) => {
        setAlertMessage(deleteSuccessMessage);
        setIsSuccessRequest(true);
      })
      .catch((err) => {
        console.error(err);
        setAlertMessage(deleteFailedMessage);
        setIsSuccessRequest(false);
      })
      .finally(() => {
        setIsShowConfirmDeleteModal(false);
        setIsShowAlertModal(true);
        const payload = {
          page,
          keyword,
          records,
        };
        dispatch(fetchNewsList(payload));
      });
  };

  // prevent scroll when modals are opened
  useEffect(() => {
    if (isShowUploadModal || showDownloadModal) disableScroll(true);
    else enableScroll();
  }, [isShowUploadModal, showDownloadModal]);

  useEffect(() => {
    document.body.className = 'bg-adminGray-100';
  });

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full pb-px-20">
      {showDownloadModal && <DownloadModal {...downloadModalProps} />}
      {isShowUploadModal && (
        <UploadModal
          title="Excelデータをアップロードしてください"
          icon="file"
          file={file}
          modalStyle={{ top: windowOffset }}
          hasRuler={false}
          {...modalProps}
        />
      )}
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
      />
      <ConfirmationModal
        showConfirmationModal={isShowConfirmDeleteModal}
        setShowConfirmationModal={setIsShowConfirmDeleteModal}
        message={deleteConfirmationMessage}
        submitText="はい"
        cancelText="いいえ"
        onSubmit={() => {
          onConfirmDelete();
        }}
      />
      {(showUploadPercentage || showDownloadPercentage) && (
        <UploadLoading percentage={progressPercentage} />
      )}

      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="ニュース" to="#5" active last />
      </div>

      <TopSection
        setUploadModal={setUploadModal}
        setShowDownloadModal={setShowDownloadModal}
      />

      <div className="pb-12">
        <TableList deleteNews={deleteNews} />
      </div>
    </div>
  );
};

export default List;
