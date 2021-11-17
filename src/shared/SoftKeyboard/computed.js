import styles from './SoftKeyboard.module.css';

/**
 * Remove keys that should not be displayed on the keyboard.
 * @param {Array} removedKeys array of keys that should not be displayed in the keyboard.
 * @param {Array} keyboardData array of keys characters either normal or special keys.
 */
export const cleanUpKeyData = (removedKeys, keyboardData) => {
  return keyboardData.filter( keys => !removedKeys.includes(keys));
};

/**
 * Highlight the 解答する button if condition is true.
 * @param {Boolean} blanksFilled return true if all blanks are filled
 * @param {Array} categories return true if not equal to instant composition or false if equal.
 * @returns {Boolean} return true if condition is met.
 */
export const highlightBtn = (blanksFilled, categories) => {
  return blanksFilled && categories !== 'instant-composition';
};

/**
 * Set blanksFilled state to true if a certain condition is met.
 * @param {String} answer the string inputted in the blank filled.
 * @param {Number} wordLength length of the sentence including the spaces and punctuation marks.
 * @param {String} categories the value either a self-learning or instant-composition.
 * @param {Boolean} canSubmit if all blank fields have input data it is equal to true, else it is false.
 * @param {Function} setBlanksFilled a hook that will set blanksFilled either true or false.
 */
export const updateBlanksFilled = (answer, wordLength, categories, canSubmit, setBlanksFilled) => {
  if (answer.length === wordLength - 1 && categories !== 'instant-composition') {
    if (canSubmit === undefined) setBlanksFilled(true);
  }
};

/**
 * Will update the text displayed in the blanks fields if certain condition is met.
 * @param {Number} wordLength length of the sentence including the spaces and punctuation marks.
 * @param {String} answer the string inputted in the blank fields.
 * @param {String} categories the value either a self-learning or instant-composition.
 * @param {String} key the character tapped by user in the keyboard.
 * @param {Function} setAnswer a hook that will update the state of answer.
 * @param {Function} onPressHandler an event handler that will update the blanks field if there's a change in line value.
 * @param {Boolean} hasTagIdentifier true if there is a tag identifier, else, false.
 * @param {Function} setAnswerWithNoTag a hook that record the answer with no tag.
 */
export const updateTextInBlank = (wordLength, answer, categories, key, setAnswer, onPressHandler, hasTagIdentifier, setAnswerWithNoTag) => {
  if ((wordLength != 0 && answer.length <= wordLength - 1) || categories === 'instant-composition') {
    answer += key;
    setAnswer(answer);
    onPressHandler(key);
    if (hasTagIdentifier) setAnswerWithNoTag(answer);
  }
};

/**
 * At first keyboard are all uppercase, once user tap the first word and it is an uppercase letter
 * this function will change the keyboard to all lowercase.
 * @param {Boolean} isFirstLetterCapital true if first letter is capital, else, false.
 * @param {Function} setShiftToggle update the shiftToggle state, uppercase if true, lowercase if false.
 * @param {Boolean} setIsFirstLetterCapital update the state of isFirstLetterCapital.
 */
export const updateKeyboardToLowercase = (isFirstLetterCapital, setShiftToggle, setIsFirstLetterCapital) => {
  if (isFirstLetterCapital) {
    setShiftToggle(false);
    setIsFirstLetterCapital(false);
  }
};

/**
 * If user tap 123 key, keyboard will display special keyboard.
 * @param {Function} setKeyToggle is a hook that change the keyboard type to special.
 * @param {onPressHandler} onPressHandler This will allow to display special key tap by user.
 * @param {String} key the keyboard character tap by user.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardToSpecial = (setKeyToggle, onPressHandler, key) => {
  return <button
    type="button"
    className={`
      ${styles.keyboard__key}
    `}
    onClick={() => {
      setKeyToggle('special');
      onPressHandler('special');
    }}
    style={{ width:'13%'}}
  >{key}</button>;
};

/**
 * If user tap abc key, keyboard will display normal keyboard.
 * @param {Function} setKeyToggle ss a hook that change the keyboard type to normal.
 * @param {Function}} onPressHandler This will allow to display normal key tap by user.
 * @param {String} key the keyboard character tap by user.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardToNormal = (setKeyToggle, onPressHandler, key) => {
  return <button
    type="button"
    className={`
      ${styles.keyboard__key}
      ${styles.keyboard__key__wide}
    `}
    onClick={() => {
      setKeyToggle('normal');
      onPressHandler('normal');
    }}
  >{key}</button>;
};

/**
 * If user tap backspace key or x icon.
 * @param {String} answer the string inputted by user in the blank fields.
 * @param {Boolean} canSubmit if all blank fields have input data it is equal to true, else it is false.
 * @param {Function} setBlanksFilled a hook that will set blanksFilled either true or false.
 * @param {Function} setAnswer a hook that will update the state of answer.
 * @param {Function} onPressHandler This will allow to display normal key tap by user.
 * @param {Boolean} hasTagIdentifier true if there is a tag identifier, else, false.
 * @param {Function} setAnswerWithNoTag a hook that record the answer with no tag.
 * @param {HTMLOrSVGElement} BackspaceIcon backspace icon or x component.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardBackspace = (
  answer, 
  canSubmit, 
  setBlanksFilled, 
  setAnswer, 
  onPressHandler, 
  hasTagIdentifier, 
  setAnswerWithNoTag,
  BackspaceIcon
) => {
  return <button
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
};

/**
 * If user tap shift icon this function will convert keyboard to lowercase or uppercase.
 * @param {Function} setShiftToggle update the shiftToggle state, uppercase if true, lowercase if false.
 * @param {Boolean} shiftToggle boolean container for uppercase or lowercase keyboard keys.
 * @param {Function} onPressHandler an event handler that will update the blanks field if there's a change in line value.
 * @param {HTMLOrSVGElement} ShiftIcon shift icon component.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardShift = (setShiftToggle, shiftToggle, onPressHandler, ShiftIcon) => {
  return <button
    type="button"
    className={`
      ${styles.keyboard__key}
      ${styles.keyboard__key__wide}
    `}
    onClick={() => {
      setShiftToggle(!shiftToggle);
      onPressHandler('shift');
    }}
  ><ShiftIcon /></button>;
};

/**
 * If user tap enter key and the blanks fields are not yet filled.
 * @param {String} key the keyboard character tap by user.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardEnter = (key) => {
  return <button
    type="button"
    className={`
      ${styles.keyboard__key}
      ${styles.keyboard__key__wide}
    `}
  >{key}</button>;
};

/**
 * If user tap space key.
 * @param {Boolean} hasArrowKeys true if their is an arrow keys, else, false.
 * @param {String} keyToggle value is either normal or special.
 * @param {Function} inputHandler this handles every related functionalities of keyboard and also saving the answers.
 * @param {String} key the character tapped by user in the keyboard.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardSpace = (hasArrowKeys, keyToggle, inputHandler, key) => {
  return <button
    type="button"
    className={`
      ${styles.keyboard__key}
      ${hasArrowKeys && keyToggle === 'normal' ? styles.keyboard__key__wider : styles.keyboard__key__extra_wide}
    `}
    onClick={() => {
      inputHandler(`\xa0`);
    }}
  >{key}</button>;
};

/**
 * If all blank fields have inputs this function will activate.
 * @param {Function} highlightBtn highlight the 解答する if condition is true.
 * @param {Boolean} blanksFilled return true if all blanks are filled.
 * @param {String} categories the value either a self-learning or instant-composition.
 * @param {Function} submitHandler if all blank lines are filled this will submit the answer for evaluation.
 * @param {String} answer the string inputted by user in the blank fields.
 * @param {Boolean} canSubmit if all blank fields have input data it is equal to true, else it is false.
 * @param {String} key the keyboard character tap by user.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboard解答する = (highlightBtn, blanksFilled, categories, submitHandler, answer, canSubmit, key) => {
  return (
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
};

/**
 * If user tap the left arrow key this function will move cursor to the left.
 * @param {Function} leftArrowOnClick this function will move the cursor to left.
 * @param {Array} keyLayout is an array of keyboard characters either normal or special.
 * @param {HTMLOrSVGElement} KeyboardArrowBack is a back arrow icon.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardLeftArrow = (leftArrowOnClick, keyLayout, KeyboardArrowBack) => {
  return <button
    type="button"
    className={`
      ${styles.keyboard__key}
      ${styles.keyboard__key__wide}
    `}
    onClick={leftArrowOnClick}
    style={{ width: keyLayout.includes('space') ? 'inherit' : '23%'}}
  ><KeyboardArrowBack /></button>;
};

/**
 * If user tap the right arrow key this function will move cursor to the right.
 * @param {Function} rightArrowOnClick this function will move the cursor to right.
 * @param {Array} keyLayout is an array of keyboard characters either normal or special.
 * @param {HTMLOrSVGElement} KeyboardArrowForward is a forward arrow icon.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 */
export const keyboardRightArrow = (rightArrowOnClick, keyLayout, KeyboardArrowForward) => {
  return <button
    type="button"
    className={`
      ${styles.keyboard__key}
      ${styles.keyboard__key__wide}
    `}
    onClick={() => rightArrowOnClick()}
    style={{ width: keyLayout.includes('space') ? 'inherit' : '23%'}}
  ><KeyboardArrowForward /></button>;
};

/**
 * This will handle the individual interaction of keyboard key.
 * @param {CSSStyleRule} fontSize this is a specific font style based on the condition.
 * @param {Function} inputHandler this handles every related functionalities of keyboard and also saving the answers.
 * @param {String} key the keyboard character tap by user.
 * @returns {HTMLButtonElement} return a button element with its specified attributes and functionalities.
 * 
 */
export const keyboardDefault = (fontSize, inputHandler, key) => {
  return <button
    type="button"
    className={`
      ${fontSize}
      ${styles.keyboard__key}
    `}
    onClick={() => {inputHandler(key);}}
  >{key}</button>;
};
