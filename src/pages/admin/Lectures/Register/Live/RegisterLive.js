import React, { useState, useRef, useEffect, Fragment } from 'react';

import AlertModal from '../../../../../shared/AlertModal/AlertModal';
import BasicInfoSection from './components/BasicInfoSection';
import Breadcrumb from '../../../../../shared/Breadcrumb';
import Header from './components/Header/';
import UploadModal from '../../components/UploadModal';

import useLectureLive from '../../../../../hooks/useLectureLive.js';
import useUploadFile from '../../components/hooks/useUploadFile';

import { disableScroll, enableScroll } from '../../../../../utils/scrollableHelper'; 

import style from './RegisterLive.module.css';
import FormWrapper from './components/FormWrapper/FormWrapper';

const RegisterLive = (props) => {
  const registerLiveMessage = {
    true: 'LIVEの追加に成功しました。',
    false: '無効な入力をされた項目があります。',
    noInternet: 'エラーが発生しました。後ほど再度お試しください。',
  };

  const onClickAlertOk = () => {
    if (isSuccessRequest === true) window.location.href = '/admin/lectures';
  };

  let uploadFunction = 'uploadImageReady';
  
  const handleOnClickUpload = (file) => {
    const { setImage } = useLectureLiveProps;
    setImage(file);
  };

  const fileType = {
    image: null,
  };

  const useUploadFileProps = {
    fileType,
    uploadFunction,
    handleOnClickUpload,
  };

  const {
    modalProps,
    showUploadModal,
    setShowUploadModal,
    file,
    isSuccessRequest,
    isShowAlertModal,
    setIsShowAlertModal,
    setIsSuccessRequest,
  } = useUploadFile(useUploadFileProps);

  useEffect(() => {
    if (isShowAlertModal) disableScroll(true, 'scroll');
    else enableScroll();
  }, [isShowAlertModal]);

  const useLectureLiveProps = useLectureLive({ setIsShowAlertModal, setIsSuccessRequest });

  return (
    <Fragment>
      {showUploadModal && (
        <UploadModal
          title="画像データをアップロードしてください"
          icon="image"
          file={file[showUploadModal]}
          {...modalProps}
        />
      )}
      <div className="flex-1 w-full bg-adminGray-100 pb-px-100 h-screen">
        <div className="flex pb-px-16 pl-px-32 pt-px-24">
          <Breadcrumb text="ダッシュボード" to="/admin" />
          <Breadcrumb text="大教室　授業一覧" to="/admin/lectures" />
          <Breadcrumb text="LIVE授業を登録" to="#3" active last />
        </div>
        <div className="pb-12 bg-adminGray-100">
          <div className={`bg-white mx-8 rounded-px-4 shadow-card ${style.board}`}>
            <FormWrapper
              props={useLectureLiveProps}
              setIsShowAlertModal={setIsShowAlertModal}
              setIsSuccessRequest={setIsSuccessRequest}
              setShowUploadModal={setShowUploadModal}
            >
              <Header />
              <BasicInfoSection
              />
            </FormWrapper>

            <AlertModal
              isShowModal={isShowAlertModal}
              setIsShowModal={setIsShowAlertModal}
              isSuccess={isSuccessRequest === true}
              message={registerLiveMessage[isSuccessRequest]}
              handleOnClickOk={onClickAlertOk}
              onClickOutsideClose={false}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterLive;
