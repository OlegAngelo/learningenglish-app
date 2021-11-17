import React from 'react';

import ImageBanner from './components/ImageBanner/';
import Header from '../components/Header/Header';

import styles from './QuickStart.module.css';

const QuickStart = () => {

  const baseClassHeader = `text-basic-400 text-center font-theme-bold ${styles.launchHeader}`
  return (
    <div className={`flex flex-col items-center bg-primary-500 h-screen relative ${styles.baseLaunchPage}`}>
      <Header title="EDGe School" />
      <div className="mb-8">
        <p className={baseClassHeader}>今日も頑張りましょう</p>
        <p className={`mt-px-12 ${baseClassHeader}`}>まずウォーミングアップアップ！</p>
      </div>
      <ImageBanner
        imgSrc="/undraw_online_test_gba7 1.png"
        title="筋トレクイックスタート"
        subTitle="Unit 1   自己紹介"
      />
      <div className={`absolute ${styles.bottomMargin}`}>
        <p className={`text-basic-400 text-center ${styles.bottomText}`}>スキップ ＞</p>
      </div>
    </div>
  )
}

export default QuickStart;
