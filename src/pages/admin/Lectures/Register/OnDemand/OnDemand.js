import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import BasicInfoSection from './components/BasicInfoSection';
import BasicInfoSectionHeader from './components/BasicInfoSection/components/Header';
import BoardComponent from '../../../../../shared/BoardComponent';
import Loading from '../../../../../shared/Loading';
import Breadcrumb from '../../../../../shared/Breadcrumb';

import { fetchLecture, resetLectureDetails } from '../../../../../redux/lectures/slice';

import style from './OnDemand.module.css';

const OnDemand = (props) => {
  const { id: liveId, tab } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const goTo404 = () =>
    history.push({
      pathname: '/404',
      state: {
        route: '/admin/lectures',
        text: 'Go to lectures',
      },
    });

  useEffect(() => {
    if (liveId) {
      dispatch(fetchLecture({ lecture_id: liveId })).then(({ payload }) => {
        const { data, status } = payload;

        if (
          status === 404 ||
          moment(data?.lecture_lives.end_at).isSameOrAfter(moment().subtract(1, 'days')) ||
          !data?.is_live
        ) {
          goTo404();
          return;
        }

        setIsLoading(false);
      });
    }

    return () => dispatch(resetLectureDetails());
  }, [liveId]);

  useEffect(() => {
    if (!liveId) setIsLoading(false);
  }, []);

  return (
    <div className="flex-1 w-full bg-adminGray-100 pb-px-100 h-screen">
      <div className="flex pb-px-16 pl-px-32 pt-px-24">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="大教室　授業一覧" to="/admin/lectures" />
        <Breadcrumb text={liveId ? '授業編集' : 'オンデマンド授業動画を登録'} to="#3" active last />
      </div>
      <div className="pb-12 bg-adminGray-100">
        <div className={`bg-white mx-8 rounded-px-4 shadow-card ${style.board}`}>
          {liveId && isLoading ? (
            <Fragment>
              <BasicInfoSectionHeader />
              <BoardComponent>
                <div className="relative pb-px-40">
                  <Loading
                    rootPosition="absolute top -mt-px-15"
                    className={`bg-transparent`}
                    iconClass="bg-primary-500 text-primary-500"
                  />
                </div>
              </BoardComponent>
            </Fragment>
          ) : (
            <BasicInfoSection />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnDemand;
