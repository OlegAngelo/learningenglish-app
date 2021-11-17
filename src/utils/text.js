export const getSentence = (text) => {
  let sentenceBreaks = null;
  let typingFinal = '';
  const textSplit = text.split(' ');
  const answerIdentifiers = [
    /#★/,
    /☆\+/,
    /\+★/,
    /☆#/,
  ];

  const words = textSplit.map((w, id) => {
    const isWordAnswer = answerIdentifiers.some(regex => regex.test(w));

    if (isWordAnswer) {
      let tagIdentifier = null;
      const m = w.match(/[a-z-A-Z’'&]+|[,]/);
      sentenceBreaks = w.match(/[,-:;?!.]/);
      typingFinal = w.replace(/[,-:;?!.☆#★+]/g, '');

      /**
       * Conditions for words that have tags:
       * 1st: If tags are at the start && doesn't end with ☆#
       * 2nd: If tags are at the end && it doesn't start with #★
       * 3rd: If tags are at the middle of the word
      */
      if (w.substr(0, 2) === '#★' && !/☆#[,-:;?!.]?$/.test(w.slice(-3))) {
        const regex = /#★(.*)☆\+(.*)/;
        let tags = w.replace(regex, "$2").length;
        tagIdentifier = {
          tagTotal: tags,
          tagType: 'end',
          prevIndex: null
        };
      } else if (/☆#[,-:;?!.]?$/.test(w.slice(-3)) && w.substr(0, 2) !== '#★') {
        const regex = /(.*)\+★(.*)☆#/;
        let tags = w.replace(regex, "$1").length;
        tagIdentifier = {
          tagTotal: tags,
          tagType: 'start',
          prevIndex: null
        };
      } else if (/.*\+★.*☆\+.*/.test(w)) {
        const regex = /(.*)\+★(.*)☆\+(.*)/;
        let tags = w.replace(regex, "$2").length;
        let wordArray = w.split('');
        let prevIndex = null;

        for (let index = 0; index < wordArray.length; index++) {
          if (wordArray[index] === '+' && wordArray[index + 1] === '★') {
            prevIndex = index - 1;
            break;
          };
        }

        tagIdentifier = {
          tagTotal: tags,
          tagType: 'middle',
          prevIndex: prevIndex
        };
      }

      return {
        id,
        text: m[0],
        type: 'answer',
        selected: false,
        correct: false,
        displayed: ' ',
        sentenceBreaks: sentenceBreaks && sentenceBreaks[0],
        tagIdentifier: tagIdentifier,
        typingFinal: typingFinal,
      };
    }

    return { id, text: w, type: 'word' };
  });

  return words;
};

export const getAnswer = (text) => {
  const wordList = Array.from(new Set(text.split(' ')));
  return wordList.reduce((acc, cur) => {
    if (cur.substr(0, 2) == '#★') {
      const m = cur.match(/[a-z-A-Z]+/);
      return acc.concat(m[0]);
    }
    return acc;
  }, []);
};

export const getAnswerAndSentenceForWord = (text) => {
  let answer = '';
  let typingFinal = text;
  const textSplit = text.split(' ');
  const answerIdentifiers = [
    /#★/,
    /☆\+/,
    /\+★/,
    /☆#/,
  ];

  // If text has no tags
  if (!answerIdentifiers.some(regex => regex.test(text))) return { answer: text, words: [], typingFinal };

  // If word has tags (1 word or more)
  const words = textSplit.map((w, id) => {
    const isWordAnswer = answerIdentifiers.some(regex => regex.test(w));

    if (isWordAnswer) {
      let tagIdentifier = null;
      const m = w.match(/[a-z-A-Z’'&]+|[,]/);
      typingFinal = typingFinal.replace(/[,-:;?!.☆#★+]/g, '');

      /**
       * Conditions for words that have tags:
       * 1st: If tags are at the start && doesn't end with ☆#
       * 2nd: If tags are at the end && it doesn't start with #★
       * 3rd: If tags are at the middle of the word
       * 4th: If has prepostion and has no tags at start, middle and end
      */
      if (w.substr(0, 2) === '#★' && !/☆#[,-:;?!.]?$/.test(w.slice(-3))) {
        const regex = /#★(.*)☆\+(.*)/;
        let tags = w.replace(regex, "$2").length;
        answer = `${w.replace(regex, "$1")}${w.replace(regex, "$2")}`;

        tagIdentifier = {
          tagTotal: tags,
          tagType: 'end',
          prevIndex: null
        };
      } else if (/☆#[,-:;?!.]?$/.test(w.slice(-3)) && w.substr(0, 2) !== '#★') {
        const regex = /(.*)\+★(.*)☆#/;
        let tags = w.replace(regex, "$1").length;
        answer = `${w.replace(regex, "$1")}${w.replace(regex, "$2")}`;

        tagIdentifier = {
          tagTotal: tags,
          tagType: 'start',
          prevIndex: null
        };
      } else if (/.*\+★.*☆\+.*/.test(w)) {
        const regex = /(.*)\+★(.*)☆\+(.*)/;
        let tags = w.replace(regex, "$2").length;
        let wordArray = w.split('');
        let prevIndex = null;
        answer = `${w.replace(regex, "$1")}${w.replace(regex, "$2")}${w.replace(regex, "$3")}`;

        for (let index = 0; index < wordArray.length; index++) {
          if (wordArray[index] === '+' && wordArray[index + 1] === '★') {
            prevIndex = index - 1;
            break;
          };
        }

        tagIdentifier = {
          tagTotal: tags,
          tagType: 'middle',
          prevIndex: prevIndex
        };
      } else if (w.substr(0, 2) === '#★' && w.slice(-2) === '☆#') {
        const regex = /#★(.*)☆#/;
        answer = `${w.replace(regex, "$1")}`;
      }

      return {
        id,
        text: m[0],
        type: 'answer',
        tagIdentifier: tagIdentifier,
      };
    }

    return { id, text: w, type: 'word', tagIdentifier: null };
  });

  return { words, answer, typingFinal };
};

export const upperCaseFirst = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const setLocalStorageQuestion = (selectedType, index) => {
  let currentQuestion = { type: selectedType, index: index };
  localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
};

export const compareStrings = (string, string2, caseSensitive = false) => {
  return caseSensitive
    ? string === string2
    : string.toLowerCase() === string2.toString().toLowerCase();
};

export const getCorrectAnswer = (questionItem, questionType) => {
  const choiceCollectionKey = `training_${questionType}_choices`;
  let correctAnswer = '';

  questionItem[choiceCollectionKey].map((item) => {
    if (!item.is_correct) return;

    correctAnswer = item.jp_item;
  });

  return correctAnswer;
};

export const removeSpecialCharacters = (text) => {
  return text.replace(/#★(.*?)☆#/g, text.split('#★').pop().split('☆#')[0]);
};

export const includesCapitalLetters = (text, minAmount = 1) => {
  return text.match(/[A-Z]/g)?.length >= minAmount;
};

/**
 * Returns a text for tag questions
 * @param {string} word
 */
export const getUnderlinedTextValueForTags = (word, typing) => {
  const tagIdentifier = word.tagIdentifier;
  const typingArray = typing.split('');
  let value = null;

  if (tagIdentifier.tagType === 'start') {
    value = typingArray.map((w, i) => {
      return i <= tagIdentifier.tagTotal - 1
        ? <div>{w}</div>
        : <div className="border-b-2 w-4" style={{borderColor: '#0C5F8D'}}></div>;
    });
  }
  if (tagIdentifier.tagType === 'middle') {
    let counter = 1;
    value = typingArray.map((w, i) => {
      if (i <= tagIdentifier.prevIndex || i > tagIdentifier.prevIndex + tagIdentifier.tagTotal) return <div className="border-b-2 w-4" style={{borderColor: '#0C5F8D'}}></div>;

      counter++;
      return <div>{w}</div>;
    });
  }
  if (tagIdentifier.tagType === 'end') {
    value = typingArray.map((w, i) => {
      return i < typingArray.length - tagIdentifier.tagTotal
        ? <div className="border-b-2 w-4" style={{borderColor: '#0C5F8D'}}></div>
        : <div>{w}</div>;
    });
  }
  return value;
};

export const getTagValues = (tagIdentifier, typingArray) => {
  if (!tagIdentifier) return null;

  let tempTagData = [];
  if (tagIdentifier.tagType === 'start'){
    for (let index = 0; index < typingArray.length; index++) {
      if (index <= tagIdentifier.tagTotal - 1) {
        tempTagData.push({
          order: index,
          value: typingArray[index],
        });
      }
    }
  }
  if (tagIdentifier.tagType === 'end'){
    for (let index = 0; index < typingArray.length; index++) {
      if (index >= typingArray.length - tagIdentifier.tagTotal) {
        tempTagData.push({
          order: index,
          value: typingArray[index],
        });
      }
    }
  }
  if (tagIdentifier.tagType === 'middle'){
    for (let index = 0; index < typingArray.length; index++) {
      if (index > tagIdentifier.prevIndex && index <= tagIdentifier.prevIndex + tagIdentifier.tagTotal) {
        tempTagData.push({
          order: index,
          value: typingArray[index],
        });
      }
    }
  }
  return tempTagData;
};

export const getTagIdentifier = (wordTags) => {
  return wordTags.length > 0 && wordTags.filter(word => {
    return word.type === 'answer';
  })[0].tagIdentifier;
};

export const addIndentationPerParagraph = (text) => {
  let content = text.split('\n').filter( text => text !== "");
      
  content = content.map(text => {
    let trimmedText = text.trim();

    return `&nbsp;&nbsp;${trimmedText}`;
  }).join('\n\n');

  return content;
}

/**
 * Find string index and replace specified replacement string
 * @param {string} e.g. "Hello World"
 * @param {integer} e.g. 5
 * @param {string} e.g. !!
 * @param {boolean} if to overlap next character
 * @returns {string} if overlap is true return e.g. "Hello!!orld" else e.g. "Hello!!World"
 */
export const findStringIndexAndReplace = (text, index, replacement, overlap = false) => {
  return (
    text.substr(0, index) +
    replacement +
    text.substr(index + (overlap ? replacement.length : 1))
  );
};
