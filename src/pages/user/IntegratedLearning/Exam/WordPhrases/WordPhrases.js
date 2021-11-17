import React from 'react';

import Button from '../../../../../shared/Button';
import Header from '../../../../../shared/Header';
import Player from '../../../../../shared/Header/Player';
import ImportantWord from './components/ImportantWord';

import { upperCaseFirst } from '../../../../../utils/text.js';
import styles from './WordPhrases.module.css';

const WordPhrases = ({ match }) => {

  const category = match.params.category;
  let btnLabel;

  if (upperCaseFirst(category) === 'Reading'){
    btnLabel = '終了して学習結果へ';
  } else if (upperCaseFirst(category) === 'Listening'){
    btnLabel = '次の問題に進む';
  }

  return (
    <div className="bg-background-200 h-full">
      <Header hasBack={false} title={`${upperCaseFirst(category)} 自分の意見を言う`}>
        <Player action="PLAY" isPlaying={true} />
      </Header>
      <div className={`text-14 font-hiragino ml-4 font-theme-bold text-primary-500 ${styles.title}`}>
        <span>重要単語／フレーズ</span>
      </div>
      <div className={`ml-2 ${styles.content}`}>
        <ImportantWord word="sales" translation="売り上げ" />
        <ImportantWord word="discussing" translation="話し合う" />
      </div>
      <div className={styles.buttonSpacing}>
        <Button type="white-square-wider">{btnLabel}</Button>
      </div>
    </div>
  );
};

export default WordPhrases;
