import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import useInputWordLines from '../../useInputWordLines';

import style from './Blank.module.css';

const Blank = ({ word, index, children }) => {
  const { onTapLineHandler } = useInputWordLines();
  const { activeLineIndex } = useSelector(state => state.inputWordLines);

  const getElementAndWidth = (word, useDefault) => {
    const span = document.createElement('span');
    span.id = 'tempBlankDiv';
    span.innerHTML = useDefault
      ? word
      : word.split('').map(() => 'w').join('');
    span.classList.add('inline-block');
    span.classList.add('tracking-wide');
    span.classList.add('text-16');
    document.body.appendChild(span);
    return {
      width: span.offsetWidth,
      element: span,
    };
  };

  const width = (words) => {
    const useDefault = false;
    const { width, element } = getElementAndWidth(words, useDefault);
    document.body.removeChild(element);
    return width;
  };

  const getFocusWidth = () => {
    const useDefault = true;
    const  el = document.querySelector(`#blank-${index}`);
    const contentWord = el ? el.innerHTML : '';
    const { width, element } = getElementAndWidth(contentWord, useDefault);
    document.body.removeChild(element);
    return width;
  };

  const isActive = () => {
    return activeLineIndex === index;
  };

  return (
    <Fragment>
      <div className="relative ml-px-5 flex">
        <div
          id={`blank-${index}`}
          className={`input-field inline-block pt-2 text-16 tracking-wide ${!isActive()&& 'text-center'} ${style.inputField} ${isActive() ? style.selected : style.underline}`}
          style={{ width: `${width(word)}px`, height: `34px`, 'margin-right': '7px' }}
          onClick={() => onTapLineHandler(index)}
          key={index}
          inputMode="none"
        ></div>
        <div id={`focus-${index}`} className={`absolute top-3 h-px-16 ${isActive() ? style.focus : ''}`} style={{ left: `${getFocusWidth()}px`}}></div>
        {children}
      </div>
    </Fragment>
  );
};

export default Blank;
