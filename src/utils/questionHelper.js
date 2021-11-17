const questionHelper = {
  shuffle(array) {
    var count = array.length;
    var tempQuestion;
    var index;

    // While there remain elements to shuffle…
    while (count) {
      // Pick a remaining element…
      index = Math.floor(Math.random() * count--);

      // And swap it with the current element.
      tempQuestion = array[count];
      array[count] = array[index];
      array[index] = tempQuestion;
    }

    return array;
  },
  categorizeQuestions(questions, categories) {
    var length = categories.length;
    var index = 0;

    return questions.map((question) => {
      return {
        category: categories[index++ % length],
        question: question,
      };
    });
  },
  generateQuestionResult(category, questionId, result, accuracy, hint = '') {
    const typingCategories = [
      'audio-typing',
      'sentence',
      'spelling',
      'word-typing',
    ];

    const selectionCategories = [
      'reading',
      'listening',
      'word-selection',
      'audio-word-selection',
      'word-translation-selection',
      'english-selection',
      'voice-listening',
      'phrase-english-selection',
      'phrase-voice-listening',
      'vacancy-filling-problem',
    ];

    const voiceCategories = [
      'sentence-reading',
      'english-speech-recognition',
      'instant-utterance',
      'shadowing',
      'overlapping',
    ];

    if (
      ![
        ...typingCategories,
        ...selectionCategories,
        ...voiceCategories,
      ].includes(category)
    ) {
      return console.error('Invalid argument: category');
    }

    const questionResult = {
      id: questionId,
      type: category,
      choice_id: selectionCategories.includes(category) ? result : null,
      input_spelling: typingCategories.includes(category) ? result : null,
      voice_text: voiceCategories.includes(category) ? result : null,
      voice_accuracy_rate: voiceCategories.includes(category) ? accuracy : null,
      is_used_hint: !!hint?.length,
    };

    return questionResult;
  },
  generateVoiceQuestionResult(data) {
    const {
      category,
      questionId,
      transcription,
      accuracy,
      result,
      response,
      hint,
      timerProps,
    } = data;

    const voiceCategories = [
      'sentence-reading',
      'english-speech-recognition',
      'instant-utterance',
      'shadowing',
      'overlapping',
    ];

    if (![...voiceCategories].includes(category)) {
      return console.error('Invalid argument: category');
    }

    const questionResult = {
      id: questionId,
      type: category,
      choice_id: null,
      input_spelling: null,
      voice_text: voiceCategories.includes(category) ? transcription : null,
      voice_accuracy_rate: voiceCategories.includes(category) ? accuracy : null,
      is_used_hint: hint ? true : false,
      is_correct: result == 'correct',
      is_skipped: false,
      answer_evaluation: response,
      answer_time: timerProps.seconds,
    };
    return questionResult;
  },
  isIncorrectChoice(text, selected, isCorrect) {
    return selected === text && !isCorrect;
  },
  getCorrectAnswer(questionItem, learningType, category = null) {
    const choiceCollectionKey = `choices`;
    const englishAnswerCategories = [
      'audio-typing',
      'word-typing',
      'spelling',
      'english-selection',
      'voice-listening',
      'phrase-english-selection',
      'vacancy-filling-problem',
      'instant-utterance',
    ];
    const phraseEnglishTranslation = [
      'phrase-english-selection',
    ];
    const sentenceCategories = ['instant-composition', 'instant-utterance'];
    let correctAnswer = '';

    if (sentenceCategories.includes(category)) {
      return questionHelper.formatQuestionSentence(questionItem.title);
    }

    questionItem[choiceCollectionKey].map((item) => {
      if (item.is_correct) {
        correctAnswer = item.jp_item;
        if (englishAnswerCategories.includes(category)) {
          correctAnswer = (learningType === 'word')
            ? questionHelper.getAnswerByWordCount(questionItem, learningType)
            : phraseEnglishTranslation.includes(category)
              ? item.en_item
              : item.blank_item
        }
      }
    });

    return correctAnswer;
  },
  getResponseText(percentage, seconds) {
    if (percentage >= 75) return 'Excellent!!';
    else if (percentage >= 25) return 'Great!';
    else if (percentage >= 1 || seconds == 1) return 'Good!';
    else return 'Failed...';
  },
  getSpeechAnalysisResponse(percentage) {
    if (parseFloat(percentage) >= parseFloat(80)) return 'Excellent!!';
    else if (parseFloat(percentage) >= parseFloat(60)) return 'Great!';
    else if (parseFloat(percentage) >= parseFloat(40)) return 'Good!';
    else return 'Keep it up!';
  },
  getResponseColor(response) {
    if (response === 'Excellent!!') {
      return '#03DAC6';
    } else if (response === 'Great!') {
      return '#3DBBAF';
    } else if (response === 'Good!') {
      return '#098DD8';
    } else if (response === 'Failed...' || response === 'Keep it up!') {
      return '#E34E42';
    }
  },
  setLocalStorageQuestion(selectedType, index) {
    let currentQuestion = { type: selectedType, index: index };
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
    localStorage.removeItem('answers');
  },
  setLocalStorageTotalProficiency(totalProficiency) {
    localStorage.setItem(
      'initialTotalProficiency',
      JSON.stringify(totalProficiency)
    );
  },
  deleteLocalStorage() {
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('answers');
  },
  updateLocalStorageCurrentQuestion() {
    let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));
    localStorage.setItem(
      'currentQuestion',
      JSON.stringify({
        ...currentQuestion,
        index: currentQuestion?.index + 1,
      })
    );
  },
  formatQuestionSentence(sentence) {
    // clean question sentence from answer indicatiors "#★consider☆#"
    return sentence.replace(/★|☆|#|"/g, '');
  },
  getWordFromSentence(sentence) {
    let typingFinal = sentence;
    const textSplit = sentence.split(' ');
    const answerIdentifiers = [
      /#★/,
      /☆\+/,
      /\+★/,
      /☆#/,
    ];
  
    // If text has no tags
    if (!answerIdentifiers.some(regex => regex.test(sentence))) return typingFinal;

    // If word has tags (1 word or more)
    textSplit.map((w, id) => {
      // isWordAnswer check for word that has #★, ☆#, etc.
      const isWordAnswer = answerIdentifiers.some(regex => regex.test(w));
  
      if (isWordAnswer) {
        typingFinal = w.replace(/[,-:;?!.☆#★+]/g, '');
      }
    });

    return typingFinal;
  },
  hintChecker(isAudioEnded, response) {
    if (isAudioEnded && !response) {
      return true;
    } else if (!isAudioEnded || response) {
      return false;
    }
  },
  calculateTimerPercentage(timerHidden, currentTime, maxTime) {
    return timerHidden ? 0 : ((currentTime - 1) / (maxTime - 1)) * 100;
  },
  getAnswerByWordCount(questionItem) { // For words learning type only
    const wordsCount = questionItem.title.split(' ').length;
    return wordsCount > 1
      ? questionHelper.getWordFromSentence(questionItem.typing)
      : questionItem.choices.filter((item) => item.is_correct)[0].en_item;
  },
  getEvaluationTimesUp(category) {
    const keepItUp = ['instant-utterance'];
    return keepItUp.includes(category) ? 'Keep it up!' : 'Failed...';
  },
};

export default questionHelper;
