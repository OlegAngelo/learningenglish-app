import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import AlertModal from '../../../../../../../shared/AlertModal/AlertModal';
import ExerciseSection from './components/ExerciseSection';
import Header from './components/Header';
import MenuTab from './components/MenuTab';
import BoardComponent from '../BoardComponent';
import Overview from './components/Overview';
import VideoList from './components/VideoList';

import { deleteVimeoVideo, hardDeleteExcerises } from '../../../../../../../redux/lectures/slice';

import useLectureOnDemand from '../../../../../../../hooks/useLectureOnDemand';
import useConfirmBeforeOnLeave from '../../../../../../../hooks/useConfirmBeforeOnLeave';

const BasicInfoSection = () => {
  const { id: liveId, tab: currentTab } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);
  const [isFirstTabValid, setIsFirstTabValid] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [Prompt, setShowDiscardModal] = useConfirmBeforeOnLeave({
    whiteListDestination: [
      `/admin/lectures/register/on-demand/${liveId ? `${liveId}/` : ''}overview`,
      `/admin/lectures/register/on-demand/${liveId ? `${liveId}/` : ''}video-list`,
      `/admin/lectures/register/on-demand/${liveId ? `${liveId}/` : ''}exercises`,
    ],
    message: liveId ? 'オンデマンド授業への変更は反映されません。' : undefined,
  });

  useEffect(() => {
    if (currentTab != 'overview' && !isFirstTabValid) {
      history.replace(`/admin/lectures/register/on-demand/overview`);
    }
  }, [currentTab]);

  const registerLiveMessage = {
    true: 'オンデマンドを登録しました。',
    false: '無効な入力をされた項目があります。',
    noInternet: 'エラーが発生しました。後ほど再度お試しください。',
  };

  const onUpdateCallback = () => {
    setIsShowAlertModal(true);
  };

  const overviewProps = useLectureOnDemand({
    onUpdateCallback,
    setIsShowAlertModal,
    setIsSuccessRequest,
  });
  
  const { formHookData, submitToApi, submitToApiUpdate } = overviewProps;

  const onClickAlertOk = () => {
    if (isSuccessRequest === true) window.location.href = '/admin/lectures';
  };

  const registerOnClick = () => {
    if (liveId) submitToApiUpdate(liveId, formHookData);
    else submitToApi(formHookData);
  };

  const videoListProps = {
    ...overviewProps,
    videoTitle,
    setVideoTitle,
    setIsSaveBtnDisabled,
  };

  // delete uploaded vimeo files that was discarded
  const deleteDiscardedVimeo = async () => {
    const uploadedVimeoFiles = JSON.parse(localStorage.getItem('uploaded_vimeo_files'));

    if (!uploadedVimeoFiles) return;

    await Promise.all(
      uploadedVimeoFiles.map(async (data) => {
        await dispatch(
          deleteVimeoVideo({
            vimeoVideoId: data.vimeoVideoId,
          })
        );
      })
    );

    localStorage.removeItem('uploaded_vimeo_files');
  };

  const deleteDiscardedExercise = () => {
    const exerciseIds = JSON.parse(localStorage.getItem('exercise_ids'));
    
    if (!exerciseIds) return;
    
    dispatch(hardDeleteExcerises({ ids: exerciseIds }))
      .then(res => {
        localStorage.removeItem('exercise_ids');
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(async () => {
    if (!!liveId && currentTab !== 'overview')
      history.push(`/admin/lectures/register/on-demand/${liveId}/overview`);

    deleteDiscardedVimeo();
    deleteDiscardedExercise();
  }, []);

  return (
    <Fragment>
      <Header 
        isSaveBtnDisabled={isSaveBtnDisabled}
        setIsSaveBtnDisabled={setIsSaveBtnDisabled}
        registerOnClick={registerOnClick} 
      />
      <hr />
      <BoardComponent>
        <div className="flex">
          <MenuTab isFirstTabValid={isFirstTabValid} />
        </div>
        {currentTab === 'overview' && 
          <Overview
            props={overviewProps}
            setIsShowAlertModal={setIsShowAlertModal}
            setIsSuccessRequest={setIsSuccessRequest}
            setIsSaveBtnDisabled={setIsSaveBtnDisabled}
            setIsFirstTabValid={setIsFirstTabValid}
            setShowDiscardModal={setShowDiscardModal}
          />
        }
        {currentTab === 'video-list' && <VideoList {...videoListProps} />}
        {currentTab === 'exercises' && <ExerciseSection {...overviewProps} />}

        <AlertModal
          isShowModal={isShowAlertModal}
          setIsShowModal={setIsShowAlertModal}
          isSuccess={isSuccessRequest === true}
          message={registerLiveMessage[isSuccessRequest]}
          handleOnClickOk={onClickAlertOk}
          onClickOutsideClose={false}
        />
      </BoardComponent>

      {Prompt}
    </Fragment>
  );
};

export default BasicInfoSection;
