const resultLogData = [
  // Listening
  {
    categoryTitle: '自分の意見を言う',
    categoryType: 'listening',
    results: [
      {
        id: 1,
        question: {
          order: 1,
          title: 'What are they discussing?',
          choice: [
            { item: "How to improve the sales of their product.", isCorrect: true },
            { item: "How to improve the employees work efficiency.", isCorrect: false },
            { item: "When to release their new product.", isCorrect: false },
          ],
          pointDescription: 'アジェンダによると、協議項目１は Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うことが読み取れる 。',
        },
      },
      {
        id: 2,
        question: {
          order: 2,
          title: 'How to improve the employees’ work efficiency?',
          choice: [
            { item: "How to improve the sales of their product.", isCorrect: false },
            { item: "How to improve the employees work efficiency.", isCorrect: true },
            { item: "When to release their new product.", isCorrect: false },
          ],
          pointDescription: 'アジェンダによると、協議項目１は Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うことが読み取れる 。',
        },
      },
      {
        id: 3,
        question: {
          order: 3,
          title: 'When to release their new product?',
          choice: [
            { item: "How to improve the sales of their product.", isCorrect: false },
            { item: "How to improve the employees work efficiency.", isCorrect: false },
            { item: "When to release their new product.", isCorrect: true },
          ],
          pointDescription: 'アジェンダによると、協議項目１は Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うことが読み取れる 。',
        },
      },
    ],
  },

  // Reading
  {
    categoryTitle: '議事録を確認する',
    categoryType: 'reading',
    results: [
      {
        id: 4,
        question: {
          order: 1,
          title: 'What are they discussing?',
          choice: [
            { item: "How to improve the sales of their product.", isCorrect: false },
            { item: "How to improve the employees work efficiency.", isCorrect: false },
            { item: "When to release their new product.", isCorrect: true },
          ],
          pointDescription: 'アジェンダによると、協議項目１は Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うことが読み取れる 。',
        },
      },
      {
        id: 5,
        question: {
          order: 2,
          title: 'How to improve the employees’ work efficiency?',
          choice: [
            { item: "How to improve the sales of their product.", isCorrect: false },
            { item: "How to improve the employees work efficiency.", isCorrect: true },
            { item: "When to release their new product.", isCorrect: false },
          ],
          pointDescription: 'アジェンダによると、協議項目１は Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うことが読み取れる 。',
        },
      },
      {
        id: 6,
        question: {
          order: 3,
          title: 'When to release their new product?',
          choice: [
            { item: "How to improve the sales of their product.", isCorrect: true },
            { item: "How to improve the employees work efficiency.", isCorrect: false },
            { item: "When to release their new product.", isCorrect: false },
          ],
          pointDescription: 'アジェンダによると、協議項目１は Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うことが読み取れる 。',
        },
      },
    ],
  },
];

export default resultLogData;
