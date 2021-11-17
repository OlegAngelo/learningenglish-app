import React from 'react';

import Header from '../../../../../shared/Header/Header';
import Footer from '../../../../../shared/Footer/Footer';
import Menu from '../../../../../shared/Menu/Menu';
import Tab from '../../../../../shared/Menu/components/Tab/Tab';
import ResultTop from './components/ResultTop/ResultTop';
import ResultBottom from './components/ResultBottom/ResultBottom';

import styles from './Logs.module.css';

const Logs = (props) => {
  return (
    <div>
      <div className={`${styles.headerExtraSpace} bg-primary-500`} />
      <Header hasBack={true} title="統合学習 Unit.1 Lesson.1" />
      <div className={styles.boxShadow}>
        <Menu bgColor="primary-500" spaceX="14" paddingX="2" paddingY="3">
          <Tab type="rounded2" size="sm" isActive>
            学習ログ
          </Tab>
          <Tab type="rounded2" size="sm">
            単語・フレーズ
          </Tab>
        </Menu>
      </div>
      <ResultTop />
      <ResultBottom />
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Logs;
