import React from 'react';

import BorderBoxIcon from '../BorderBoxIcon';
import Cube from '../../../../../../../shared/icons/Cube';
import Button from '../../../../../../../shared/Button/Button';

import styles from './ResultBottom.module.css';

const ResultBottom = () => {
  return (
    <div className="bg-white">
      <h1 className={`${styles.title} text-primary-500 font-bold`}>
        獲得したCan-Do
      </h1>

      <div className={styles.marginBottomBox}>
        <BorderBoxIcon
          icon={<Cube color="orange" />}
          text="提案を行ったり、提案に応答したりできる"
        />
        <BorderBoxIcon
          className={styles.borderBottomNone}
          icon={<Cube color="darkBlue" size="lg" />}
          text="ゆっくりした速度ではっきりと話される会話において、話者同士の意見が一致していないことを認識できる"
        />
      </div>

      <div className={`${styles.line} bg-background-200`} />

      <div className={`${styles.btnDiv} flex justify-center`}>
        <Button type="white-bold">トレーニングを再チャレンジ</Button>
      </div>

      <div className={styles.footerDiv}></div>
    </div>
  );
};

export default ResultBottom;
