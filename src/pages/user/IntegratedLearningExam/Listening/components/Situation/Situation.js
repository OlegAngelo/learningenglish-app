import React from 'react';

import Button from '../../../../../../shared/Button/Button';
import Cube from '../../../../../../shared/icons/Cube';
import styles from './Situation.module.css';

const Situation = (props) => {
  return (
    <div className="px-px-16 bg-background-200">
      <div className="flex justify-center">
        <h4 className={`text-14 text-primary-500 text-center font-bold mb-px-19 ${styles.situation}`}>
          Situationで設定された状況を読んで、
          <br /> 音声を聞きましょう
        </h4>
      </div>

      <p className="text-14 leading-px-14 mb-px-12 text-primary-500">
        Situation
      </p>

      <div className="bg-white rounded-px-4 p-px-15 mb-px-8 h-px-80">
        <p className={`${styles.situationDescription} text-14 text-basic-100 mt-px-2 mr-px-2`}>
          自社製品の売上不振を背景に、売上回復策を検討中です。
        </p>
      </div>

      <p className="text-14 text-primary-500 leading-px-14 mb-px-8">
        獲得できるCan-Do
      </p>

      <div className="flex mb-px-37">
        <div className="w-px-66 h-px-66 bg-white rounded-full flex items-center justify-center">
          <Cube color="orange" className="-mt-px-2" />
        </div>
        <div className="w-4/5 text-12 text-black leading-px-18 ml-px-8 mt-px-6">
          ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button className="focus:outline-none my-px-12 rounded text-14 font-semibold h-px-44 text-custom-2 shadow-btn-choice mb-px-50 w-px-162 mx-px-16 disabled-gray text-disabled-gray">
          リスニングスタート
        </button>
      </div>
    </div>
  );
};

export default Situation;
