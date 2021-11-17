import React from 'react';
import Footer from '../../../../../shared/Footer/Footer';
import Header from '../../../../../shared/Header/Header';
import Menu from '../../../../../shared/Menu/Menu';
import Tab from '../../../../../shared/Menu/components/Tab/Tab';
import Log from './components/Log/Log';

import style from './WordPhrasesLogs.module.css';

const WordPhrasesLogs = () => {
  return (
    <div className="pb-24 bg-white">
      <div className={style.wordPhrasesLogHeader}>
        <Header hasBack={true} title="統合学習 Unit.1 Lesson.1"/>
      </div>
      <div className={style.wordPhrasesLogTab}>
        <Menu bgColor="primary-500" spaceX="16" paddingX="2" paddingY="3">
          <Tab type="rounded2" size="sm" >
            単語
          </Tab>
          <Tab type="rounded2" size="sm" isActive>
            フレーズ
          </Tab>
        </Menu>
      </div>
      <Log />
      <div className={`fixed left-0 right-0 ${style.wordPhrasesLogFooter}`}>
        <Footer />
      </div>
    </div>
  );
};

export default WordPhrasesLogs;
