import React from 'react';
import { Link } from 'react-router-dom';

import UnitBox from '../../../UnitBox';

const MuscleTraining = ({ logs }) => {
  let condition = logs == null || logs == undefined;

  const handleTrainingTile = (key, index) => {
    if (!condition) {
      let description = '';
      let {
        is_quickstart: isQuickstart,
        is_review: isReview,
        is_checklist: isChecklist,
        learning_type: learning_type,
        training_unit,
      } = logs[0].log_learn_sessions[index];

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

  return (
    <div>
      <div className={`${logs[0]?.log_learn_sessions.length === 0 && 'text-opacity-50'} font-bold text-primary-500 text-18 mt-px-20 ml-px-20 mb-px-16`}>筋トレ</div>
      {logs[0]?.log_learn_sessions?.map((session, index) => (
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
            hasArrowRight
          />
        </Link>
      ))}
      <div className="h-px-8 bg-background-200" />
    </div>
  );
};

export default MuscleTraining;
