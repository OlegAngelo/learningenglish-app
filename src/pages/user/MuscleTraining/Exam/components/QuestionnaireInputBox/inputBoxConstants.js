import style from "./QuestionnaireInputBox.module.css";

const inputBoxConstants = {
  input: {
    type: 'input',
    response: '',
    classPrefix: '',
  },
  correct: {
    type: 'correct',
    response: 'Excellent!!',
    classPrefix: 'correct',
  },
  incorrect: {
    type: 'incorrect',
    response: 'keep it up!',
    classPrefix: "incorrect",
  },

  inputBoxStyle: function (wordLength, order = '') {
    const charWidth = 1;
    const gap = 0.5;
    let inWidth = 1 * (charWidth + gap);
    let styles = {
      fontSize: '24px',
      width: '24px',
    };

    if (wordLength >= 13) {
      styles = {
        fontSize: '16px',
        width: '14px',
      };
    } else if (wordLength >= 10) {
      styles = {
        fontSize: '20px',
        width: '18px',
      };
    }

    return {
      fontSize: styles.fontSize,
      width: `${inWidth - 0.8}ch`,
      borderBottom: '1px solid #C4C4C4',
      width: styles.width,
      textAlign: 'center',
      marginLeft: order === 'first' ? '10px' : '3px',
      marginRight: order === 'last' ? '10px' : '3px',
      fontFamily: 'SF Pro Text',
      lineHeight: '30px',
    };
  },

  tagStyle: function (wordLength) {
    let styles = {
      fontSize: '24px',
      width: '24px',
    };

    if (wordLength >= 13) {
      styles = {
        fontSize: '16px',
        width: '14px',
      };
    } else if (wordLength >= 10) {
      styles = {
        fontSize: '20px',
        width: '18px',
      };
    }

    return {
      fontSize: styles.fontSize,
      width: styles.width,
      textAlign: 'center',
      marginRight: '5px',
      fontFamily: 'SF Pro Text',
      lineHeight: '30px',
    };
  },

  prepositionStyle: function (index) {
    return {
      fontSize: '24px',
      letterSpacing: '8px',
      textAlign: 'center',
      marginLeft: '8px',
      marginRight: '8px',
      fontFamily: 'SF Pro Text',
      lineHeight: '30px',
    };
  },

  inputBoxClass: function (maxLength) {
    if (maxLength <= 13) return;
    return `${style.inputFontSize} ${style.inputWidth}`;
  },

  prepositionClass: function (maxLength) {
    if (maxLength <= 13) return;
    return `${style.inputFontSize} ${style.inputMargin}`;
  },
};

export default inputBoxConstants;
