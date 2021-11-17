import React, { useEffect } from 'react';

import Footer from '../../../../shared/Footer';
import HeaderSection from '../components/HeaderSection';
import ContentSection from '../components/ContentSection';

import UserReadingApi from '../../../../api/SelfLearning/Reading/UserReadingApi';

const ReadingIndex = () => {
  return (
    <div className="h-screen">
      <HeaderSection parentComponent="Reading" />
      <ContentSection
        classroom="大教室 “Reading” 一覧へ"
        description="映像授業、チャンクリーディングを用いてReadingを学びましょう。"
        videoTip="まずはチャンクリーディングの学習方法やポイントを、映像授業で確認しましょう。"
        chunkTitle="チャンクリーディング"
        redirectTo='/lectures/reading'
        fetchLevelsApi={UserReadingApi.fetchLevels}
      />
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default ReadingIndex;
