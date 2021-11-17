import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '../../../../../shared/Alert';
import UnitBox from '../UnitBox';
import styles from './LogBox.module.css';

const LogBox = ({ logs, date, missionData }) => {
  let condition = logs == null || logs == undefined;
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const handleTrainingTile = (key, index) => {
    if (!condition) {
      let description = '';
      let {
        is_quickstart: isQuickstart,
        is_review: isReview,
        is_checklist: isChecklist,
        learning_type: learning_type,
        training_unit,
      } = logs.log_learn[0].log_learn_sessions[index];

      if (isQuickstart) {
        description = 'クイックスタート';
      } else if (isReview) {
        description = '復習';
      } else if (isChecklist) {
        description = 'チェックリスト';
      } else {
        description = 'コース選択';
      }

      if (key === 'title') {
        return training_unit.name;
      } else if (key === 'category') {
        if (learning_type === 'muscle-training-word') {
          return '単語';
        } else {
          return 'フレーズ';
        }
      } else {
        return description;
      }
    }
  };

  const redirectToTrainingMuscle = (session) => {
    localStorage.setItem('course_result_prev_page', 'learning-logs');
    localStorage.setItem('learning_log_lesson_type', session.learning_type);
    localStorage.setItem(
      'learning_log_training_unit',
      session.training_unit_id
    );
    return `/training/muscle-courses/${session.id}/lesson-log/result`;
  };

  const getLectureTitle = (lecture) => {
    if (lecture.lecture_live) {
      return lecture.lecture_live.lecture.title;
    } else {
      return lecture.lecture.title;
    }
  };

  const getLectureGenre = (lecture) => {
    if (lecture.lecture_live) {
      return lecture.lecture_live.lecture.lecture_genre.name;
    } else {
      return lecture.lecture.lecture_genre.name;
    }
  };

  const getLectureGenre2 = (lecture) => {
    if (lecture.lecture_live) {
      return lecture.lecture_live.lecture.lecture_genre2?.name;
    } else {
      return '';
    }
  };

  const getLectureLevel = (lecture) => {
    if (lecture.lecture_live) {
      return lecture.lecture_live.lecture.level;
    } else {
      return lecture.lecture.level;
    }
  };

  return (
    <Fragment>
      <Alert
        show={showModal}
        callBack={() => setShowModal(false)}
        msg={alertMessage}
        customOption={{message: '閉じる', className: 'font-sf-pro-text'}}
      />
      {!condition && logs.log_learn[0].log_learn_sessions.length > 0 ? (
        <div className="mb-5">
            <div>
              <div className={styles.line}></div>
              <div className="px-px-20">
                <p className={`${styles.title} font-bold text-primary-500`}>
                  筋トレ
                </p>
              </div>
              {logs.log_learn[0].log_learn_sessions.map((session, index) => (
                <Link
                  key={index}
                  to={() => redirectToTrainingMuscle(session)}
                  onClick={() => {
                    localStorage.setItem('log_learn_session_id', session.id);
                  }}
                >
                  <UnitBox
                    title={handleTrainingTile('title', index)}
                    description={handleTrainingTile('desc', index)}
                    session={session}
                    categoryLabelText={handleTrainingTile('category', index)}
                  />
                </Link>
              ))}
            </div>
        </div>
        ) : (
          ''
        )}
      
      {/* temporary commented since no integrated training yet */}
      {/*
      <div className={styles.line}></div>
      <div className={styles.unitContainer}>
        <div className={styles.line}></div>

        <div className="px-px-20">
          <p className={`${styles.title2} font-bold text-primary-500`}>
            統合学習
          </p>
          <p className={`${styles.time} font-normal`}>2回 ／ 0:45;45</p>
        </div>

        <UnitBox
          title="unit.1 自己紹介 &nbsp;Lesson.1"
          description="クイックスタート"
        />

        <UnitBox
          title="unit.1 自己紹介 &nbsp;Lesson.1"
          description="クイックスタート"
          className="mb-px-0"
        />
      </div> */}

      {!condition && logs.log_news.length > 0 && (
        <div className="mb-5">
          <div className={styles.line}></div>
          <div className="px-px-20">
            <p className={`${styles.title} font-bold text-primary-500`}>NEWS</p>
          </div>
          {logs.log_news.map((session, index) => (
            <div key={index}>
              <UnitBox
                paragraphclassname={`${styles.unitBox} mb-px-14`}
                title={session.news.title}
                description={session.news.genre.title}
                session={session}
                wpm={session?.wpm}
                isfinished={session?.finished_at}
                level={session.news.level}
              />
            </div>
          ))}
        </div>
      )}

      {!condition && logs.log_lectures.length > 0 && (
        <div className="mb-5">
          <div className={styles.line}></div>
          <div className="px-px-20">
            <p className={`${styles.title} font-bold text-primary-500`}>
              大教室
            </p>
          </div>
          {logs.log_lectures.map((session, index) => (
            <div key={index}>
              <UnitBox
                paragraphclassname={`${styles.unitBox} mb-px-14`}
                title={getLectureTitle(session)}
                description={getLectureGenre(session)}
                description2={getLectureGenre2(session)}
                level={getLectureLevel(session)}
                {...(session.lecture_live && { live:true })}
                {...(session?.lecture?.lecture_phrases?.length && { withMaterials:true })}
              />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default LogBox;
