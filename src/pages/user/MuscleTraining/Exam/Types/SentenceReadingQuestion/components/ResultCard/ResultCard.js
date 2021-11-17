import React from 'react';

import style from './ResultCard.module.css';

const ResultCard = ({ className, evaluation, pronunciation, volume, intonation }) => {
  const color = {
    A: 'text-secondary-500',
    B: 'text-primary-400',
    C: 'text-progress-orange',
    D: 'text-progress-red',
  };

  return (
    <div
      className={`bg-white border border-green flex justify-between rounded-px-4 ${style.container} ${className}`}
    >
      <div className={`text-center items-center mt-px-12 ${style.evaluationDiv}`}>
        <p className={`text-12 leading-px-12 font-bold mb-px-16 ${style.evaluationText}`}>
          総合評価
        </p>
        <h2 className={`text-24 leading-px-24 ${color[evaluation]}`}>{evaluation}</h2>
      </div>

      <div className={`ml-px-26 ${style.labelDiv}`}>
        <div className={`flex items-center justify-between ${style.labelSubDiv}`}>
          <p className={`text-12 leading-px-14 -mt-px-4 ${style.evaluationText}`}>発音</p>
          <p className={`text-20 leading-px-20 ${color[pronunciation]}`}>
            {pronunciation}
          </p>
        </div>
        <div className={`flex items-center justify-between ${style.labelSubDiv}`}>
          <p className={`text-12 leading-px-14 ${style.evaluationText}`}>ボリューム</p>
          <p className={`text-20 leading-px-20 ${color[volume]}`}>{volume}</p>
        </div>
        <div className={`flex items-center justify-between ${style.labelSubDiv}`}>
          <p className={`text-12 leading-px-14 ${style.evaluationText}`}>
            イントネーション
          </p>
          <p className={`text-20 leading-px-20 ${color[intonation]}`}>{intonation}</p>
        </div>
      </div>
    </div>
  );
};

ResultCard.defaultProps = {
  className: '',
  evaluation: 'D',
  pronunciation: 'D',
  volume: 'D',
  intonation: 'D',
};

export default ResultCard;
