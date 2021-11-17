import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import BasicInfoSection from './components/BasicInfoSection/BasicInfoSection';
import MenuTab from './components/MenuTab/MenuTab';
import BoardComponent from './components/BoardComponent/BoardComponent';
import Overview from './components/Overview/Overview';
import VideoList from './components/VideoList/VideoList';
import VideoEdit from './components/VideoEdit/VideoEdit';
import QuestionList from './components/QuestionList/QuestionList';
import Breadcrumb from '../../../../../shared/Breadcrumb/Breadcrumb';
import AlertModal from '../../../../../shared/AlertModal/AlertModal';
import ConfirmationModal from '../../../../../shared/ConfirmationModal/ConfirmationModal';

import {
  fetchAdminLectureDetail,
  resetAdminLectureDetail,
  deleteLectureDetails,
  setIsClickSave,
  publishOnDemand,
} from '../../../../../redux/lectures/slice';

import styles from './Details.module.css';
import useLectureOnDemand from '../../../../../hooks/useLectureOnDemand';
import useConfirmBeforeOnLeave from '../../../../../hooks/useConfirmBeforeOnLeave';

const LectureOnDemandDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmitOndemandMsgs = {
    true: 'オンデマンドを公開しました。',
    false: '無効な入力をされた項目があります。',
    noInternet: 'エラーが発生しました。後ほど再度お試しください。',
  };

  const currentTab = useParams().tab;
  const lectureId = useParams().id;
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);
  const [isFirstTabValid, setIsFirstTabValid] = useState(false);
  const [isFetchingLecture, setIsFetchingLecture] = useState(true);
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const deleteConfirmationMessage = 'このオンデマンドを消去しますか？';
  const { adminLectureDetail } = useSelector((state) => state.lectures);
  const alertMessages = {
    success_delete: 'オンデマンドを消去しました。',
    success_update: 'オンデマンドを更新しました。',
    failed: 'エラーが発生しました。後ほど再度お試しください。',
    invalid_fields: '無効な入力をされた項目があります。',
  };
  const [prompt, setShowDiscardModal] = useConfirmBeforeOnLeave({message: '編集内容を破棄してページを移動しますか？'});
  const [videoTitle, setVideoTitle] = useState('');
  const [isTranscoded, setIsTranscoded] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const onUpdateCallback = (response) => {
    setIsShowAlertModal(true);
    setIsSuccessRequest(response === 'success_update');
    setAlertMessage(alertMessages[response]);
  };

  const overviewProps = useLectureOnDemand({
    onUpdateCallback,
    setIsShowAlertModal,
    setIsSuccessRequest,
  });

  const { setOnDemandDetails, formHookData, submitToApiUpdate, resetOnDemandDetails, isSubmittedToApi, setIsSubmittedToApi } = overviewProps;

  const videoListProps = {
    ...overviewProps,
    videoTitle,
    setVideoTitle,
    setIsSaveBtnDisabled,
  };

  const publishAlertMessages = {
    success: 'オンデマンドを公開しました。',
    failed: 'エラーが発生しました。後ほど再度お試しください。',
    noInternet: 'エラーが発生しました。後ほど再度お試しください。',
  };

  const publishOnClick = () => {
    setIsPublishing(true);
    setIsTranscoded(false);
    setIsSubmittedToApi(true);
    dispatch(publishOnDemand({lectureId}))
      .then((res) => {
        const { status } = res.payload;
        if (status === 200) {
          setIsTranscoded(false);
          setAlertMessage(publishAlertMessages.success);
          setIsSuccessRequest(true);
          setIsPublished(true);
        } else {
          setIsTranscoded(true);
          setAlertMessage(publishAlertMessages.failed);
          setIsSuccessRequest(false);
        }
      })
      .catch((error) => {
        setIsTranscoded(true);
        setAlertMessage(publishAlertMessages.noInternet);
        setIsSuccessRequest(false);
      })
      .finally(() => {
        setIsPublishing(false);
        setIsShowAlertModal(true);
        setIsSubmittedToApi(false);
      });
  }

  const headerProps = {
    publishOnClick,
    isTranscoded,
    isPublishing,
  }

  const updateOnClick = () => {
    if (isFetchingLecture) return;

    if (currentTab === 'overview') {
      dispatch(setIsClickSave(true));
    
    } else {
      const formData = {
        genreId: overviewProps.genreId,
        level: overviewProps.level,
        title: overviewProps.title,
        theme: overviewProps.theme,
        description: overviewProps.description,
      }

      submitToApiUpdate(lectureId, formData, false);
    }
  };


  useEffect(() => {
    if ( isSubmittedToApi ) setIsTranscoded(false);
    else setIsTranscoded(adminLectureDetail?.publish_status === 'transcoded' ?? false);
  }, [isSubmittedToApi])

  const deleteLecture = (lecture_id) => {
    setSelectedLectureId(lecture_id);
    setIsShowConfirmDeleteModal(true);
  };
  
  const onClickOk = () => {
    setIsShowAlertModal(false);
    history.push("/admin/lectures");
  };
  
  const onConfirmDelete = () => {
    dispatch(deleteLectureDetails({ lectureId: selectedLectureId }))
      .then((res) => {
        setIsSuccessRequest(res?.payload?.status === 200);
        setAlertMessage(
          res?.payload?.status === 200
            ? alertMessages['success_delete']
            : alertMessages['failed']
        );
      })
      .catch((err) => {
        setIsSuccessRequest(false);
        setAlertMessage(alertMessages['failed']);
      })
      .finally(() => {
        setIsShowConfirmDeleteModal(false);
        setIsShowAlertModal(true);
      });
  };

  const redirect404 = () =>
  history.push({
    pathname: '/404',
    state: {
      route: '/admin/lectures',
      text: 'Go to lectures',
    },
  });

  const isLoading = () => {
    return isFetchingLecture || !overviewProps?.image?.file;;
  };

  useEffect(() => {
    dispatch(fetchAdminLectureDetail(lectureId)).then(async (res) => {
      await setOnDemandDetails(res.payload.data);
      setIsFetchingLecture(false);
    });

    return () => dispatch(resetAdminLectureDetail());
  }, []);

  useEffect(() => {
    dispatch(fetchAdminLectureDetail(lectureId)).then(({ payload }) => {
      const { data, status } = payload; 
      if (status === 404 || !!payload.data.deleted_at) {
        redirect404();
        return;
      }
    });

    return () => dispatch(resetAdminLectureDetail());
  }, []);

  useEffect(() => {
    resetOnDemandDetails();
    setShowDiscardModal(false);
  }, [currentTab]);

  useEffect(() => {
    if (adminLectureDetail) {
      setIsTranscoded(adminLectureDetail.publish_status === 'transcoded' ?? false);
    }
  }, [adminLectureDetail]);

  return (
    <div
      className={`flex-1 w-full bg-adminGray-100 pb-px-100 ${
        !adminLectureDetail && 'h-screen'
      }`}
    >
      {prompt}
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
        handleOnClickOk={() => onClickOk()}
        onClickOutsideClose={false}
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
      <div className="flex pb-px-16 pl-px-32 pt-px-24">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="大教室　授業一覧" to="/admin/lectures" />
        <Breadcrumb text="動画編集" to="#3" active last />
      </div>
      <div className="pb-12 bg-adminGray-100">
        <div
          className={`bg-white mx-8 rounded-px-4 shadow-card ${styles.board}`}
        >
          <BasicInfoSection
            isLoading={isLoading()}
            deleteLecture={deleteLecture}
            updateOnClick={updateOnClick}
            props={overviewProps}
            headerProps={headerProps}
          />
          {!isFetchingLecture && (
            <BoardComponent>
              <div className={currentTab != 'video-list-edit' && `flex pb-px-40`}>
                {currentTab != 'video-list-edit' && <MenuTab />}
              </div>
              {currentTab === 'video-list-edit' && <VideoEdit />}
              {currentTab === 'overview' && (
                <Overview
                  props={overviewProps}
                  setIsShowAlertModal={setIsShowAlertModal}
                  setIsSuccessRequest={setIsSuccessRequest}
                  setIsSaveBtnDisabled={setIsSaveBtnDisabled}
                  setIsFirstTabValid={setIsFirstTabValid}
                  setAlertMessage={setAlertMessage}
                  setShowDiscardModal={setShowDiscardModal}
                />
              )}
              {currentTab === 'video-list' && (
                <VideoList
                  updateOnClick={updateOnClick}
                  props={videoListProps}
                  setShowDiscardModal={setShowDiscardModal}
                />
              )}
              {currentTab === 'exercises' && (
                <QuestionList 
                  updateOnClick={updateOnClick} 
                  props={overviewProps} 
                  setShowDiscardModal={setShowDiscardModal} 
                />
              )}
              {isShowConfirmDeleteModal && (
                <AlertModal
                  isShowModal={isShowAlertModal}
                  setIsShowModal={setIsShowAlertModal}
                  isSuccess={isSuccessRequest === true}
                  message={onSubmitOndemandMsgs[isSuccessRequest]}
                  onClickOutsideClose={false}
                />
              )}
            </BoardComponent>
          )}
          <div className="pt-px-90" />
        </div>
      </div>
    </div>
  );
};

export default LectureOnDemandDetails;
