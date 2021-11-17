import React, { useState, Fragment } from 'react';

import Header from '../../../../../../shared/Header';
import PauseIcon from '../../../../../../shared/icons/PauseIcon';
import FieldBox from './components/FieldBox';
import TextAreaField from '../../../../../../shared/TextArea';
import FooterButton from './components/FooterButton';

import styles from './Question.module.css';

const Question = () => {
  const sender = "to: Marketing Division Mailing List";
  const subject = "subject: Meeting Minutes";
  const firstParagraphContent = "Dear all,\nThank you for your time to attend the meeting and provide your valuable input to the meeting I’d like to share the meeting minutes";
  const secondParagraphContent = "If you have any comments on the minutes, please advise me.";
  const japaneseQuestion = "添付のファイルをご参照ください 。";
  const [response, setResponse] = useState('');
  const [toggleTextArea, setToggleTextArea] = useState(false);
  const correctAnswer = "What do you think about cutting the cost?";
  const correct = 'correct';
  const incorrect = 'incorrect'
  const [sentence, setSentence] = useState('');
  const [incorrectIndices, setIncorrectIndices] = useState([]);

  const arrayEqual = (sentence, correctAnswer) => {
    return JSON.stringify(sentence.split(' ')) === JSON.stringify(correctAnswer.split(' '));
  };

  const handleSentenceSubmit = (e) => {
    e.preventDefault();

    const incorrects = [];
    const answerSentence = sentence.split(' ');
    const correctAnswerArray = correctAnswer.split(' ');

    answerSentence.forEach((word, index) => {
      if (word !== correctAnswerArray[index]) {
        incorrects.push(index);
      }
    });
    setResponse(() => arrayEqual(sentence, correctAnswer) ? correct : incorrect);
    if (incorrects.length > 0) setIncorrectIndices(incorrects);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      setToggleTextArea(true);
      handleSentenceSubmit(e);
    }
  }

  return (
    <Fragment>
      <div className={`${styles.fixedBackground} fixed bg-background-200 `} />
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full">
          <Header hasBack={false} title="Writing 自分の意見を言う" titleClass="ml-px-15">
            <PauseIcon />
          </Header>
        </div>
      </div>
      <p className="pt-px-17 pb-px-15 px-px-16 text-14 text-center text-primary-500 font-hiragino font-bold" >
        本文中の日本語にあてはまる英語を書きましょう 。
      </p>
      <div className={`bg-white ${styles.cardFormat} pt-px-13 px-px-19 mx-2`} >
        <FieldBox divClassName="pt-px-33 font-light text-14 font-sf-pro-text text-left" text={sender} />
        <FieldBox divClassName="pt-px-14 font-light text-14 font-sf-pro-text text-left" text={subject} />
        <p className={`${styles.emailParagraph} text-16 text-basic-100 font-normal font-sf-pro-text mt-px-22 mr-px-2 whitespace-pre-wrap text-justify`}>
          {firstParagraphContent}
        </p>
        <p className={`text-15 font-normal ${styles.japaneseQuestion}`}>
          {japaneseQuestion}
        </p>
        <TextAreaField
          sentence={sentence}
          response={response}
          correct={correct}
          incorrect={incorrect}
          setSentence={setSentence}
          onEnterPress={onEnterPress}
          styling={`${styles.textAreaStyle}`}
          handleSentenceSubmit={handleSentenceSubmit}
          toggleTextArea={toggleTextArea}
          incorrectIndices={incorrectIndices}
        />
        <p className={`${styles.emailBottomParagraph} text-16 text-basic-100 font-normal font-sf-pro-text mt-px-12 mr-px-2 whitespace-pre-wrap text-justify`}>
          {secondParagraphContent}
        </p>
      </div>

      {response ? (
        <div className={`grid place-items-center ${styles.footerButton} pb-px-50`}>
          <FooterButton buttonText="解説へ進む" />
        </div>
      ) : (
          <div className="pb-px-100" />
      )}
    </Fragment>
  );
};

export default Question;
