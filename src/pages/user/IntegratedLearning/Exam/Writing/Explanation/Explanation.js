import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';

import Answer from './components/PostAnswer';
import Question from './components/PostQuestion';
import Header from '../../../../../../shared/Header';
import PauseIcon from '../../../../../../shared/icons/PauseIcon';
import Button from '../../../../../../shared/Button';

import styles from './Explanation.module.css';

const Explanation = () => {

  const [nextId, setNextId] = useState(0);
  let [questionText, setQuestionText] = useState('');

  const { id } = useParams();

  const setQuestion = () => {
    switch(id) {
      case "1":
        setQuestionText('What are they discussing?');
        setNextId(2);
        break;
      case "2":
        setQuestionText('What do you think about cutting the cost?');
        setNextId(3);
        break;
      case "3":
        setQuestionText('What are they discussing?');
        setNextId(3);
        break;
      default:
        setQuestionText('No question added');
      }
  }

  useEffect(() => {
    setQuestion();
  }, [id]);

  return (
    <Fragment>
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full">
          <Header hasBack={false} title="Writing 自分の意見を言う" titleClass="ml-px-15">
            <PauseIcon />
          </Header>
        </div>
      </div>
      <div className={`${styles.container} bg-background-200`}>
        <p className="text-center text-14 text-primary-500 font-bold mt-px-11 mb-4 ml-px-68 mr-px-90">
          模範解答を確認しあなたの解答と 見比べてみましょう
        </p>
        <div className={`${styles.questionAnswerContainer} bg-white py-3`}>
          <Question
            questionNumber={id}
            question={questionText}
          />
          <p className="text-14 font-bold  text-primary-500 mx-4 mt-px-15">模範解答</p>
          <div className="mt-1.5 mx-px-4">
            <Answer answer="How To Improve The Sales Of Their Product." isGreat={true} />
          </div>
          <div className="mx-px-4">
            <Answer answer="How To Improve The Employees’ Work Efficiency." isGreat={true} />
          </div>
          <div className="mx-px-4">
            <Answer answer="When To Telease Their New Product." isGreat={false} />
          </div>
          <div className={`${styles.pointContainer} font-hiragino-kaku`}>
            <p className={`${styles.pointParagraph} text-justify text-14`}>
              「～を参照する 」 は refer to という
              表現が便利です 。 「 添付ファイル 」 は
              attached file または attachment で表せます 。
            </p>
          </div>
        </div>
        <div className={`${styles.btnWrapper} text-center bottom-0 w-full bg-background-200`}>
          <Button
            className="flex justify-center"
            innerClass="w-px-162 bg-white text-primary-400 px-px-10"
            type="whiter-square-wide"
          >
            作文チェック項目確認
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

export default Explanation;
