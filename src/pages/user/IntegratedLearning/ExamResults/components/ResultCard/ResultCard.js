import React from 'react';

import ChevronRightIcon from '../../../../../../shared/icons/ChevronRightIcon';
import CorrectIcon from '../../../../../../shared/icons/CorrectIcon';
import IncorrectIcon from '../../../../../../shared/icons/IncorrectIcon';
import Question from '../../../../IntegratedLearningExam/Listening/components/Question';

import styles from './ResultCard.module.css';

const ResultCard = ({ questionNumber, question, itemCorrect }) => {
  return (
    <div className={`bg-basic-400 mx-8 flex ${styles.resultcard}`}>
      <div className="flex-none">
        {itemCorrect ? (
          <div className="mt-3">
            <CorrectIcon
              width="24"
              height="24"
              color="#03DAC6"
              className="fill-current text-basic-400"
            />
          </div>
        ) : (
            <div className="mt-3">
              <IncorrectIcon width="24" height="24" color="#E34E42" />
            </div>
          )}
      </div>
      <div className="flex-auto -mt-px-15 ml-px-16">
        <Question
          questionNumber={questionNumber}
          question={question}
          textSize="text-14"
        />
      </div>
      <div className="flex-none mt-3.5 -mr-2">
        <ChevronRightIcon
          width="24"
          height="24"
          fill-opacity="0.54"
          color="black"
        />
      </div>
    </div>
  );
}

export default ResultCard;
