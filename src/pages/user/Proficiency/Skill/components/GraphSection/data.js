let data = {
  pieChart: [
    {
      name: 'In Progress',
      score: 65,
      text: 65,
      scoreDiff: 10,
      color: '#03DAC6',
      colorDiff: '#01BCBC',
      get spacing() {
        return this.scoreDiff === 0 ? 63 : 85;
      },
    },
    {
      name: 'Not Tried',
      score: 10,
      text: 10,
      scoreDiff: 0,
      color: '#7A91A6',
      spacing: 57,
    },
    {
      name: 'Mastered',
      score: 10,
      text: 10,
      scoreDiff: 5,
      color: '#F5B160',
      colorDiff: '#F49E38',
      get spacing() {
        return this.scoreDiff === 0 ? 45 : 55;
      },
    },
  ],
};

export default data;
