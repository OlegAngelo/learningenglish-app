import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router';

import Breadcrumb from '../../../../shared/Breadcrumb';
import BasicInfoSection from './components/BasicInfoSection/BasicInfoSection';
import PreviewNewsSection from './components/PreviewNewsSection';
import ContentSection from './components/ContentSection';
import UploadSection from './components/UploadSection';
import ConfirmationModal from '../../../../shared/ConfirmationModal';
import AlertModal from '../../../../shared/AlertModal';

import {
  fetchNewsDetails,
  resetNewsDetails,
  uploadThumbnail,
  createVideo,
} from '../../../../redux/news/slice';
import NewsApi from '../../../../api/NewsApi';

import styles from './Details.module.css';

import UploadModal from '../components/UploadModal/UploadModal';
import UploadLoading from '../components/UploadLoading';
import VimeoApi from '../../../../api/VimeoApi';
import Button from '../../../../shared/Button/Button';
import AddBoxIcon from '../../../../shared/icons/AddBoxIcon';
import BoardComponent from './components/BoardComponent/BoardComponent';

const Details = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const newsId = useParams().id;
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [goBack, setGoBack] = useState(false);
  const deleteConfirmationMessage = 'このニュースを削除しますか？';

  useEffect(() => {
    dispatch(fetchNewsDetails(newsId));
    return () => {
      dispatch(resetNewsDetails());
    };
  }, []);

  const deleteNews = (newsId) => {
    setSelectedNewsId(newsId);
    setIsShowConfirmDeleteModal(true);
  };

  const onConfirmDelete = () => {
    NewsApi.deleteNews(selectedNewsId)
      .then(() => {
        setGoBack(true);
        showAlertModalFeedback('success', 'ニュースを削除しました。');
      })
      .catch((err) => {
        showAlertModalFeedback('failed');
      })
      .finally(() => {
        setIsShowConfirmDeleteModal(false);
        setIsShowAlertModal(true);
      });
  };

  const fileInputRef = useRef(null);
  const [showUploadModal, setShowUploadModal] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [showUploadLoading, setShowUploadLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [windowOffset, setWindowOffset] = useState(0);
  const [errors, setErrors] = useState({
    data: [],
  });
  const [file, setFile] = useState({
    image: null,
    audio: null,
  });
  const [uploadedfile, setUploadedFile] = useState({
    image: null,
    audio: null,
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

  const msgVideoFileNameRequired = 'ファイル名は必須項目です。';
  const msgVideoFileNameMax = 'ファイル名は255文字以内である必要があります。';
  const msgVideoFileFormatAllowed =
    'ファイル形式はMP4, MOV, WMV, AVI, FLVのいずれかである必要があります。';
  const msgInvalidVideoFile = '無効なビデオファイルです。';
  const msgFileIsTooLarge = 'ファイルサイズが大きすぎます。';
  const msgErrorOccurred = 'エラーが発生しました。後ほど再度お試しください。';
  const msgInvalidImgFile = '画像ファイルが無効です';

  const showAlertModalFeedback = (
    result,
    message = 'エラーが発生しました。後ほど再度お試しください。'
  ) => {
    resetUpload();
    closeModal();

    switch (result) {
      case 'success':
        setAlertMessage(message);
        setIsSuccessRequest(true);
        break;
      case 'failed':
        setAlertMessage(message);
        setIsSuccessRequest(false);
    }
    setIsShowAlertModal(true);
  };

  const onClickAlertOkButton = () => {
    if (goBack) history.push('/admin/news');
  };

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
      image: null,
      audio: null,
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
        file: upload[0],
        name: upload[0]['name'],
        size: upload[0]['size'],
        newsId: newsId,
      },
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
      'video/x-flv',
    ];
    const { file: input, name, size } = file[showUploadModal];

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
    dispatch(
      createVideo({
        ...file[showUploadModal],
      })
    )
      .then(async (res) => {
        setShowUploadLoading(true);
        const uploadParams = {
          uploadLink: res.payload.data.upload_link,
          file: file[showUploadModal].file,
          onUploadProgress: (data) => {
            const { loaded, total } = data;
            const percentage = Math.floor((loaded * 100) / total);
            setUploadPercentage(percentage);
          },
        };

        VimeoApi.upload(uploadParams)
          .then((res) => {
            setShowUploadLoading(false);
            setUploadedFile({
              ...uploadedfile,
              [showUploadModal]: file[showUploadModal].name,
            });
            setUploadPercentage(0);
            showAlertModalFeedback('success', 'ファイルをアップロードしました。');
          })
          .catch((err) => {
            showAlertModalFeedback('failed');
            console.error(err);
          });
      })
      .catch((err) => {
        setShowUploadLoading(false);
        showAlertModalFeedback('failed');
        console.error(err);
      });
  };

  const uploadImage = () => {
    dispatch(uploadThumbnail(file[showUploadModal]))
      .then(({ payload }) => {
        let { status } = payload;
        if (status === 200) {
          setUploadedFile({
            ...uploadedfile,
            [showUploadModal]: file[showUploadModal].name,
          });
          showAlertModalFeedback('success', 'ファイルをアップロードしました。');
        } else if (status === 422) {
          resetUpload();
          setErrors({
            header: msgInvalidImgFile,
            data: [msgInvalidImgFile],
          });
        } else {
          resetUpload();
          setErrors({
            header: msgErrorOccurred,
            data: [msgErrorOccurred],
          });
        }
      })
      .catch((err) => {
        showAlertModalFeedback('failed');
      });
  };

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

  const { newsDetails } = useSelector((state) => state.news);
  const { thumbnail_name } = newsDetails || {};
  const { video } = newsDetails || {};
  const getFileNameImage = () => {
    if (uploadedfile.image) {
      return uploadedfile.image;
    } else if (thumbnail_name) {
      return thumbnail_name;
    } else {
      return 'なし';
    }
  };

  const getFileNameAudio = () => {
    if (uploadedfile.audio) {
      return uploadedfile.audio;
    } else if (video) {
      return video;
    } else {
      return 'なし';
    }
  };

  return (
    <Fragment>
      {showUploadModal && (
        <UploadModal
          // modalStyle={{ top: windowOffset }}
          hasRuler={false}
          title={modalDisplayData[showUploadModal].title}
          icon={modalDisplayData[showUploadModal].icon}
          file={file[showUploadModal]}
          filenameClass={showUploadModal === 'audio' ? 'text-12' : 'underline'}
          {...modalProps}
        />
      )}
      {showUploadLoading && <UploadLoading percentage={uploadPercentage} />}
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
        handleOnClickOk={onClickAlertOkButton}
        onClickOutsideClose={false}
      />
      <div className="flex-1 w-full bg-adminGray-100 pb-px-100 overflow-scroll overflow-x-hidden">
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
        <div className="flex pb-px-16 pl-px-32 pt-px-24">
          <Breadcrumb text="ダッシュボード" to="/admin" />
          <Breadcrumb text="ニュース" to="/admin/news" />
          <Breadcrumb text="ニュース詳細" to="#3" active last />
        </div>
        <div className="pb-12 bg-adminGray-100">
          <div
            className={`bg-white mx-8 rounded-px-4 shadow-card ${styles.board}`}
          >
            <BasicInfoSection deleteNews={deleteNews} />
            <PreviewNewsSection />
            <BoardComponent>
              {/* <UploadSection /> */}
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                画像ファイル
              </h3>
              <h2 className="font-normal text-12 pt-px-16 break-all">
                {getFileNameImage()}
              </h2>

              <Button
                className="pt-px-14"
                innerClass="cursor-pointer"
                type="blue-square"
                icon={<AddBoxIcon width="16" height="16" />}
                onClick={(e) => {
                  e.preventDefault();
                  setShowUploadModal('image');
                }}
              >
                画像をアップロード
              </Button>
            </BoardComponent>
            <BoardComponent>
              {/* <UploadSection /> */}
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                音声ファイル
              </h3>
              <h2 className="font-normal text-12 pt-px-16 break-all">
                {getFileNameAudio()}
              </h2>
              <Button
                className="pt-px-14"
                innerClass="cursor-pointer"
                type="blue-square"
                icon={<AddBoxIcon width="16" height="16" />}
                onClick={(e) => {
                  e.preventDefault();
                  setShowUploadModal('audio');
                }}
              >
                音声ファイルをアップロード
              </Button>
            </BoardComponent>
            <ContentSection />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Details;
