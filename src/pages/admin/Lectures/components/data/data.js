export const genreOptions = [
  {
    label: 'LIVE',
    value: 8,
  },
  {
    label: '文法',
    value: 1,
  },
  {
    label: 'Listening',
    value: 2,
  },
  {
    label: 'Reading',
    value: 3,
  },
  {
    label: 'Speaking',
    value: 4,
  },
  {
    label: 'Writing',
    value: 5,
  },
  {
    label: '異文化',
    value: 6,
  },
  {
    label: 'ビジネス英語Tips',
    value: 7,
  },
];

export const levelOptions = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
];

export const genreOptionsFilterByArray = (key, values) => {
  return genreOptions.filter(option => values.includes(option[key]));
};
