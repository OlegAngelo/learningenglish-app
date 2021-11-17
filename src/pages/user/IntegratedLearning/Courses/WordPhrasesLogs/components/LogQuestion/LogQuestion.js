import React from 'react';
import Circle from '../../../../../../../shared/icons/Circle';
import Tag from '../../../../../../../shared/Tag/Tag';

import style from './LogQuestion.module.css';

const LogQuestion = () => {
  return (
    <div>
      <div className={`border border-primary-100 box-border text-basic-100 font-bold text-14 rounded ${style.questionCard}`}>
        <div className={`flex ${style.questionCardContent}`}>
          <Circle className="mt-3 fill-white"/>
          <div className="ml-4">
            <Tag size="l" color="lightGray" width="114px" darkBlue pill weightBold >
              Question.1
            </Tag>
            <div className="pt-1">
              <span>What are they discussing?</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`border border-primary-100 box-border text-basic-100 font-bold text-14 rounded ${style.questionCard}`}>
        <div className={`flex ${style.questionCardContent}`}>
          <Circle className="mt-3 fill-white"/>
          <div className="ml-4">
            <Tag size="l" color="lightGray" width="114px" darkBlue pill weightBold >
              Question.2
            </Tag>
            <div className="pt-1">
              <span>What are they discussing?</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`border border-primary-100 box-border text-basic-100  font-bold text-14 rounded ${style.questionCard}`}>
        <div className={`flex ${style.questionCardContent}`}>
          <Circle className="mt-3 fill-white"/>
          <div className="ml-4">
            <Tag size="l" color="lightGray" width="114px" darkBlue pill weightBold >
              Question.3
            </Tag>
            <div className="pt-1">
              <span>What are they discussing?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogQuestion;
