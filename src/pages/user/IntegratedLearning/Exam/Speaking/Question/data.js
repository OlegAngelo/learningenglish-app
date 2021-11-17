let data = [
  {
    type: 'single', 
    instruction: '表示される英語を読み上げて、会話をしましょう',
    subDialogue: '',
    firstDialogue: 'I\'m afraid but I don’t think so.',
    secondDialogue: '申し訳ないけど，私はそうは思いません。',
    hasPolygon: true,
  },
  {
    type: 'single', 
    instruction: 'あなたの意見は...',
    subDialogue: '',
    firstDialogue: null,
    secondDialogue: '広告を出して知名度を上げるのが\nいいんじゃないかな…',
    hasPolygon: false,
  },
  {
    type: 'choices',
    instruction: '次のセリフにあてはまる\n英語を選んで言ってみましょう',
    subDialogue: '「広告を出すのはどうでしょうか。」',
    choices: [
      {
        isCorrect: true,
        isAnswered: false,
        choice: 'I think we shouldn’t place an advertisement.',
        explanations: [],
      },
      {
        isCorrect: false,
        isAnswered: false,
        choice: 'We have no choice but placing an advertisement.',
        explanations: [
          {
            type: '解説',
            description: 'We have no choice but placing\nan advertisement.'
          },
          {
            type: '発音のポイント',
            description: '声が小さいです。\n大きな声でしっかりと声に出して練習しましょう。'
          }
        ],
      },
      {
        isCorrect: false,
        isAnswered: false,
        choice: 'I think we shouldn’t place an advertisement.',
        explanations: [],
      }
    ]
  }
];

export default data;
