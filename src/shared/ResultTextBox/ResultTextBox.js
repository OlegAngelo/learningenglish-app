import React from 'react';

import CorrectWordAnswer from './components/CorrectWordAnswer';
import IncorrectWordAnswer from './components/IncorrectWordAnswer';
import CorrectPhraseAnswer from '../TextArea/components/CorrectAnswer';
import IncorrectPhraseAnswer from '../TextArea/components/IncorrectAnswer';
import questionHelper from '../../utils/questionHelper';

const ResultTextBox = ({ questionType, result, sentence, word, incorrectIndices=[], textAreaPadding, response }) => {

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
          incorrectIndices={incorrectIndices}
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
