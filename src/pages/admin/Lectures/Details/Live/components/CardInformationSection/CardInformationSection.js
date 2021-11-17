import React, { Fragment } from 'react';
import moment from 'moment';

import Card from '../../../../../../../shared/Card';

import style from './CardInformationSection.module.css';

import { formattedDateBy } from '../../../../../../../utils/date';

const CardInformationSection = ({ data = null }) => {
  const statusJpTranslation = {
    planning: '配信予定',
    live: '配信中',
    finished: '配信済み',
    published: '配信済み',
  };

  const getStatus = (lecture) =>
    lecture.is_live ? lecture.live_status : lecture.publish_status;

  const showDate = (lecture) => {
    if (lecture.is_live) {
      switch (getStatus(lecture)) {
        case 'live':
        case 'planning':
          return formattedDateBy('SQL', lecture.lecture_lives.start_at);
        case 'published':
        case 'finished':
          return formattedDateBy('SQL', lecture.lecture_lives.end_at);
      }
    }
    if (!lecture.is_live) {
      return moment(lecture.updated_at).format('YYYY/MM/DD HH:mm');
    }
  };

  return (
    <Fragment>
      <p className="text-left font-bold text-18 text-background-300 leading-none">
        情報
      </p>
      <div className="pt-px-16" />
      <div className="grid gap-x-4 grid-cols-3">
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              ステータス
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12">
              {showDate(data)}
            </p>
            <p className="font-normal text-16 leading-px-21">
              {statusJpTranslation[getStatus(data)]}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              最終更新日時
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12">
              {moment(data.updated_at).format('YYYY/MM/DD HH:mm')}
            </p>
          </div>
        </Card>
      </div>
      <div className="pt-px-16" />
      <div className="grid gap-x-4 grid-cols-3">
        <Card>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              再生回数
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12">
              {parseInt(data.lecture_lives.log_lecture_lives_sum_is_url_opened)
                ? data.lecture_lives.log_lecture_lives_sum_is_url_opened
                : '-'}
            </p>
          </div>
        </Card>
        <Card className={style.cardHeight}>
          <div className="p-px-16">
            <h3 className="font-bold text-gray-400 text-12 leading-px-12">
              参加人数
            </h3>
            <p className="font-normal text-16 leading-px-21 pt-px-12">
              {parseInt(data.numberOfParticipants) ? data.numberOfParticipants : '-'}
            </p>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default CardInformationSection;
