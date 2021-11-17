import { createSelector } from 'reselect';

import { formattedDate, formattedTime } from '../../../../utils/date';

export const readingListSelector = createSelector(
  (state) => state.adminSLReading,
  (data) => {
    const { readingList } = data;

    if (!readingList) return [];
    return readingList.map((item) => {
      return {
        ...item,
        unique_participants: !!item.unique_participants ? item.unique_participants : '-',
        user_reads_paragraph: !!item.user_reads_paragraph ? item.user_reads_paragraph : '-',
        time_clear_rate: item.user_reads_paragraph ? `${item.time_clear_rate}%` : '-',
        participants_average_correct_answer_rate: item.user_reads_paragraph ? `${item.participants_average_correct_answer_rate}%` : '-',
        last_modified: `${formattedDate(item.updated_at)} \n ${formattedTime(item.updated_at)}`,
      };
    });
  }
);
