import React from 'react';

import Circle from '../icons/Circle';
import IncorrectAnswerIcon from '../icons/IncorrectAnswerIcon';
import KeyboardArrowRight from '../icons/KeyboardArrowRight';
import Tag from '../Tag';

import styles from './QuestionResultItem.module.css';

const QuestionResultItem = ({
  className,
  isCorrectAnswer,
  isShowArrow,
  questionNumber,
  children: questionTitle,
  textRightSpaceInPx,
  ...props
}) => {
  const isShowEvaluationIcon = typeof isCorrectAnswer === 'boolean';
  const questionTitleStyle = {
    paddingRight: `${textRightSpaceInPx - 16}px`,
  };

  return (
    <div
      className={`relative p-px-15 flex items-center bg-basic-400 ${styles.boxOutline} rounded-px-4 ${className}`}
      {...props}
    >
      {isShowEvaluationIcon && (
        <div className="mr-px-16">
          {
            isCorrectAnswer
              ? <Circle className="fill-white" />
              : <IncorrectAnswerIcon />
          }
        </div>
      )}

      <div>
        <Tag
          color="lightGray"
          size="l"
          width="113px"
          darkBlue
          pill
        >
          <span className="font-bold leading-px-24">Question.{questionNumber}</span>
        </Tag>

        <div
          className="my-px-2"
          style={questionTitleStyle}
        >
          {questionTitle}
        </div>
      </div>

      {isShowArrow && (
        <div className="absolute right-px-15 h-full flex items-center">
          <KeyboardArrowRight color="rgba(0, 0, 0, 0.54)" />
        </div>
      )}
    </div>
  );
};

export default QuestionResultItem;
