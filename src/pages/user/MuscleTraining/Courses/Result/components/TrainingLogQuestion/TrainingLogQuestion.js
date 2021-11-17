import React from 'react';
import clsx from 'clsx';

import Circle from '../../../../../../../shared/icons/Circle';
import Checked from '../../../../../../../shared/icons/CheckBoxCheckedIcon';
import UnChecked from '../../../../../../../shared/icons/CheckBoxUncheckedIcon';
import Tag from '../../../../../../../shared/Tag';
import KeyboardArrowRight from '../../../../../../../shared/icons/KeyboardArrowRight';

import style from './TrainingLogQuestion.module.css';

const TrainingLogQuestion = ({ className, title, isCompleted, ...props }) => {
  return (
    <div className={ clsx(`${isCompleted ? `${style.questionCardCompleted}`:`bg-white`} relative border border-primary-100 box-border text-basic-100 font-bold ${style.questionCard}`) }>
      <div className={ `flex ${style.questionCardContent}` }>
        <div className={ `absolute ${style.circleIcon}` } >
          { !isCompleted && <Circle className={`fill-white ${style.circleIcon}`} /> }
        </div>
        <div className="ml-10 mr-5">
          <div style={{ paddingLeft: '1px' }}>
            <span>{title}</span>
          </div>
          <div className={`inline-flex`}>
            <Tag className={`font-theme-normal ${style.tagContent} `} color="gray" size="xs" width="60px" pill weightLight>意味選択</Tag>
            <label className={`${style.checkboxContent}`} style={{marginLeft: '0.51rem'}}>
              <span >{ isCompleted ? <Checked /> : <UnChecked /> }</span>
              <span class="text-primary-400 text-12 font-theme-normal" style={{ marginLeft: '0.29rem' }}>復習に追加</span>
            </label>
          </div>
        </div>
        <div className={ `absolute ${style.arrowRightIcon}` } >
          <KeyboardArrowRight color="rgba(0, 0, 0, 0.54)"/>
        </div>
      </div>
    </div>
  );
};

TrainingLogQuestion.defaultProps = {
  className: '',
  question: 'What do you think about cutting the cost?',
  isCompleted: true,
};

export default TrainingLogQuestion;
