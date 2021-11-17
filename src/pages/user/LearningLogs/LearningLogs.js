import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import moment from 'moment';

import Header from '../../../shared/Header';
import Footer from '../../../shared/Footer';
import Calendar from '../../../shared/Calendar';
import Loading from '../../../shared/Loading';
import ObjectiveList from './components/ObjectiveList';
import StudyRoom from './components/StudyRoom';
import Lectures from './components/Lectures';
import News from './components/News';

import {
  fetchLearningMission,
  fetchCalendarLearningLogs,
  resetLogs,
  fetchLectureLogs,
  fetchNewsLogs,
  fetchTrainingLogs,
} from '../../../redux/learningLogs/slice';

import weekDay from '../../../config/days.json';
import styles from './LearningLogs.module.css';

const LearningLogs = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [missionData, setMissionData] = useState([]);
  const [existingDate, setExistingDate] = useState([]);
  const [completeDate, setCompleteDate] = useState([]);
  const { fetchingLogMission, logMission, calendarLogs } = useSelector(state => state.learningLogs);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchLearningMission({ date }));
    dispatch(fetchCalendarLearningLogs()).then(() => {
      setLoading(false);
    });
    localStorage.setItem('previous_screen', '/learning-logs');
    localStorage.removeItem('breadcrumbs')
  }, []);

  useEffect(() => {
    setMissionData([
      {
        text: '気分の選択',
        checked: !!logMission?.has_motivation,
      },
      {
        text: '筋トレ20問',
        checked: !!logMission?.is_achieved_target_training,
      },
      {
        text: 'News',
        text_next_line: '1本Finishする',
        checked: !!logMission?.is_achieved_target_news,
      },
    ]);
  }, [logMission]);

  useEffect(() => {
    if (calendarLogs !== null) {
      let existingDateTemp = calendarLogs.markIncomplete.map((date) => {
        return DateTime.fromISO(date.created_at).setZone('Asia/Tokyo').toFormat('yyyy-LL-dd');
      });
      let completeDateTemp = calendarLogs.markComplete.map((date) => {
        return DateTime.fromISO(date.created_at).setZone('Asia/Tokyo').toFormat('yyyy-LL-dd');
      });
      setExistingDate(existingDateTemp);
      setCompleteDate(completeDateTemp);
    }
    return () => {
      setExistingDate([]);
      setCompleteDate([]);
    };
  }, [calendarLogs]);

  useEffect(() => {
    dispatch(resetLogs());
  }, [date]);

  const onDateSelect = (calendarDate) => {
    setDate(calendarDate);
    dispatch(fetchLearningMission({ date: calendarDate }));
  }

  useEffect(() => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    dispatch(fetchLectureLogs({ date: formattedDate }));
    dispatch(fetchNewsLogs({ date: formattedDate }));
    dispatch(fetchTrainingLogs({ date: formattedDate }));
  }, [date]);

  return (
    <div className={fetchingLogMission ? 'h-screen bg-background-200' : 'pb-px-60 bg-white mb-px-40'}>
      <Header
        hasBack={false}
        title="学習ログ"
        rootClass={loading ? 'fixed z-10 w-full' : ''}
      />

      {
        loading ? (
          <Loading
            className="top-0 bg-background-200"
            iconClass="bg-primary-500 text-primary-500"
            zIndex="z-0"
          />
        ) : (
          <div>
            <div className={`${styles.calendar} bg-primary-50 flex flex-wrap justify-center`}>
              <Calendar
                className="w-px-338"
                markExisting={existingDate}
                markComplete={completeDate}
                onChange={e => onDateSelect(e)}
              />
            </div>
            <div className={`${styles.date} bg-primary-500 flex justify-center items-center`}>
              <p>{DateTime.fromJSDate(date).toFormat('yyyy/MM/dd')}（{weekDay[DateTime.fromJSDate(date).weekday]}）</p>
            </div>
            {
              fetchingLogMission ? (
                <Loading
                  className="bg-background-200"
                  iconClass="bg-primary-500 text-primary-500"
                  rootPosition="absolute"
                  height="h-1/4"
                  zIndex="z-0"
                />
              ) : (
                <section>
                  <div className={styles.objectiveList}>
                    <ObjectiveList title="今日の目標" data={missionData} />
                  </div>
                  <div className="mt-px-8 ">
                    <StudyRoom />
                    <Lectures />
                    <News />
                  </div>
                </section>
              )
            }
          </div>
        )
      }

      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default LearningLogs;
