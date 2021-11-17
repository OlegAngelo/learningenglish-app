import React from 'react';

import PlayArrowIcon from '../../../../../../../../shared/icons/PlayArrowIcon';
import Button from '../../../../../../../../shared/Button';
import Explanation from './components/Explanation';

import style from './ChoiceExplanation.module.css';

const ChoiceExplanation = ({ isCorrect, explanations, willRetry }) => {
  return (
    <div className="px-px-8">
      <Explanation explanationList={explanations} />
      <div className="pt-px-6">
        <div className="flex justify-center">
          <PlayArrowIcon width="59.5" height="59.5" />
        </div>
        <span className="leading-px-20 text-14 font-normal font-hiragino-kaku text-primary-500 flex justify-center mt-px-1">
          録音音声を再生
        </span>
      </div>

      <div className={`flex justify-center mb-px-50 ${isCorrect ? 'mt-px-26' : 'mt-px-24'}`}>
        <Button type="white-square-wider" className={!isCorrect ? 'ml-px-5' : null} innerClass="pt-px-1">音声復習へ進む</Button>
        {
          !isCorrect && (
            <Button className="ml-px-8" type="white-square-wider" innerClass={`pt-px-1 ${style.retryBtn}`} onClick={willRetry}>リトライ</Button>
          )
        }
      </div>
    </div>
  );
};

export default ChoiceExplanation;
