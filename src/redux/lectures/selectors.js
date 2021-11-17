import { createSelector } from 'reselect';

import { formattedDate, formattedTime } from '../../utils/date';

export const exerciseDetails = createSelector(
  (state) => state.lectures,
  (lecture) => {
    const exercise = lecture?.lectureExercise;
    return {
      id: exercise?.id,
      exercise_filename: exercise?.exercise_filename,
      total_participants:
        exercise?.total_participants > 0 && exercise?.total_questions
          ? exercise?.total_participants
          : '-',
      total_questions: exercise?.total_questions > 0 ? exercise?.total_questions : '-',
      total_average_correct:
        exercise?.total_average_correct && exercise?.total_questions
          ? `${Math.round(exercise?.total_average_correct * 100)}%`
          : '-',
       has_participants: !!exercise?.total_participants,
    };
  }
);

export const lectureExercises = createSelector(
  (state) => state.lectures,
  (lectures) => {
    const exercises = lectures?.lectureExercise?.lecture_phrases ?? [];

    return exercises.map((data) => {
      return {
        id: data.id,
        average_percentage: !!data.average_correct
          ? `${Math.round(data.average_correct * 100)}%`
          : '-',
        id_name: data.id_name ?? '-',
        question_type: data.lecture_question_type.name,
        question_type_jp: data.lecture_question_type.jp_name,
      };
    });
  }
);

export const exerciseIds = createSelector(
  (state) => state.lectures,
  (lectures) => {
    const exercises = lectures?.lectureExercise?.lecture_phrases ?? [];

    return exercises.map((data) => {
      return data.id;
    });
  }
);

export const lectureVideoList = createSelector(
  (state) => state.lectures,
  (lectures) => {
    const videoList = lectures?.adminVideoList;

    return videoList.map((item) => {
      return {
        id: item.id,
        deleted_at: item.deleted_at,
        filename: item.file_name,
        last_modified: item?.updated_at
          ? `${formattedDate(item.updated_at)} \n ${formattedTime(item.updated_at)}`
          : '-',
        order: item.order,
        url: item.url,
        title: item.title,
        total_views: item?.total_views || '-',
        total_viewers: item?.unique_user_views || '-',
      };
    });
  }
);
