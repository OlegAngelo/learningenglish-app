import React from 'react';

import CorrectWordAnswer from './components/CorrectWordAnswer';
import IncorrectWordAnswer from './components/IncorrectWordAnswer';
import CorrectPhraseAnswer from '../../../../../../../../shared/TextArea/components/CorrectAnswer.js';
import IncorrectPhraseAnswer from '../../../../../../../../shared/TextArea/components/IncorrectAnswer.js';
import questionHelper from '../../../../../../../../utils/questionHelper';

const ResultTextBox = ({ questionType, result, sentence, word, incorrectIndices, textAreaPadding, response, category }) => {
  if (questionType == 'phrase'){
    if (result === 'correct'){
      return (
        <CorrectPhraseAnswer
          sentence={sentence}
          incorrectIndices={incorrectIndices}
          textAreaPadding={textAreaPadding}
          borderColor={questionHelper.getResponseColor(response)}
        />
      );
    } else {
      return (
        <IncorrectPhraseAnswer
          sentence={sentence}
          incorrectIndices={category == `sentence-reading` ? '' : incorrectIndices}
          textAreaPadding={textAreaPadding}
          borderColor={questionHelper.getResponseColor(response)}
        />
      );
    }
  }
  else{
    if (result === 'correct') {
      return <CorrectWordAnswer word={word} textAreaPadding={textAreaPadding} />
    } else {
      return <IncorrectWordAnswer word={word} textAreaPadding={textAreaPadding} />
    }
  }
}

export default ResultTextBox;
