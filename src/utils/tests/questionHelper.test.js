import questionHelper from '../questionHelper';

describe('QuestionHelper Util', () => {
  describe('isIncorrectChoice()', () => {
    it('should return true value if incorrect', () => {
      let choices = [
        { choiceText: 'think', isCorrect: false },
        { choiceText: 'feel', isCorrect: false },
        { choiceText: 'contract', isCorrect: true },
        { choiceText: 'say', isCorrect: false },
      ];
      let selected = choices[1].choiceText;
      let text = choices[1].choiceText

      const func = questionHelper.isIncorrectChoice(text, selected, choices[1].isCorrect);

      expect(func).toBeTruthy()
    });
  });
});
