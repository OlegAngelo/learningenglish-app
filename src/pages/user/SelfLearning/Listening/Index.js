import React, { useEffect } from 'react';

import Footer from '../../../../shared/Footer';
import HeaderSection from '../components/HeaderSection';
import ContentSection from '../components/ContentSection';

import ListeningApi from '../../../../api/ListeningApi';

const ListeningIndex = () => {
  return (
    <div className="h-screen">
      <HeaderSection parentComponent="Listening" />
      <ContentSection
        classroom="大教室 “Listening” 一覧へ"
        description="映像授業、ディクテーションを用いてListeningを学びましょう。"
        videoTip="まずはディクテーションの学習方法やポイントを、映像授業で確認しましょう。"
        chunkTitle="ディクテーション"
        redirectTo='/lectures/listening'
        fetchLevelsApi={ListeningApi.fetchLevels}
      />
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default ListeningIndex;
