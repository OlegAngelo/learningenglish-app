import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import Card from '../../../../../../shared/Card/Card';
import BasicInfoSectionHeader from './components/BasicInfoSectionHeader';
import BoardComponent from '../BoardComponent';
import PublicationSection from './components/PublicationSection/PublicationSection';

import newsStatuses from '../../../../../../config/newsStatuses.json';

// utils
import calculatePercentage from '../../../../../../utils/calculatePercentage';
import { formattedDateBy } from '../../../../../../utils/date';

const BasicInfoSection = ({deleteNews}) => {
  const { newsDetails } = useSelector(state => state.news);
  const {
    scheduled_published_at,
    published_at,
    updated_at,
    news_pvs_count: numberOfViews,
    user_news_count: numberOfViewers,
    user_news_finished_count: numberOfFinishedNews,
    status,
    genre,
    level,
    title,
    title_translation
  } = newsDetails || {};

  return (
    <Fragment>
      <BasicInfoSectionHeader deleteNews={deleteNews}/>
      <hr />
      <BoardComponent>
        <p className="text-left font-bold text-18 text-background-300 leading-none">
          利用状況
        </p>
        <div className="pt-px-16" />
        <div className="grid gap-x-4 grid-cols-3">
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                ステータス
              </h3>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                {
                  scheduled_published_at && newsStatuses[status]
                    ? `${status == 'published' ? '' : formattedDateBy('SQL', scheduled_published_at)} `
                    : '-'
                }
              </p>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                {scheduled_published_at &&
                  newsStatuses[status] &&
                  `${newsStatuses[status]}`}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                公開日時
              </h3>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                { published_at ? formattedDateBy('SQL', published_at) : '-' }
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                最終更新日時
              </h3>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                { updated_at ? formattedDateBy('ISO', updated_at) : '-' }
              </p>
            </div>
          </Card>
        </div>
        <div className="pt-px-16" />
        <div className="grid gap-x-4 grid-cols-4">
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                閲覧数
              </h3>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                { numberOfViews || '-' }
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                閲覧人数
              </h3>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                { numberOfViewers || '-'}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                完了人数
              </h3>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                { numberOfFinishedNews || '-' }
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                完了割合
              </h3>
              <p className="font-normal text-16 leading-px-21 pt-px-12">
                {calculatePercentage(numberOfFinishedNews, numberOfViewers)}
              </p>
            </div>
          </Card>
        </div>
        <div className="mt-px-48">
          <PublicationSection/>
        </div>
        <div className="mt-px-40">
          <h3 className="font-bold text-gray-400 text-12 leading-px-12">
            ジャンル
          </h3>
          <p className="font-normal pt-px-16 text-16">
            { genre ? genre.title : '-' }
          </p>
        </div>
        <div className="mt-px-40">
          <h3 className="font-bold text-gray-400 text-12 leading-px-12">
            難易度
          </h3>
          <p className="font-normal pt-px-16 text-16">
            { level ?? '-'}
          </p>
        </div>
        <div className="mt-px-40">
          <h3 className="font-bold text-gray-400 text-12 leading-px-12">
            タイトル
          </h3>
          <p className="font-normal pt-px-16 text-16 break-words">
            { title ?? '-' }
          </p>
        </div>
        <div className="mt-px-40">
          <h3 className="font-bold text-gray-400 text-12 leading-px-12">
            タイトル（訳）
          </h3>
          <p className="font-normal pt-px-16 text-16 break-words">
            { title_translation ?? '-' }
          </p>
        </div>
      </BoardComponent>
    </Fragment>
  );
};

export default BasicInfoSection;
