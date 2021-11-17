import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AudioControl from '../components/AudioControl';
import Word from '../components/Word';
import Header from '../../../../shared/Header';
import Option from '../../../../shared/Header/Option';
import Tab from '../../../../shared/Menu/components/Tab';
import Menu from '../../../../shared/Menu';

import style from './ImportantWords.module.css';

const ImportantWords = () => {
  const [tab, setTab] = useState('notes');
  const words = [
    {
      word: 'rebuke',
      translation: '非難',
    },
    {
      word: 'advocacy group',
      translation: '支援団体',
    },
    {
      word: 'underrepresented',
      translation: '不足している',
    },
    {
      word: 'grossly',
      translation: '著しく',
    },
    {
      word: 'role',
      translation: '役割',
    },
  ];

  return (
    <div className={`bg-background-200 w-full flex-row h-screen pb-24`}>
      <Header
        hasBack={true}
        title="News"
      >
        <Option className="mr-px-5"/>
      </Header>
      <div className={style.tabs}>
        <Menu bgColor="primary-500" spaceX="7" paddingX="4" paddingY="3">
          <Link to="/news/details/">
            <Tab type="rounded3" isActive={tab === 'text'}>
              記事本文
            </Tab>
          </Link>
          <Link to="/news/details/important-words">
            <Tab type="rounded3" isActive={tab === 'notes'}>
              語注リスト
            </Tab>
          </Link>
        </Menu>
      </div>

      <div>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word.word}
            translation={word.translation}
          />
        ))}
      </div>

      <AudioControl />
    </div>
  );
};

export default ImportantWords;
