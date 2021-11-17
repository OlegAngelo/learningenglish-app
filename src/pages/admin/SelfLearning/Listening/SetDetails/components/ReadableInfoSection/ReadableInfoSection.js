import React, { Fragment } from 'react';
import Card from '../../../../../../../shared/Card/Card';

const ReadableInfoSection = ({listeningSet}) => {
  const { 
    correctAnswerRate, 
    countWordLogs,
    pronunciationRate,
    totalSetAnswers, 
    totalParticipants, 
    updatedAtDate, 
    updatedAtTime, 
    key 
  } = listeningSet;

  return (
    <Fragment>
      <p className="text-left font-bold text-18 text-background-300 leading-none">
        情報
      </p>
      <div className="grid gap-4 grid-cols-3 pt-px-16">
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              Set ID
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12 pb-5">
              {key || '-'}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              実施人数
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12 pb-5">
              {totalParticipants || '-'}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              総回答数
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12 pb-5">
              {totalSetAnswers || '-'}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              正答率
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12">
              {countWordLogs == null ? '-' : (correctAnswerRate ? `${correctAnswerRate}%` : '0%')}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              最終更新日時
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12">
              {updatedAtDate || '-'} <br />
              { updatedAtTime || '-'}
            </p>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default ReadableInfoSection;
