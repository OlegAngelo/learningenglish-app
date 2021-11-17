import { createSelector } from 'reselect';

import { formattedDate, formattedTime } from '../../../../utils/date';

export const listeningListSelector = createSelector(
  (state) => state.adminSLListening,
  (data) => {
    const { listeningList } = data;

    if (!listeningList) return [];
    return listeningList.map((item) => {
      return {
        id: item.key,
        title: `Set ${item.order}`,
        last_modified: `${formattedDate(item.updated_at)} \n ${formattedTime(item.updated_at)}`,
        total_count_taken_training_by_unique_user: item.user_proficiency_all_count,
        total_count_taken_training: item.log_listening_set_count,
        correct_answer_rate: `${item.correct_answer_rate}%`,
        pronounciation_implementation_rate: `${item.pronounciation_implementation_rate}%`
      };
    });
  }
);
