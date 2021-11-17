import React, { useEffect, useState, Fragment } from 'react';

import BackspaceIcon from '../icons/BackspaceIcon';
import ShiftIcon from '../icons/ShiftIcon';
import KeyboardArrowBack from '../icons/KeyboardArrowBack';
import KeyboardArrowForward from '../icons/KeyboardArrowForward';
import keyLayoutConfig from '../../config/keyLayout.json';
import styles from './SoftKeyboard.module.css';
import {
  cleanUpKeyData,
  updateBlanksFilled,
  updateKeyboardToLowercase,
  highlightBtn,
  keyboardToSpecial,
  keyboardToNormal,
  keyboardShift,
  keyboardEnter,
  keyboardSpace,
  keyboardLeftArrow,
  keyboardRightArrow,
  keyboardDefault
} from './computed';

const SoftKeyboard = ({
  setAnswer,
  answer,
  wordLength,
  submitHandler,
  setAnswerWithNoTag,
  hasTagIdentifier,
  categories,
  hasArrowKeys = false,
  canSubmit,
  onPressHandler = () => {},
  leftArrowOnClick = () => {},
  rightArrowOnClick = () => {},
  removeKeys = [],
  firstLetterCapital = false,
}) => {
  const [keyboard, setKeyboard] = useState(null);
  const [keyToggle, setKeyToggle] = useState('normal');
  const [shiftToggle, setShiftToggle] = useState(false);
  const [blanksFilled, setBlanksFilled] = useState(false);
  const [isFirstLetterCapital, setIsFirstLetterCapital] = useState(firstLetterCapital);
  const keyLayout = keyToggle === 'normal' ? keyLayoutConfig.normal : keyLayoutConfig.special;

  const inputHandler = (key) => {
    updateBlanksFilled(
      answer, 
      wordLength, 
      categories, 
      canSubmit, 
      setBlanksFilled
    );
    if ((wordLength != 0 && answer.length <= wordLength - 1) || categories === 'instant-composition') {
      answer += key;
      setAnswer(answer);
      onPressHandler(key);
      if (hasTagIdentifier) setAnswerWithNoTag(answer);
    }
    updateKeyboardToLowercase(
      isFirstLetterCapital, 
      setShiftToggle, 
      setIsFirstLetterCapital
    );
  };

  const createKeys = () => {
    const keyboardKeys = [];
    const keys = cleanUpKeyData(removeKeys, keyLayout);

    keys.map((key, index)=> {
      let keyElement = '';

      switch (key) {
        case "123":
          keyElement = keyboardToSpecial(setKeyToggle, onPressHandler, key);
          break;
        case "abc":
          keyElement = keyboardToNormal(setKeyToggle, onPressHandler, key);
          break;
        case "backspace":
          keyElement = <button
            type="button"
            className={`
              ${styles.keyboard__key}
              ${styles.keyboard__key__wide}
            `}
            onClick= {() => {
              answer = answer.slice(0, -1);
              if (canSubmit === undefined) setBlanksFilled(false);
              setAnswer(answer);
              onPressHandler('backspace');
              if (hasTagIdentifier) setAnswerWithNoTag(answer);
            }}
          ><BackspaceIcon /></button>;
          break;
        case "shift":
          keyElement = keyboardShift(setShiftToggle, shiftToggle, onPressHandler, ShiftIcon);
          break;
        case "enter":
          keyElement = keyboardEnter(key);
          break;
        case "space":
          keyElement = keyboardSpace(hasArrowKeys, keyToggle, inputHandler, key);
          break;
        case "解答する":
          keyElement = (
            <button
              type="button"
              className={`
                text-14
                ${highlightBtn(blanksFilled, categories) ? styles.enter_key : ''}
                ${styles.keyboard__key}
                ${styles.keyboard__key__submit}
              `}
              style={{ width: '31%' }}
              onClick={() => {
                submitHandler(answer);
              }}
              disabled={canSubmit !== undefined && !canSubmit}
            >{key}</button>
          );
          break;
        case "leftArrow":
          if (!hasArrowKeys) return;
          keyElement = keyboardLeftArrow(leftArrowOnClick, keys, KeyboardArrowBack);
          break;
        case "rightArrow":
          if (!hasArrowKeys) return;
          keyElement = keyboardRightArrow(rightArrowOnClick, keys, KeyboardArrowForward);
          break;
        default:
          let fontSize = shiftToggle ? 'text-18' : 'text-16'
          key = shiftToggle ? key.toUpperCase(): key.toLowerCase();
          keyElement = keyboardDefault(fontSize, inputHandler, key);
          break;
      }
      keyboardKeys.push(keyElement);

      if (keyLayoutConfig.insertLineBreakAfterKeys.includes(key)) {
        keyboardKeys.push(<br />);
      }

      return key;
    });

    return keyboardKeys;
  };

  useEffect(() => {
    if (canSubmit !== undefined) setBlanksFilled(canSubmit);
  }, [canSubmit]);

  useEffect(() => {
    if (isFirstLetterCapital) {
      setShiftToggle(true);
    }
  }, []);

  useEffect(() => {
    setKeyboard(createKeys());
  }, [keyToggle, shiftToggle, blanksFilled]);

  return(
    <div className={styles.keyboard}>
      <div className={styles.keyboard__keys}>
        { keyboard && keyboard.map((key, index) => {
          return (<Fragment key={index}>{key}</Fragment>);
        })}
      </div>
    </div>
  );
};

export default SoftKeyboard;
