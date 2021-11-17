import React, { Fragment } from 'react';
import Card from '../../../../../../../shared/Card/Card';

import { rate, date, time } from './computed';

const ReadableInfoSection = ({phraseData}) => {
  const {
    id,
    updated_at,
    correctAnswerRate,
    pronunciationRate,
    totalWordLogs
  } = phraseData;

  return (
    <Fragment>
      <p className="text-left font-bold text-18 text-background-300 leading-none">
        情報
      </p>
      <div className="grid gap-4 grid-cols-3 pt-px-16">
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              問題 ID
            </h3>
            <p className="font-normal text-16 text-adminGray-800 leading-px-21 pt-px-12 pb-5">
              {id}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              正答率
            </h3>
            <p className="font-normal text-16 text-adminGray-800 leading-px-21 pt-px-12">
              {rate(correctAnswerRate, totalWordLogs)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              最終更新日時
            </h3>
            <p className="font-normal text-16 text-adminGray-800 leading-px-21 pt-px-12">
              {date(updated_at)}
              <br />
              {time(updated_at)}
            </p>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default ReadableInfoSection;
