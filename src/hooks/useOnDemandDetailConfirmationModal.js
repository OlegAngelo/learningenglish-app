import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {
  deleteLectureExercise,
  hardDeleteExcerises,
  resetLectureExerciseIdsToUpload,
} from '../redux/lectures/slice';
import { exerciseIds } from '../redux/lectures/selectors';
import useScrollbar from './useScrollbar';

const useOnDemandDetailConfirmationModal = ({ showModalActionResult, setFile }) => {
  const dispatch = useDispatch();
  const { id: lectureId } = useParams();
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationAction, setConfirmationAction] = useState('');
  const { lectureExerciseIdsToUpload } = useSelector((state) => state.lectures);
  const questionIds = useSelector(exerciseIds);
  const { setScrollbar } = useScrollbar();
  const messages = {
    delete_exercise: 'この確認問題を削除しますか？',
  };

  const deleteExercisesHandler = () => {
    setIsShowConfirmationModal(true);
    setConfirmationMessage(messages['delete_exercise']);
    setConfirmationAction('delete_exercise');
  };

  const deleteCallback = (payload) => {
    setIsShowConfirmationModal(false);
    // display error message if no internet connection
    if (!payload) {
      showModalActionResult('failed');
      return;
    }

    if (payload.status === 200 || payload.status === 201) {
      localStorage.removeItem('exercise_ids');
      setFile(null);
      showModalActionResult('success', '確認問題を削除しました。');
      dispatch(resetLectureExerciseIdsToUpload());
    } else showModalActionResult('failed');
  };

  const confirmationActionHandler = () => {
    if (confirmationAction === 'delete_exercise') {
      // delete exercises [from DB]
      if (questionIds?.length) {
        dispatch(deleteLectureExercise(lectureId)).then(({ payload }) =>
          deleteCallback(payload)
        );
        return;
      }

      // delete recent uploaded exercises
      dispatch(hardDeleteExcerises({ ids: lectureExerciseIdsToUpload })).then(
        ({ payload }) => deleteCallback(payload)
      );
    }
  };

  useEffect(() => {
    if (isShowConfirmationModal) setScrollbar(false);
    else setScrollbar(true);
  }, [isShowConfirmationModal]);

  return {
    isShowConfirmationModal,
    confirmationMessage,
    confirmationAction,
    setIsShowConfirmationModal,
    deleteExercisesHandler,
    confirmationActionHandler,
  };
};

export default useOnDemandDetailConfirmationModal;
