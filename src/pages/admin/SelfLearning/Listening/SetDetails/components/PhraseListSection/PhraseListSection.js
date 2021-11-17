import React, { Fragment } from 'react';
import { Accordion } from 'react-accessible-accordion';

import PhraseItem from './components/PhraseItem/PhraseItem';

const PhraseListSection = ({phrases, listeningSet, isFetchingList}) => {
  const { order } = listeningSet;

  const columnHeaders = [
    {text: "問題ID", class: "w-1/5 py-px-14 pl-px-24 text-gray-500 text-12 font-bold"},
    {text: "解答文", class: "w-full py-px-14 mx-4 text-gray-500 text-12 font-bold"},
    {text: "正答率", class: "w-3/5 py-px-14 text-gray-500 text-12 font-bold"},
    {text: "", class: "w-1/6 py-px-14 text-gray-500 text-12 font-bold"},
  ];

  const rowHeader = () => {
    return (
      <Fragment>
        <div
          className="flex justify-start bg-gray-300 mt-14"
        >
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

  return (
    <div className="mt-14 mb-40">
      
      <h2 className="font-bold text-12 leading-px-12 text-gray-400">
        セット数
      </h2>

      <h2 className="font-normal text-14 text-gray-900 pt-4">Set.{order || ''}</h2>

      {rowHeader()}

      {isFetchingList ? (
        <div colSpan='9' className='text-center mt-2'>
          読み込み中...
        </div>
      ) : phrases?.length !== 0 ? (
        <Accordion allowZeroExpanded>
          {phrases.map((item, index) => (
            <PhraseItem item={item} key={index} />
          ))}
        </Accordion>
      ) : (
        <div colSpan='9' className='text-center mt-2'>
          データが見つかりません
        </div>
      )}
    </div>
  );
};

export default PhraseListSection;
