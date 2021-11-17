import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CloseIcon from '../../shared/icons/CloseIcon';
import Alert from '../../shared/Alert';
import breadcrumb from '../../utils/breadcrumb';

const Close = ({
  setInterrupted,
  resetExamState,
  retry = false,
  isSpecificQuestion = false,
  isFromLecture = false,
  isFromSLReading = false,
  isFromSLListening = false,
}) => {
  const history = useHistory();
  const location = useLocation();
  const msg = isSpecificQuestion
    ? 'ダッシュボードへ戻りますか？'
    : retry
      ? 'トレーニングを終了しますか？ \n このセットの結果は保存されます。'
      : undefined;

  const [isShowModal, setIsShowModal] = useState(false);

  const handleOnClick = () => {
    setIsShowModal(true);
    setInterrupted(true);

    if (resetExamState) {
      resetExamState();
    }
  };

  const getMessage = () => {
    if (isFromLecture) {
      return '確認問題を途中終了しますか？ \n 一時保存はされません';
    } else if (isFromSLReading) {
      return 'Readingを途中終了しますか？ \n 一時保存はされません';
    } else if (isFromSLListening) {
      return 'Listeningを途中終了しますか？ \n 一時保存はされません';
    } else {
      return isSpecificQuestion
      ? 'ダッシュボードへ戻りますか？'
      : retry
        ? 'トレーニングを終了しますか？ \n このセットの結果は保存されます。'
        : undefined;
    }
  };

  const handleAlertClose = () => {
    setIsShowModal(false);
    setInterrupted(false);

    const isRetry = localStorage.getItem('isRetry');
    const trainingSetId = localStorage.getItem('training_set_id');
    const unitId = localStorage.getItem('unit_id');

    if (isSpecificQuestion) {
      return history.push('/');
    } else if (isFromLecture) {
      // remove muscle exam route from breadcrumbs
      let toBeRemovedRoutes = [
        /^\/training\/muscle-exam\/\d+$/,
      ];
      breadcrumb.remove(toBeRemovedRoutes);
      return history.push('/lectures');
    } else if (isFromSLReading) {
      return history.push(`/`);
    } else if (isFromSLListening) {
      return history.push('/');
    } else if (parseInt(trainingSetId) !== 1) {
      history.push({
        pathname: `/training/muscle-exam/${unitId}/survey`,
        state: { prevPath: `${location.pathname}${location.search}` },
      });

      return;
    }

    if (isRetry) {
      history.push(`/training/muscle-exam/${unitId}/survey/`)
      localStorage.removeItem('isRetry')
    } else {
      breadcrumb.back((route) => {
        history.push(route)
      })
    }

    localStorage.setItem('is_exam_interrupted', true);
  }

  return (
    <div>
      <button onClick={() => handleOnClick()}>
        <span className="close-icon">
          <CloseIcon />
        </span>
      </button>
      <Alert
        show={isShowModal}
        callBack={handleAlertClose}
        closeModalFunc={() => {
          setIsShowModal(false);
          setInterrupted(false);
        }}
        msg={getMessage()}
        option={2}
      />
    </div>
  );
};

export default Close;
