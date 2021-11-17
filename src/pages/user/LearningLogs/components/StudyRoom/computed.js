export const formatReadingProps = (logs) => {
  if (!logs) return null;
  return logs?.map((log) => {
    return {
      description: `Level ${log.sentence.level_id}`,
      title: log.sentence.title,
      total_study_time: log.study_time,
      isTimeUp: log.whole_reading_left_sec === 0 ? true : false,
      is_mastered: log.understanding_rate >= 80 ?? false,
    }
  });
};

export const formatListeningProps = (logs) => {
    if (!logs) return null;
    return logs?.map((log) => {
      return {
        description: `Level ${log?.set?.level?.order}`,
        title: `Set.${log?.set?.order}`,
        total_study_time: log.total_study_time,
        is_mastered: log?.is_correct_dictation,
        did_shadowing: false,
      };
    });
};
