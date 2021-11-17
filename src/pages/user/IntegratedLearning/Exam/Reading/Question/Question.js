import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import { log } from '../../../../../../utils/loggerHelper';

import Header from '../../../../../../shared/Header/';
import ChevronLeftIcon from '../../../../../../shared/icons/ChevronLeftIcon';
import Button from '../../../../../../shared/Button/Button';
import Player from '../../../../../../shared/Header/Player';
import LightBulb from '../../../../../../shared/icons/LightBulb';

import Agenda from '../../components/Agenda';
import AnswerCard from '../../components/AnswerCard/AnswerCard';
import QuestionCard from '../../components/QuestionCard/QuestionCard';

import styles from './Question.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Question = () => {

  const [isPlaying, setIsPlaying] = useState(true);
  let [questionText, setQuestionText] = useState('');
  const [agendaIsVisible, setAgendaIsVisible] = useState(false);
  let questionId = useParams();
  let history = useHistory();
  let query = useQuery();
  let currentLink = useLocation();
  let scenario = query.get('scenario');
  let prevId = questionId.id - 1;
  const [nextId, setNextId] = useState(0);

  const toggle = () => {
    setIsPlaying(!isPlaying);
  }

  const setQuestion = () => {
    if (questionId.id === "1") {
      setQuestionText('What is the first item to be discussed?')
      setNextId(2)
    } else if (questionId.id === "2") {
      setQuestionText('What do you think about cutting the cost?')
      setNextId(3)
    } else if (questionId.id === "3") {
      setQuestionText('What are they discussing?')
      setNextId(3)
    } else {
      setQuestionText('No question added')
    }
  }

  useEffect(() => {
    setQuestion()
    log(scenario)
    log(query.get('scenario'))
  }, [questionId.id])

  return (
    <div className="h-screen bg-background-200 flex flex-col">
      <Header hasBack={false} title="Reading 検討事項を確認する">
        <Player isPlaying={isPlaying} onClick={toggle} action="PLAY" />
      </Header>
      <div className={`bg-background-200 px-2 flex-1 flex flex-col ${styles.container}`}>
        <div className={`flex-1 flex flex-col ${styles.content}`}>
          <p className="text-center text-14 text-primary-500 font-bold -mt-px-2">内容に関する英語の質問に答えましょう </p>
          <QuestionCard
            questionNumber={questionId.id}
            question={questionText}
            leftMargin="ml-4"
            textStyle="text-16"
          />
          <Link to={scenario ? `${currentLink.pathname}?scenario=${scenario}`
            : `/training/integrated-exam/reading/${nextId}`}
          >
            <div className="mt-px-20 mx-auto">
              <AnswerCard answer="How to improve the sales of their product." />
            </div>
          </Link>
          <Link to={scenario ? `${currentLink.pathname}?scenario=${scenario}`
            : `/training/integrated-exam/reading/${nextId}`}
          >
            <div className="mt-2">
              <AnswerCard answer="How to improve the employees’ work efficiency." scenario={scenario} />
            </div>
          </Link>
          <Link to={scenario ? `${currentLink.pathname}?scenario=${scenario}`
            : `/training/integrated-exam/reading/${nextId}`}
          >
            <div className="mt-2">
              <AnswerCard answer="When to release their new product." />
            </div>
          </Link>
          <Button
            innerClass={`mx-auto ${agendaIsVisible && styles.disabled}`}
            className="my-px-30"
            type="darkblue-square"
            onClick={() => setAgendaIsVisible(true) }
           >
            本文を見る
          </Button>
          { agendaIsVisible && <div className="mt-px-1">
            <Agenda />
          </div> }
        </div>
        {!scenario
          ? <div
            className={`mx-auto text-center ${styles.back}`}
            onClick={() => history.push(`/training/integrated-exam/reading/${prevId}`)}
          >
            {questionId.id !== 1 &&
              <p className="text-primary-400 font-bold text-14">
                <span className="mr-0.5">
                  <ChevronLeftIcon width="8" height="12" color="#43596D" />
                </span>
                  BACK
              </p>}
            </div>
          : <div className="relative">
              <div className={`${styles.floatingBtn} bg-primary-500 border-2 border-white flex flex-col justify-around items-center fixed`}>
                <LightBulb width="14" height="20" color="white" />
                <div className="text-9 text-white">ポイント</div>
              </div>
              <Button innerClass={`mx-auto ${styles.lowerBtn} font-bold`} type="white-square-wider">解答結果へ進む</Button>
          </div>
        }
      </div>
    </div>
  )
}

export default Question;
