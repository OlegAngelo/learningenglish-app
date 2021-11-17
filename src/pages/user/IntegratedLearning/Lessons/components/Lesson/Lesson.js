import React, { Fragment } from 'react';
import Pause from '../../../../../../shared/icons/Pause';
import Tag from '../../../../../../shared/Tag/Tag';
import Cube from '../../../../../../shared/icons/Cube';

import style from './Lesson.module.css';

const IntegratedLearningLesson = ({ title, types, attempts, isPaused }) => {
  return (
    <div>
      <div className={`pr-4 pt-2 text-basic-100 ${style.card}`}>
        <div className="relative">
          <span className="font-semibold">{title}</span>
          <div style={{ fontSize: '11px', paddingBottom: '20px' }}>
            <div className="flex">
              {isPaused ? (
                <Fragment>
                  <Pause className="self-center" width="16px" height="16px" />
                  <span className="text-primary-500 ml-1 text-12 font-theme-regular">
                    中断あり
                </span>
                </Fragment>
              ) : (
                  <span className="h-px-18" ></span>
              )}
            </div>
            <div className="flex justify-end" style={{ marginTop: '-34px' }}>
              <span className="text-basic-200">学習状況：{attempts}回</span>
            </div>
            <div className="flex justify-end my-1">
              {types.map((type, index) => (
                <Fragment>
                  {type.isFinished ? (<Cube color="orange" size="xsm" />) : (<div />)}
                  <Tag color={type.isFinished ? `orange` : `gray`} size="xs" width="66px" pill weightLight className="ml-1" >
                    {type.type}
                  </Tag>
                </Fragment>
              ))}
            </div>
            <div className="flex justify-end">
              <span className="text-primary-500 font-theme-bold text-12">
                学習ログを見る
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedLearningLesson;
