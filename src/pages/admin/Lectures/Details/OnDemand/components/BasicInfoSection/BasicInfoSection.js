import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Card from '../../../../../../../shared/Card';
import Loading from '../../../../../../../shared/Loading';
import BasicInfoSectionHeader from '../BasicInfoSectionHeader';
import BoardComponent from '../BoardComponent';

import { formattedDateBy } from '../../../../../../../utils/date';

const BasicInfoSection = ({ props, isLoading, updateOnClick, deleteLecture, headerProps }) => {
  const { adminLectureDetail } = useSelector((state) => state.lectures);

  const statusJpTranslation = {
    'planning': '配信予定',
    'live': '配信中',
    'finished': '配信済み',
    'published': '公開済み',
  };

  return (
    <Fragment>
      <BasicInfoSectionHeader 
        headerProps={headerProps}
        isLoading={isLoading}
        updateOnClick={updateOnClick} 
        deleteLecture={deleteLecture}
        props={props}
      />
      <hr />
      <BoardComponent>
        { !isLoading ? (
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
                  <p className="font-normal text-16 leading-px-21 pt-px-12 ">
                    {adminLectureDetail
                      ? formattedDateBy(
                          'SQL',
                          adminLectureDetail?.is_live
                            ? adminLectureDetail?.publish_at
                            : adminLectureDetail?.created_at
                        )
                      : '-'}
                    <br />
                    {adminLectureDetail
                      ? statusJpTranslation[adminLectureDetail?.status]
                      : '-'}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-px-16">
                  <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                    最終更新日時
                  </h3>
                  <p className="font-normal text-16 leading-px-21 pt-px-12 pb-px-12">
                    {adminLectureDetail
                      ? formattedDateBy('SQL', adminLectureDetail.updated_at)
                      : '-'}
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
                  <p className="font-normal text-16 leading-px-21 pt-px-12 pb-px-12">
                    {adminLectureDetail?.play_videos ? adminLectureDetail.play_videos : '-'}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-px-16">
                  <h3 className="font-bold text-gray-400 text-12 leading-px-12">参加人数</h3>
                  <p className="font-normal text-16 leading-px-21 pt-px-12 pb-px-12">
                    {parseInt(adminLectureDetail?.participants) ? adminLectureDetail.participants : '-'}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-px-16">
                  <h3 className="font-bold text-gray-400 text-12 leading-px-12">動画数</h3>
                  <p className="font-normal text-16 leading-px-21 pt-px-12 pb-px-12">
                    {adminLectureDetail?.videos ? adminLectureDetail.videos : '-'}
                  </p>
                </div>
              </Card>
            </div>
          </Fragment>
        ) : (
          <div className="relative">
            <Loading
              rootPosition="absolute top"
              className={`bg-transparent`}
              iconClass="bg-primary-500 text-primary-500"
            />
          </div>
        )}
      </BoardComponent>
    </Fragment>
  );
};

export default BasicInfoSection;
