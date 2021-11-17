import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useParams, useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../../../../../shared/Header';
import PlayIcon from '../../../../../../shared/icons/PlayIcon';
import ChevronLeftIcon from '../../../../../../shared/icons/ChevronLeftIcon';
import VideoPlayer from '../../../../../../shared/VideoPlayer';
import LightBulb from '../../../../../../shared/icons/LightBulb';
import AnswerCard from '../../components/AnswerCard';
import QuestionCard from '../../components/QuestionCard';

import styles from './Question.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Question = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalIsVisible , setModalIsVisible] = useState(false);
  const [nextId, setNextId] = useState(0);
  const modalRef = useRef(null);
  let [questionText, setQuestionText] = useState('');
  let { id } = useParams();
  let history = useHistory();
  let query = useQuery();
  let scenario = query.get('scenario');
  let prevId = id - 1;
  let search = props.location.search;

  const toggle = () => {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (modalIsVisible) document.addEventListener('click', handleClickOutside);
  },[modalIsVisible]);

  const handleClickOutside = () => {
    setModalIsVisible(false);
    document.removeEventListener('click', handleClickOutside);
  };

  const setQuestion = () => {
    if (parseInt(id) === 1) {
      setQuestionText('What are they discussing?')
      setNextId(2)
    } else if (parseInt(id) === 2) {
      setQuestionText('What do you think about cutting the cost?')
      setNextId(3)
    } else if (parseInt(id) === 3) {
      setQuestionText('What is the first item to be discussed?')
      setNextId(3)
    } else {
      setQuestionText('No question added')
    }
  }

  const showModal = () => {
    setModalIsVisible(true)
  }

  useEffect(() => {
    setQuestion()
  }, [id])

  return (
    <Fragment>
      <div className="h-screen bg-background-200">
        <Header hasBack={false} title="Listening 自分の意見を言う">
          <PlayIcon isPlaying={isPlaying} onclick={toggle} action="PLAY" />
        </Header>
        <div className="bg-basic-200">
          <VideoPlayer src="https://dcipher4320.s3.amazonaws.com/dummy_vid.mp4" play={isPlaying} />
        </div>
        <div className={`bg-background-200 px-2 ${styles.container}`}>
          <p className="text-center text-14 text-primary-500 font-bold -mt-px-2">内容に関する英語の質問に答えましょう </p>
          <QuestionCard
            questionNumber={id}
            question={questionText}
            leftMargin="ml-4"
          />
          <Link to={`/training/integrated-exam/listening/${nextId}${search}`}>
            <div className="mt-px-22 mx-auto">
              <AnswerCard answer="How to improve the sales of their product." />
            </div>
          </Link>
          <Link to={`/training/integrated-exam/listening/${nextId}${search}`}>
            <div className="mt-2">
              <AnswerCard answer="How to improve the employees’ work efficiency." scenario={scenario} />
            </div>
          </Link>
          <Link to={`/training/integrated-exam/listening/${nextId}${search}`}>
            <div className="mt-2">
              <AnswerCard answer="When to release their new product." />
            </div>
          </Link>
          {!scenario ?
            <div className={`mx-auto text-center ${styles.back}`} onClick={() => history.push(`/training/integrated/listening/exam/${prevId}`)}>
              {
                id !== 1 &&
                <p className="text-primary-400 font-bold text-14">
                  <span className="mr-0.5">
                    <ChevronLeftIcon width="8" height="12" color="#43596D" />
                  </span>
                    BACK
              </p>
              }
            </div>
            :
            <div 
              className={`${styles.floatingBtn} bg-primary-500 border-2 border-white flex flex-col justify-around items-center fixed right-0 bottom-20 mb-px-5`}
              onClick={showModal}
            >
              <LightBulb width="14" height="20" color="white" />
              <div className="text-9 text-white">ポイント</div>
            </div>
          }
        </div>
      </div>

      { modalIsVisible && ( <div className="absolute bg-background-modal flex h-full items-center justify-center top-0 w-full">
        <div className={`bg-white mt-px-23 p-px-23 rounded ${styles.modal}`} ref={modalRef}>
          <div className={`font-bold text-16 text-primary-500 ${styles.modalHeader}`}>
            問題のポイント
          </div>
          <div className={`mt-px-8 text-14 ${styles.modalContent}`}>
            「 原価を削るのはどうでしょうか？ 」 という妥協を表す表現です 。
          </div>
        </div>
      </div>) }
    </Fragment>
  )
}

export default Question;
