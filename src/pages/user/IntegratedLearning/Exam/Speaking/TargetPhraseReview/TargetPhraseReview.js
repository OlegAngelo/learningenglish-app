import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

import Header from '../../../../../../shared/Header';
import Recorder from '../../../../../../shared/Recorder';
import StepLineChart from '../../../../../../shared/StepLineChart';
import CloseIcon from '../../../../../../shared/icons/CloseIcon';

import style from './TargetPhraseReview.module.css';

import dataset from './dataset';

const TargetPhraseReview = (props) => {
  const { id } = useParams();
  const { state } = queryString.parse(useLocation().search);
  const states = {
    disabled: {
      recorderState: 'disabled',
    },
    recording: {
      recorderState: 'recording',
    },
  };

  return (
    <div className={style.container}>
      <div className={`bg-background-200 ${style.speakingReviewPageBody}`}>
        <Header hasBack={false} title="Speaking 自分の意見を言う">
          <CloseIcon className={style.closeIcon} />
        </Header>

        <p className={`text-14 text-primary-500 text-center font-bold ${style.title}`}>
          ターゲットフレーズの復習をしましょう。
        </p>

        <h3 className={`text-basic-100 ${style.question}`}>
          What do you <span className={style.blankLine}>___</span> about cutting the cost?
        </h3>

        <p className={`text-14 text-basic-100 ${style.subQuestion}`}>
          原価を削るのはどうでしょうか。
        </p>

        <StepLineChart dataset={dataset} />

        <p className={`text-16 font-bold text-primary-500 ${style.textBelow}`}>
          真似して話してみましょう
        </p>

        <div className={`grid justify-center ${style.recorderContainer}`}>
          <Recorder className={style[state]} type={states[state].recorderState} />
          {state === 'recording' && (
            <span className={`text-14 text-secondary-400 ${style.recordText}`}>
              録音中...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetPhraseReview;
