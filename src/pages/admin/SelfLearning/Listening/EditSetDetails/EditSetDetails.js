import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';

import Loading from '../../../../../shared/Loading/Loading';
import Breadcrumb from '../../../../../shared/Breadcrumb/Breadcrumb';
import AnswersField from './components/AnswersField/AnswersField';
import EditableInfoSection from './components/EditableInfoSection/EditableInfoSection';
import HeaderSection from './components/HeaderSection/HeaderSection';
import MainContent from './components/MainContent/MainContent';
import QuestionField from './components/QuestionField/QuestionField';
import ReadableInfoSection from './components/ReadableInfoSection/ReadableInfoSection';
import TitleField from './components/TitleField/TitleField';
import UploadField from './components/UploadField/UploadField';

import UploadModal from '../../components/UploadModal';
import AlertModal from '../../../../../shared/AlertModal';
import UploadLoading from '../../../News/components/UploadLoading';

import useUpdateEditPhraseDetails from '../../hooks/useUpdateEditPhraseDetails';

import useConfirmBeforeOnLeave from '../../../../../hooks/useConfirmBeforeOnLeave';
import {
  fetchPhraseData,
  resetPhraseData,
} from '../../../../../redux/selfLearning/listening/admin/slice';

const EditSetDetails = () => {
  const dispatch = useDispatch();
  const phraseId = useParams().id;
  const [Prompt, setShowDiscardModal] = useConfirmBeforeOnLeave();
  const { phraseData, isFetchingPhraseData } = useSelector(
    (state) => state.adminSLListening
  );
  const [correctAnswerDefaultValue, setCorrectAnswerDefaultValue] = useState([])
  const [modalProps, setModalProps] = useState({
    response_code: 201,
    is_success: false,
    message: '',
  });
  

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    formState: { isDirty },
  } = useForm();

  // HOOKS
  const SetDetailsHook = useUpdateEditPhraseDetails({
    register,
    errors,
    handleSubmit,
    isFetchingPhraseData,
    phraseData,
    setModalProps,
  });

  const {
    titleFieldProps,
    questionFieldProps,
    answerFieldProps,
    uploadFieldProps,
    setIsShowAlertResultModal,
    isShowUploadModal,
    isShowAlertResultModal,
    isShowModalPercentage,
    uploadPercentage,
    uploadModalProps,
    handleSumbitToApi,
    isSubmittedToApi,
    isFetchingAudioData,
    isSubmitted,
  } = SetDetailsHook;

  const headerSectionProps = {
    onClickSubmit: handleSubmit(handleSumbitToApi),
    isFetchingPhraseData: isFetchingPhraseData,
    isSubmittedToApi: isSubmittedToApi,
    isFetchingAudioData: isFetchingAudioData,
  };

  useEffect(() => {
    dispatch(fetchPhraseData(phraseId)).then((res) => {
      const data = res.payload;
      setValue('sentence_jp', data.sentence_jp);
      setValue('pre_sentence', data.pre_sentence);
      setValue('post_sentence', data.post_sentence);
      setCorrectAnswerDefaultValue(JSON.parse(data?.correct_answers));
    });
    return () => dispatch(resetPhraseData());
  }, []);

  useEffect(() => {
    if (isDirty && !isSubmitted) setShowDiscardModal(true);
    else setShowDiscardModal(false);
  }, [isDirty, isSubmitted]);

  useEffect(() => {
    if (!_.isEmpty(errors)) {
      setIsShowAlertResultModal(true);
      setModalProps({
        is_success: false,
        message: '無効な入力をされた項目があります。'
      });
    }
  }, [errors]);

  return (
    <Fragment>
      {isShowUploadModal && <UploadModal {...uploadModalProps} />}
      <AlertModal
        isShowModal={isShowAlertResultModal}
        setIsShowModal={setIsShowAlertResultModal}
        isSuccess={modalProps.is_success}
        message={modalProps.message}
        onClickOutsideClose={false}
      />

      {isShowModalPercentage && <UploadLoading percentage={uploadPercentage} />}
      <div className="flex-1 w-full bg-adminGray-100 pb-px-100 overflow-scroll overflow-x-hidden">
        <div className="flex pb-px-16 pl-px-32 pt-px-24">
          <Breadcrumb text="ダッシュボード" to="/admin" />
          <Breadcrumb text="Listening" to="/admin/listening" />
          <Breadcrumb text="Set.1" to="#3" active last />
        </div>

        <div className="pb-12 bg-adminGray-100">
          <div className="bg-white mx-8 rounded-px-4 shadow-card ">
            <HeaderSection {...headerSectionProps} />
            <MainContent>
              {!isFetchingPhraseData ? (
                <Fragment>
                  <ReadableInfoSection phraseData={phraseData} />
                  <EditableInfoSection>
                    <TitleField {...titleFieldProps} />
                    <UploadField
                      setShowDiscardModal={setShowDiscardModal}
                      {...uploadFieldProps}
                    />
                    <QuestionField 
                      phraseData={phraseData} 
                      {...questionFieldProps} 
                    />
                    <AnswersField
                      phraseData={phraseData}
                      {...answerFieldProps}
                      correctAnswerDefaultValue={correctAnswerDefaultValue}
                    />
                  </EditableInfoSection>
                </Fragment>
              ) : (
                <div className="relative pb-px-40 mb-px-40">
                  <Loading
                    rootPosition="absolute right-0 "
                    className={`bg-transparent`}
                    iconClass="bg-primary-500 text-primary-500"
                  />
                </div>
              )}
            </MainContent>
          </div>
        </div>
      </div>
      {Prompt}
    </Fragment>
  );
};

export default EditSetDetails;
