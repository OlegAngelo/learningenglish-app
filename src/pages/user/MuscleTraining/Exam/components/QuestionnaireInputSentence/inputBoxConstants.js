const inputBoxConstants = {
  default: {
    borderStyle: 'none',
    type: 'correct',
    response: 'Excellent!!',
    classPrefix: 'correct',
  },
  correct: {
    borderStyle: '2px solid #03DAC6',
    type: 'correct',
    response: 'Excellent!!',
    classPrefix: 'correct',
  },
  incorrect: {
    borderStyle: '2px solid #E34E42',
    type: 'incorrect',
    response: 'Keep it up!',
    classPrefix: 'incorrect',
  },
};

export default inputBoxConstants;
