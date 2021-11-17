import React from 'react';

import CardImage from '../../components/CardImage';
import Header from '../../../../../../shared/Header';
import PauseIcon from '../../../../../../shared/icons/PauseIcon';
import Situation from './components/Situation';

import styles from './Details.module.css';

const Details = (props) => {
  return (
    <div className="bg-background-200 h-full">
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full">
          <Header hasBack={false} title="統合学習" titleClass="ml-px-15">
            <PauseIcon />
          </Header>
        </div>
      </div>

      <CardImage imgSrc="/images/writing-exam.png">
        <p className="text-12 text-basic-500 font-bold mt-px-5">
          WRITING
        </p>
        <p className={`text-16 font-hiragino-kaku text-basic-500 mt-px-12 mb-px-13 ${styles.opinion}`}>
          会議をまとめる
        </p>
      </CardImage>

      <Situation />
    </div>
  );
};

export default Details;
