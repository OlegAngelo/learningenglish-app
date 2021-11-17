import { useState } from 'react';

export const useHint = () => {
  const [hint, setHint] = useState('');
  const [hintCounter, setHintCounter] = useState(1);
  const sentenceCategories = ['instant-composition', 'instant-utterance'];
  const categoriesWithFullHints = ['instant-utterance'];

  const hintQuestionHandler = (correctAnswer, category) => {
    correctAnswer = correctAnswer.replace(/[☆#★+]/g, '');
    // hint to show each word in a sentence
    if (sentenceCategories.includes(category)) {
      const correctAnswerArray = correctAnswer.split(' ');
      const maxHints = categoriesWithFullHints.includes(category) ? correctAnswerArray.length : correctAnswerArray.length - 1;

      if (hintCounter <= maxHints) {
        setHint(correctAnswerArray.slice(0, hintCounter));
        setHintCounter(hintCounter + 1);
      }
      return;
    }

    // hint to show each letter in a word
    if (hintCounter < correctAnswer.length) {
      setHint(correctAnswer.slice(0, hintCounter));
      setHintCounter(hintCounter + 1);
    }
  };

  const clearHint = () => {
    setHint('');
    setHintCounter(1);
  };

  return {
    hint,
    clearHint,
    hintQuestionHandler,
  };
};
