import React, { useState } from 'react';

import Header from '../../../../../shared/Header/Header';
import Player from '../../../../../shared/Header/Player';

import styles from './Start.module.css'

const Start = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggle = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <div>
      <Header hasBack={false} title="統合学習">
        <Player isPlaying={isPlaying} onClick={toggle} action="PLAY" />
      </Header>
      <div style={{ backgroundImage: `url('/images/shutterstock_1677786904_r 2.jpg')` }} className={`flex flex-col items-center  ${styles.startBackground}`}>
        <div className={styles.overlayImage}>
        </div>
        <div className="absolute text-basic-400 ">
          <div className={` text-center ${styles.headerText}`}>
            <h1 className="text-30 font-bold">Unit.1 会議</h1>
            <h2 className="text-18 font-bold mt-px-20">Lesson1: 自分の意見を言う</h2>
          </div>
          <div className={styles.box1}>
            <p className={`text-center text-14 font-bold ${styles.lessonText}`}>Lessonの目標</p>
            <p className={`text-14 font-bold tracking-tighter ${styles.englishDescription}`}>
              You can submit your opinion at a conference in practical English.
              <p className="font-theme-normal text-14"> 会議で，自分の意見を実用的な英語表現で提案できる</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Start;
