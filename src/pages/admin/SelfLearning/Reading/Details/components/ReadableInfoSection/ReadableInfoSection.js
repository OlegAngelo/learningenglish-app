import { Fragment } from 'react'
import Card from '../../../../../../../shared/Card/Card';
import style from "./ReadableInfoSection.module.css";

const ReadableInfoSection = ({item, summary}) => {
  const { chunkRate, paragraphRate, updatedAtHour, updatedAtTime } = summary || {};
  const { totalParticipants, totalAnswers} = item || {};

  return (
    <Fragment>
        <p className="text-left font-bold text-18 text-background-300 leading-none">
          情報 
        </p>
        <div className="grid gap-4 grid-cols-3 pt-px-16">
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                問題ID
              </h3>
              <p className={`${style.value} font-normal text-16 leading-px-21 pt-px-12 pb-5`}>
                {item?.id || '-'}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="haha font-bold text-gray-400 text-12 leading-px-12">
                実施人数
              </h3>
              <p className={`${style.value} font-normal text-16 leading-px-21 pt-px-12 pb-5`}>
                {totalParticipants || '-'}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                総回答数
              </h3>
              <p className={`${style.value} font-normal text-16 leading-px-21 pt-px-12 pb-5`}>
              {totalAnswers || '-'}
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                クリア率
              </h3>
              <p className={`${style.value} font-normal text-16 leading-px-21 pt-px-12`}>
              {totalAnswers ? `${chunkRate}%` : '-'} 
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                時間クリア率
              </h3>
              <p className={`${style.value} font-normal text-16 leading-px-21 pt-px-12`}>
              {totalAnswers ? `${paragraphRate}%` : '-'}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                最終更新日時
              </h3>
              <p className={`${style.value} font-normal text-16 leading-px-21 pt-px-12`}>
                {updatedAtHour || '-'} <br/>
                {updatedAtTime || '-'}
              </p>
            </div>
          </Card>
        </div>
    </Fragment>
  )
};

export default ReadableInfoSection;
