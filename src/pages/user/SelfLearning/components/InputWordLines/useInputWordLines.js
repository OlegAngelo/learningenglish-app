import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import {
  initializeMaxLines,
  setActiveLineIndex,
  updateLineValue,
  resetState,
} from '../../../../../redux/selfLearning/inputWordLines/slice';
import { startExercise } from '../../../../../redux/selfLearning/listening/exercise/slice';

const useInputWordLines = (maxLinesProp = null) => {
  const dispatch = useDispatch();
  const { activeLineIndex, areAllLinesFilled, maxLines, correctLines, lineValues } = useSelector(
    (state) => state.inputWordLines
  );
  const activeLineIndexRef = useRef(activeLineIndex);
  const strIndexRef = useRef(1);
  const maxLinesRef = useRef(null);

  useEffect(() => {
    maxLinesRef.current = maxLines;
  }, [maxLines]);

  // update active cursor position
  useEffect(() => {
    if (activeLineIndex < 0) return;
    activeLineIndexRef.current = activeLineIndex;
  }, [activeLineIndex]);

  useEffect(() => {
    if (maxLinesProp) dispatch(initializeMaxLines(maxLinesProp));

    return () => dispatch(resetState());
  }, []);

  const getElementByLineIndex = (lineIndex) => {
    const allElements = document.querySelectorAll('.input-field');
    return allElements[lineIndex];
  };

  const autoFocusFirstLine = () => {
    dispatch(startExercise());
    dispatch(setActiveLineIndex(0));
  };
  const onTapLineHandler = (index) => {
    strIndexRef.current = 1;
    dispatch(setActiveLineIndex(index));
  };

  const forwardActiveLineIndex = () => {
    const newLineIndex = activeLineIndexRef.current + 1;
    if (newLineIndex > maxLinesRef.current - 1) return;

    dispatch(setActiveLineIndex(newLineIndex));
  };

  const backwardActiveLineIndex = () => {
    const newLineIndex = activeLineIndexRef.current - 1;
    if (newLineIndex < 0) return;

    dispatch(setActiveLineIndex(newLineIndex));
  };

  const decodeHTMLEntities = (text) => {
    const entities = [
      ['amp', '&'],
    ];

    for (let i = 0, max = entities.length; i < max; ++i) {
      text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
    }

    return text;
  }

  const onChangeLineValue = (key) => {
    const index = activeLineIndexRef.current;
    const el = getElementByLineIndex(index);
    const currentValue = decodeHTMLEntities(el.innerHTML);
    const valueExceedToMax = currentValue.length > correctLines[index].length - 1;
    const strFocusIndex = currentValue.length;

    if (['special', 'normal', 'shift'].includes(key)) return;
    if (key === 'backspace') {
      if (strFocusIndex) {
        const newValue =
          currentValue.slice(0, strFocusIndex - 1) + currentValue.slice(strFocusIndex);
        el.innerHTML = newValue;
        dispatch(updateLineValue({ index: index, value: newValue }));
        return;
      } else return;
    } else if (valueExceedToMax) return;

    const newValue = [
      currentValue.slice(0, strFocusIndex),
      key,
      currentValue.slice(strFocusIndex),
    ].join('');
    el.innerHTML = newValue;
    dispatch(updateLineValue({ index: index, value: newValue }));

    // if reaches to maximum length of word
    if (newValue.length < correctLines[index].length) return;
    else forwardActiveLineIndex();
  };

  const getAnswers = () => {
    const allElements = document.querySelectorAll('.input-field');
    let answers = [];
    allElements.forEach((element) => {
      answers.push(element.innerHTML);
    });

    return answers;
  };

  return {
    lineValues,
    areAllLinesFilled,
    activeLineIndex,
    autoFocusFirstLine,
    forwardActiveLineIndex,
    backwardActiveLineIndex,
    onTapLineHandler,
    onChangeLineValue,
    getAnswers,
  };
};

export default useInputWordLines;
