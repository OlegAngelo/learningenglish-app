import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import AlertModal from '../../../../../../../shared/AlertModal';
import Button from '../../../../../../../shared/Button';
import ConfirmationModal from '../../../../../../../shared/ConfirmationModal';
import UploadExercise from './components/UploadExercise';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import ImageFilterIcon from '../../../../../../../shared/icons/ImageFilterIcon';
import QuestionInfo from '../QuestionInfo/QuestionInfo';

import useOnDemandDetailConfirmationModal from '../../../../../../../hooks/useOnDemandDetailConfirmationModal';
import useScrollbar from '../../../../../../../hooks/useScrollbar';

import {
  fetchLectureExercise,
  resetLectureExercise,
  addLectureExcerise,
  resetLectureExerciseIdsToUpload,
  fetchAdminLectureDetail,
} from '../../../../../../../redux/lectures/slice';
import { exerciseDetails, exerciseIds } from '../../../../../../../redux/lectures/selectors';

const QuestionList = ({ props, updateOnClick, setShowDiscardModal }) => {
  const dispatch = useDispatch();
  const { id: lectureId } = useParams();
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(true);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [file, setFile] = useState(null);
  const { setScrollbar } = useScrollbar();

  const { fetchingLectureExercise, lectureExerciseIdsToUpload } = useSelector((state) => state.lectures);
  const details = useSelector(exerciseDetails);
  const questionIds = useSelector(exerciseIds);
  const { isSubmittedToApi, setIsSubmittedToApi } = props;

  const showModalActionResult = (result, message) => {
    switch (result) {
      case 'success':
        setAlertMessage(message);
        setIsSuccessRequest(true);
        break;
      case 'failed':
        setAlertMessage(message ?? 'エラーが発生しました。後ほど再度お試しください。');
        setIsSuccessRequest(false);
    }
    setIsShowAlertModal(true);
  };

  const {
    isShowConfirmationModal,
    confirmationMessage,
    setIsShowConfirmationModal,
    deleteExercisesHandler,
    confirmationActionHandler,
  } = useOnDemandDetailConfirmationModal({ showModalActionResult, setFile });

  useEffect(() => {
    dispatch(fetchLectureExercise(lectureId));

    return () => {
      dispatch(resetLectureExercise());
      dispatch(resetLectureExerciseIdsToUpload());
      dispatch(fetchAdminLectureDetail(lectureId));
    }
  }, []);

  const goToPreview = (event) => {
    event.target.blur();
    const exerciseIds = questionIds?.length ? questionIds : lectureExerciseIdsToUpload;
    window.open(
      `${process.env.REACT_APP_FRONTEND_URL}/admin/lectures/exercise-preview?questionIds=${exerciseIds}`
    );
  };

  const onSubmitExercise = (event) => {
    setIsSubmittedToApi(true);
    const payload = {
      lectureId,
      exercisePhraseIds: lectureExerciseIdsToUpload,
      filename: file?.name,
    };

    dispatch(addLectureExcerise(payload)).then((res) => {
      if (res?.payload?.status === 201) {
        localStorage.removeItem('exercise_ids');
        setFile(null);
        showModalActionResult('success', '確認問題を登録しました');
        setIsSubmittedToApi(false);
        setShowDiscardModal(false);
      }
      event.target.blur();
    });
  };

  useEffect(() => {
    if (isShowAlertModal) setScrollbar(false);
    else setScrollbar(true);
  }, [isShowAlertModal]);

  useEffect(() => {
    if (file) setShowDiscardModal(true);
  }, [file]);

  const handleDelete = () => {
    setShowDiscardModal(false);
    deleteExercisesHandler();
  };

  return (
    <div className="">
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
      />

      <ConfirmationModal
        showConfirmationModal={isShowConfirmationModal}
        setShowConfirmationModal={setIsShowConfirmationModal}
        message={confirmationMessage}
        submitText="はい"
        cancelText="いいえ"
        onSubmit={() => confirmationActionHandler()}
      />

      <Fragment>
        <p className="text-12 text-adminGray-400 font-bold">確認問題</p>
        <div className="flex items-center mt-px-18 h-px-20">
          <p className="text-12 text-basic-100 mr-px-20">
            {fetchingLectureExercise
              ? '読み込み中...'
              : (details.exercise_filename || file?.name) ?? 'なし'}
          </p>
          {!fetchingLectureExercise && (details.exercise_filename || file?.name) && (
            <button
              className={
                details.has_participants
                  ? 'cursor-default opacity-50'
                  : 'focus:outline-none'
              }
              onClick={handleDelete}
              disabled={details.has_participants}
            >
              <DeleteIcon width="20" height="20" />
            </button>
          )}
        </div>

        <div className="flex items-end h-px-52">
          <Button
            className="pt-px-16 mr-px-16"
            type="blue-square"
            icon={<ImageFilterIcon color="white" width="18" height="18" />}
            onClick={goToPreview}
            disabled={
              fetchingLectureExercise ||
              (!questionIds?.length && !lectureExerciseIdsToUpload?.length)
            }
          >
            確認問題をプレビュー
          </Button>

          <UploadExercise setFile={setFile} />
        </div>
      </Fragment>

      <QuestionInfo />
      <Button
        className="mt-px-48"
        innerClass="px-px-34"
        type="blue-square"
        onClick={(e) => onSubmitExercise(e)}
        disabled={isSubmittedToApi || file === null}
      >
        {isSubmittedToApi ? '登録中...' : '登録'}
      </Button>
    </div>
  );
};

export default QuestionList;
