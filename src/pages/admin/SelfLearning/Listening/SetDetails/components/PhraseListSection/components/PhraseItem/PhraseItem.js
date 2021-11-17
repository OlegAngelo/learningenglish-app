import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';

import ChevronUpIcon from '../../../../../../../../../shared/icons/ChevronUpIcon';
import ChevronDownIcon from '../../../../../../../../../shared/icons/ChevronDownIcon';

import styles from './PhraseItem.module.css';

const PhraseItem = ({ item }) => {
  const { 
    countShadowing,
    totalPhraseAnswers,
    sentence, 
    sentence_jp, 
    wordList,
    rate
  } = item;

  const pronunciationRate = !wordList.length ? '-' : totalPhraseAnswers ? `${Math.round((countShadowing / totalPhraseAnswers) * 100)}%` : '0%';
  const correctAnswerRate = !wordList.length ? '-' : (rate ? `${rate}%` : '0%');

  const columnHeaders = [
    {text: "", class: "w-1/5 py-2 pl-px-24 text-xs font-normal text-adminPrimary-400"},
    {text: "単語", class: "w-full py-2 mx-4 text-12 font-bold"},
    {text: "正答率", class: "w-3/5 py-2 text-12 font-bold"},
    {text: "", class: "w-1/6 py-2"},
  ];

  const rowHeader = () => {
    return (
      <Fragment>
        <div className="flex justify-around border-b bg-gray-500 text-gray-300">
          {
            columnHeaders.map((item, index) => {
              return (<Fragment key={index}>
                <div className={item.class}>{item.text}</div>
              </Fragment>
              )
            })
          }
        </div>
      </Fragment>
    );
  }

  const wordRates = () => {
    return (
      <Fragment>
        {!!wordList &&
          wordList.map((item, index) => (
            <div className="flex justify-around border-b bg-gray-100 text-gray-700" key={index}>
              <div className="w-1/5 py-4 pl-px-24 text-xs font-normal text-adminPrimary-400"></div>
              <div className="w-full py-4 mx-4 text-12">{item.word}</div>
              <div className="w-3/5 py-4 text-12">{item.rate ? `${item.rate}%` : '0%'}</div>
              <div className="w-1/6 py-4"></div>
            </div>
          ))}
      </Fragment>
    );
  }

  return (
    <AccordionItem
      key={item.id}
      className="border-gray-300 "
      uuid={item.id}
    >
      <AccordionItemHeading>
        <AccordionItemButton className="flex justify-around items-center border-b">
          <div className="w-1/5 py-4  pl-px-24  text-xs font-normal text-adminPrimary-400">
            <Link to={`/admin/listening/phrase/${item.id}/edit`}>
              <h2>{item.id}</h2>
            </Link>
          </div>
          <div className="w-full py-4 mx-4">
            <p className={`${styles.en_title}`}>{sentence || '-'}</p>
            <p className={`${styles.jp_title}`}>{sentence_jp || '-'}</p>
          </div>
          <div className={`${styles.value} w-3/5 py-4`}>{correctAnswerRate}</div>
          <div className="w-1/6 py-4">
            <AccordionItemState>
              {({ expanded }) =>
                expanded ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
            </AccordionItemState>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>

        {!wordList.length || rowHeader()}
        
        {wordRates()}
        
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default PhraseItem;
