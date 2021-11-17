/**
 * Remove comma, any punctuation marks, or colon in a word.
 * @param {string} e.g. Celebrate!
 * @param {boolean} conditional flag
 * @returns {string} e.g. Celebrate
 */
export const pureWord = (str = '', flag = true) => {
  if (!flag) return str;
  return str.replace(/[.,:!?]/g, '');
};

/**
 * Get user inputs and evaluations
 * @param {object} question
 * @param {string} user inputted answer from soft-keyboard
 * @returns {object} json ready for api submission (by words)
 */
export const getFinalWordsAnswer = (question, answers) => {
  const alternativeAnswersByLines = getAlternativeAnswersByLine(question, true);
  let data = [];
  question?.sentence.split(' ').forEach((str, index) => {
    data = [
      ...data,
      {
        phrase_id: question.id,
        word: str,
        user_word_input: answers[index],
        is_correct_word: alternativeAnswersByLines[index].includes(
          alternativeAnswersByLines[index][0].includes(',') ? 
            (answers[index] + ',').toLowerCase() : 
            answers[index].toLowerCase()
        ),
      },
    ];
  });

  return data;
};

/**
 * Get user inputs and evaluations
 * @param {object} question
 * @param {string} user inputted answer from soft-keyboard
 * @returns {object} json ready for api submission (by phrase)
 */
export const getFinalPhraseAnswer = (question, answers, evaluations) => {
  const { userAnswer, feedbackHTML, feedbackHTMLChangeColor } = getAnswerAndHTMLFeedback(
    question,
    answers,
    question?.hasUsedPunctuationMark
  );

  const isCorrect = evaluations
    ? evaluations?.find((word) => !word.is_correct_word) === undefined
    : false;

  return {
    phrase_id: question.id,
    set_id: question.set_id,
    user_dictation_input: userAnswer,
    is_correct_dictation: isCorrect,
    sentence: question?.sentence,
    sentence_jp: question?.sentence_jp,
    feedback: isCorrect ? 'correct' : 'incorrect',
    feedbackHTML,
    feedbackHTMLChangeColor,
  };
};

/**
 * Get the possible maximum length of each word.
 * e.g. (sentence) - The email has deactivated awhile ago.
 *  (alternative 1) - The e-mail has deactivated while ago.
 *  (alternative 2) - The email has de-activated while ago.
 * @return {string} e.g. The e-mail has de-activated awhile ago.
 */
export const maximumSentence = (question) => {
  const alternativeAnswersByLines = getAlternativeAnswersByLine(question);
  let sentence = '';

  alternativeAnswersByLines.map((line) => {
    sentence = sentence + ' ' + line.sort((a, b) => b.length - a.length)[0];
  });

  return sentence.trim();
};

/**
 * Get the possible correct words in each line.
 * @param {object} question data
 * @return {nested array} each child array has dynamic size depending on possible correct word.
 */
export const getAlternativeAnswersByLine = (question, pureWordAtLast = false) => {
  const correctAnswers = getAlternativeAnswers(
    question?.correct_answers,
    question?.sentence.toLowerCase()
  );

  const correctAnswer = correctAnswers[0]?.split(' ');
  const correctAnswerByWordsArr = [];
  for (let index = 0; index < correctAnswer.length; index++) {
    const whenLastWord = index === correctAnswer.length - 1 && pureWordAtLast;

    correctAnswerByWordsArr[index] = [
      pureWord(correctAnswers[0]?.split(' ')[index]?.toLowerCase(), whenLastWord)?.trim() ?? '',
      pureWord(correctAnswers[1]?.split(' ')[index]?.toLowerCase(), whenLastWord)?.trim() ?? '',
      pureWord(correctAnswers[2]?.split(' ')[index]?.toLowerCase(), whenLastWord)?.trim() ?? '',
      pureWord(correctAnswers[3]?.split(' ')[index]?.toLowerCase(), whenLastWord)?.trim() ?? '',
    ];
  }

  return correctAnswerByWordsArr.map((data) => {
    return data.filter((word) => word != '');
  });
};

/**
 * Get the 4 possible correct answers
 * @param {array} 3 alternative answers
 * @param {string} original answer
 * @returns {array} merged answers
 */
export const getAlternativeAnswers = (data, sentence) => {
  let answerArr = JSON.parse(data);
  answerArr = answerArr.map((data, index) => {
    return data.substring(index === 0 ? 1 : 2, data.length - 1);
  });
  return [sentence, ...answerArr];
};

/**
 * Get the output if there is two punctuation in a word
 * @param {string} question data
 * @param {number} index data index
 * @returns {object} (1) regexOutput: either empty string or punctuation.
 * (2) wordMorePunctuation: If word punctuation is more than one, remove the punctuation and
 * return the word in lowercase form.
 */
export const displayPunctuationMark = (wordIndex, question) => {
  if (question?.sentence.split(' ')[wordIndex].replace(/[^.]/g, '').length > 1) {
    return {
      regexOutput: '',
      wordMorePunctuation: question?.sentence.split(' ')[wordIndex].replace(/[.,:!?]/g, "").toLowerCase()
    }; 
  } else {
    return {
      regexOutput: question?.sentence.split(' ')[wordIndex].match(/[.,:!?]/g) ?? ''
    };
  }
};

/**
 * Get the concatenated user's answer and feedback with tags
 * @param {object} question data
 * @param {string} user inputted answer from soft-keyboard
 * @param {boolean} include punctuation mark at the end or not?
 * @returns {object} (1) user's concatenated answer from soft-keyboard
 *   (2) user's answer with html tag (red or black color depending if its correct).
 */
export const getAnswerAndHTMLFeedback = (question, answers, hasUsedPunctuationMark) => {
  const alternativeAnswersByLines = getAlternativeAnswersByLine(question, true);
  
  let feedbackHTML = '';
  let userAnswer = '';
  let feedbackHTMLChangeColor = '';

  // span tags in each word if incorrect
  answers.map((word, index) => {
    userAnswer = word ? `${userAnswer} ${word.trim()}` : userAnswer;
    const content = !alternativeAnswersByLines[index].includes(
      alternativeAnswersByLines[index][0].includes(',') ? 
        (answers[index] + ',').toLowerCase() : 
        word.toLowerCase())
      ? `<span class="text-progress-red">${word}</span>`
      : word;

    // Compiling Text and adding punctuation marks
    userAnswer += displayPunctuationMark(index, question).regexOutput;
    feedbackHTML = `${feedbackHTML} ${content}${displayPunctuationMark(index, question).regexOutput}`;
  });

  // display correct answer if no answer has given
  if (pureWord(userAnswer).trim() === '') {
    feedbackHTML = `<span class="text-progress-red">${question?.sentence}</span>`;
    feedbackHTMLChangeColor = `<span>${question?.sentence}</span>`;
  } else {
    feedbackHTMLChangeColor = `<span>${userAnswer}</span>`;
  }

  return {
    userAnswer,
    feedbackHTML,
    feedbackHTMLChangeColor,
  };
};
