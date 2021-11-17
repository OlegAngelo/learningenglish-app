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

  stepLineChart2: [
    {
      label: 'Test',
      data: [
        { x: 0, y: -25 },
        { x: 33, y: 0 },
        { x: 65, y: 0 },
        { x: 122, y: 56 },
        { x: 152, y: 28 },
        { x: 175, y: 28 },
        { x: 210, y: 10 },
        { x: 235, y: 28 },
        { x: 276, y: 28 },
        { x: 336, y: -26 },
        { x: 400, y: -26 },
      ],
      borderColor: '#02BEB2',
      backgroundColor: 'transparent',
    },
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

  stepLineChart3: [
    {
      data: [
        { x: 0, y: -39 },
        { x: 32, y: -13 },
        { x: 66, y: -13 },
        { x: 93, y: -14 },
        { x: 122, y: -30 },
        { x: 152, y: 14 },
        { x: 175, y: -3 },
        { x: 337, y: -3 },
        { x: 363, y: -13 },
        { x: 400, y: -13 },
      ],
      borderColor: '#FE0E35',
      backgroundColor: 'transparent',
    },
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

  titleText: {
    disabled: 'まずはお手本の音声を聞きましょう',
    default:
      '録音音声を聞いて、正しく発音できたと思ったら解答結果へ進みましょう',
    recording:
      '録音音声を聞いて、正しく発音できたと思ったら解答結果へ進みましょう',
    playing:
      '録音音声を聞いて、正しく発音できたと思ったら解答結果へ進みましょう',
  },

  iconText: {
    default: '録音する',
    recording: '録音中...',
  },

  correct: {
    evaluation: 'A',
    pronunciation: 'A',
    volume: 'B',
    intonation: 'B',
  },

  incorrect: {
    evaluation: 'D',
    pronunciation: 'D',
    volume: 'D',
    intonation: 'D',
  },

  word: {
    correct: 'think',
    incorrect: 'feel',
  },

  question: {
    sentenceReading: 'text-18 mt-px-8',
    shadowing: 'text-14 mt-px-25',
    overlapping: 'text-14 mt-px-25',
  },
};

export default data;
