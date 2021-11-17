export const pieChartData = (
  inprogressScore,
  inprogressDiff = 0,
  masterScore,
  masterDiff = 0,
  notTriedScore,
  masterSign = '+',
  inProgressSign = '+',
  masterPrevCount = 10,
  ) => {
  let data = {
    pieChart: [
      {
        name: 'Mastered',
        score: masterScore,
        text: (masterPrevCount === 0) ? 0 : masterScore,
        diffText: masterDiff,
        scoreDiff: (masterPrevCount === 0) ? 0 : masterDiff,
        color: (masterPrevCount === 0) ? '#F49E38' : '#F5B160',
        colorDiff: '#F49E38',
        masterSign: masterSign
      },
      {
        name: 'In Progress',
        // Added new condition where if inProgressDiff is not 0 then should display the difference of in-progress.
        // In the case, where all questions are in-progress and the user is taking the same in-progress questions.
        // - Lawrence
        score: inprogressScore,
        text: inprogressScore,
        diffText: inprogressDiff,
        scoreDiff: inprogressDiff,
        color: '#03DAC6',
        colorDiff: '#01BCBC',
        inProgressSign: inProgressSign
      },
      {
        name: 'Not Tried',
        score: notTriedScore,
        text: notTriedScore,
        diffText: 0,
        scoreDiff: 0,
        color: '#7A91A6',
      },
    ]
  };
  return data;
};
