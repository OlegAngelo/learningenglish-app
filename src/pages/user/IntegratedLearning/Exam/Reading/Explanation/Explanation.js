import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import Answer from '../components/PostAnswer';
import Question from '../components/PostQuestion/';
import Header from '../../../../../../shared/Header';
import PauseIcon from '../../../../../../shared/icons/PauseIcon';
import Button from '../../../../../../shared/Button/Button';

import styles from './Explanation.module.css';

const Explanation = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [viewText, setViewText] = useState(false);
  const [nextId, setNextId] = useState(0);
  let [questionText, setQuestionText] = useState('');

  let questionId = useParams();
  let history = useHistory();

  let currentPage = questionId.questionId;
  let prevId = questionId.questionId - 1;

  const toggle = () => {
    setIsPlaying(!isPlaying);
  }

  const setQuestion = () => {
    if (questionId.questionId === 1) {
      setQuestionText('What are they discussing?');
      setNextId(2)
    } else if (questionId.questionId === 2) {
      setQuestionText('What do you think about cutting the cost?');
      setNextId(3)
    } else if (questionId.questionId === 3) {
      setQuestionText('What are they discussing?');
      setNextId(3)
    } else {
      setQuestionText('No question added');
    }
  }

  useEffect(() => {
    setQuestion();
  }, [questionId.questionId])

  return (
    <div className="bg-background-200">
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full ml-3">
          <Header hasBack={false} title="Reading 検討事項を確認する">
            <PauseIcon isPlaying={isPlaying} onclick={toggle} action="PAUSE" />
          </Header>
        </div>
      </div>
      <div className={`${styles.container}`}>
        <div className={`${styles.qaContainer} bg-white pt-5`}>
          <p className="text-center text-16 text-primary-400 font-bold font-hiragino-kaku">問題解説</p>
          <Question
            questionNumber={questionId.questionId}
            question={questionText}
          />
          <div className="mt-8 mx-0 tracking-wide">
            <Answer answer="How To Improve The Sales Of Their Product." isCorrect={true} />
          </div>
          <div className="mx-0 tracking-wide">
            <Answer answer="How To Improve The Employees’ Work Efficiency." isCorrect={false} />
          </div>
          <div className="mx-0 tracking-wide">
            <Answer answer="When To Telease Their New Product." isCorrect={false} />
          </div>
          <div className={`${styles.pointContainer} font-hiragino-kaku`}>
            <p className={`text-center text-14 text-primary-400 font-bold`}>POINT</p>
            <p className={`${styles.pointParagraph} text-left text-14`}>
              アジェンダによると、協議項目１は
              Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うこと
              が読み取れる 。
            </p>
          </div>
        </div>
        <div className={`${styles.btnWrapper} text-center`} onClick={() => setViewText(!viewText)}>
          <Button
            className={`m-3`}
            type={clsx(`${viewText ? `lightgray-square` : `darkblue-square`}`)}
          >
            本文を見る
          </Button>
        </div>
        <div className="flex flex-col h-28">
          <div className="flex justify-between pt-1 px-2.5">
            <Button
              innerClass={`${styles.footerButtonSm}`}
              type={clsx(`${(currentPage === 1) ? `lightgray-square-wide` : `white-square-wide`}`)}
              onClick={() => history.push(`/training/integrated-exam/reading/${prevId}/explanation`)}
            >
              前の解説
            </Button>
            <Button innerClass={styles.footerButtonLg} type="white-square-wide">
              解答結果に戻る
            </Button>
            <Link to={`/training/integrated-exam/reading/${nextId}/explanation`}>
              <Button
                innerClass={styles.footerButtonSm}
                type={clsx(`${(currentPage === 3) ? `lightgray-square-wide` : `white-square-wide`}`)}
              >
                次の解説
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explanation;
