import React, { Fragment, useEffect } from 'react';

import Blank from './components/Blank/Blank';
import { punctuationMark, word } from './computed';

import useInputWordLines from './useInputWordLines';

const InputWordLines = ({ sentence, hasUsedPunctuationMark = true }) => {
  const { autoFocusFirstLine } = useInputWordLines(sentence.split(' ').length);

  useEffect(() => {
    autoFocusFirstLine();
  }, []);

  return (
    <div className="flex flex-wrap">
      {sentence.split(' ').map((item, index) => (
        <Fragment>
          <Blank 
            word={word(item)} 
            key={index} 
            index={index} 
          >
            <span 
              className="mt-px-10 -ml-px-5 font-bold leading-loose"
              >{punctuationMark(item)}
            </span>
          </Blank>
        </Fragment>
      ))}
    </div>
  );
};

export default InputWordLines;
