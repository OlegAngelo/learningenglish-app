import React from 'react';

import { excludeNonCharacterSymbols } from '../../../utils/input';
import TextareaAutoResize from 'react-autosize-textarea';

import styles from '../TextArea.module.css';

const TextAreaField = ({
  sentence,
  response,
  correct,
  setSentence,
  handleSentenceSubmit,
  toggleTextArea,
  onEnterPress,
  className,
  styling,
  formStyle,
}) => {
  return (
    <div
      className={`bg-basic-400 ${className} ${styling} relative shadow-btn-choice text-basic-100 rounded ${styles.boxSize}`}
      style={{
        border: (response === correct) ? '2px solid #03DAC6' : ' ',
        minWidth: '260px',
      }}
    >
      <form
        className={`${styles.boxSize} ${formStyle} grid place-items-center`}
        onSubmit={handleSentenceSubmit}
      >
        <TextareaAutoResize
          autoFocus={(response === '')}
          rows={1}
          maxRows={2}
          value={sentence}
          spellCheck={false}
          className={`${styles.textAreaLineBreak} w-full inline-block focus:outline-none resize-none text-left font-hiragino font-bold text-20`}
          onChange={(response === '') ? ({ target: { value } }) => setSentence(excludeNonCharacterSymbols(value)) : null}
          onKeyDown={(response === '') ? onEnterPress : null}
          readOnly={toggleTextArea}
        />
      </form>
    </div>
  );
};

TextAreaField.defaultProps = {
  formStyle: 'p-4'
};

export default TextAreaField;
