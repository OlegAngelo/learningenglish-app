let data = {
  stepLineChart: [
    {
      data: [
        { x: 0, y: -39 },
        { x: 32, y: -13 },
        { x: 67, y: -13 },
        { x: 90, y: 41 },
        { x: 122, y: 41 },
        { x: 152, y: 14 },
        { x: 275, y: 14 },
        { x: 337, y: -39 },
        { x: 400, y: -39 },
      ],
      borderColor: '#0C5F8D',
      backgroundColor: 'transparent',
    },
  ],
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
      name: 'Master',
      score: 10,
      score: 10,
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
