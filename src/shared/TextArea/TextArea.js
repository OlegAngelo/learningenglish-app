import React from 'react';

import CorrectAnswer from './components/CorrectAnswer';
import IncorrectAnswer from './components/IncorrectAnswer';

const TextArea = ({
  sentence,
  response,
  correct,
  incorrect,
  className,
  setSentence,
  handleSentenceSubmit,
  toggleTextArea,
  onEnterPress,
  incorrectIndices,
  textAreaPadding,
  formStyle,
}) => {
  if (response === incorrect) {
    return <IncorrectAnswer sentence={sentence} incorrectIndices={incorrectIndices} textAreaPadding={textAreaPadding} />
  } else {
    return <CorrectAnswer sentence={sentence} incorrectIndices={incorrectIndices} textAreaPadding={textAreaPadding} />
  }
}

export default TextArea;
