import React, { useEffect, useState, Fragment } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Button from '../../../../../shared/Button';

import useDetectInterrupt from '../../../../../hooks/useDetectInterrupt';
import { IsFromAdminHelper } from '../../../../../utils/IsFromAdminHelper';

import styles from './Completion.module.css';

const Completion = (props) => {
  const [displayButton, isButtonDisplay] = useState(false);
  const [phoneWidth, setPhoneWidth] = useState(0);
  const location = useLocation();
  const { unitId } = useParams();
  const learningType = localStorage.getItem('selected_lesson_type');
  const { setDetectInterrupt } = useDetectInterrupt({});
  const isFromLecture = !!(location.state && location.state.isFromLecture);
  const isFromAdmin = IsFromAdminHelper();


  useEffect(() => {
    if (isFromAdmin) return;
    setTimeout(() => isButtonDisplay(true), 3000);
    setPhoneWidth(window.innerWidth);
    localStorage.setItem('prev_route', `/training/muscle-exam/${unitId}/end`);
    return () => {
      setDetectInterrupt(false);
    }
  }, []);

  const updateTrainingSetId = () => {
    let training_set_id = localStorage.getItem('training_set_id');
    localStorage.setItem('training_set_id', ++training_set_id);
  };

  const textMessage = {
    good_job: 'Good job！',
    good_effort: 'Good effort！',
    end_training: 'トレーニング終了',
    end_exercise: '確認問題終了',
    return_to_list_page: '一覧画面へ戻る',
    end_learning: '学習終了',
    another_set: 'もう1セット継続',
    learning_result_is_saved: '学習結果が保存されました',
    return_to_dashboard: 'ダッシュボードへ戻る',
  };

  return (
    <div className="absolute grid place-items-center h-full w-full bg-primary-500 min-h-screen">
      <div className="-mt-px-54 text-center text-basic-400">
        {!isFromLecture
        ? (
          <Fragment>
            <div className={`${styles.setText} font-hiragino font-bold text-20 ${!displayButton && styles.adjustMargin}`}>{`Set ${localStorage.getItem('training_set_id')}`}</div>
            <div className={`${styles.topText} font-bold font-hiragino-kaku text-24`}>{textMessage.end_training}</div>
            <div className={`${styles.bottomText} font-bold font-hiragino text-16 pt-px-12`}>{textMessage.good_job}</div>
            { displayButton && <div className={`${styles.description} font-hiragino font-bold text-16`}>{textMessage.learning_result_is_saved}</div>}
          </Fragment>
        ) : (
          <Fragment>
            <div className={`${styles.topText} font-bold font-hiragino-kaku text-24`}>{textMessage.end_exercise}</div>
            <div className={`${styles.bottomText} font-bold font-hiragino text-16 pt-px-12`}>{textMessage.good_effort}</div>
          </Fragment>
        )}
      </div>
      {!isFromLecture
      ? (
        <Fragment>
          {displayButton && (
            <div className="bottom-0 mb-px-50 absolute flex space-x-2">
              <Link to={location.state.prevPath}>
                <Button
                  onClick={() => updateTrainingSetId()}
                  className="flex-1"
                  innerClass="text-14 cursor-pointer"
                  type={phoneWidth || learningType === 'phrase' > 320 ? 'white-square-normal-wider' : 'white-square-wide'}
                >
                  {textMessage.another_set}
                </Button>
              </Link>
              <Link to={`/training/muscle-exam/${unitId}/survey`}>
                <Button
                  className="flex-1"
                  innerClass="cursor-pointer"
                  type={phoneWidth > 320 ? 'white-square-wider' : 'white-square-wide'}
                >
                  {textMessage.end_learning}
                </Button>
              </Link>
            </div>
          )}
        </Fragment>
      ) : (
        <div className="bottom-0 mb-px-50 absolute flex space-x-2">
          { !isFromAdmin &&
            <Link to="/">
              <Button
                className="flex-1"
                innerClass="text-14 cursor-pointer"
                type="white-square-normal-wider"
              >
                {isFromLecture? textMessage.return_to_dashboard : textMessage.return_to_list_page}
              </Button>
            </Link>
          }
        </div>
      )}
    </div>
  );
};

export default Completion;
