import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../../../../../../../shared/Button';
import ContentContainer from '../../../../../components/ContentContainer';
import { saveReadingLog } from '../../../../../../../../redux/selfLearning/reading/exercise/slice';
import { formatChunks } from '../../../../../../../../utils/formatChunks';

import { englishContent } from './computed';

import './style.css';

import style from './ReadingResult.module.css';

const ReadingResult = () => {
  const [content, setContent] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    finishedLines,
    sentence,
    timer,
  } = useSelector(state => state.selfLearningReadingExercise);

  const redirectToNextPage = () => {
    if (isRedirecting) return;

    setIsRedirecting(true);
    const finished_at = Date.now();
    const localStorageSentence = JSON.parse(localStorage.sentence);
    const { chunks, id: sentence_id , isTimeUp, leftSeconds: whole_reading_left_sec, understanding_rate } = localStorageSentence[0]
    const chunk_exercise = JSON.parse(localStorage.chunk_exercise);
    const { start_chunk_exercise_at: started_at } = chunk_exercise

    dispatch(
      saveReadingLog({
        ...{
          chunks: formatChunks(chunks),
          sentence_id,
          whole_reading_left_sec,
          isTimeUp,
          understanding_rate
        },
        ...{
          started_at,
          finished_at,
        },
      })
    ).finally(() => {
      history.push(`/self-learning/reading/${sentence.id}/end`);
    });
  };

  
  useEffect(() => {
    if (!sentence) return;

    const script = sentence.script;
    const chunks = finishedLines;
    const importantWordsFromDB = sentence.words;

    setContent(englishContent(script, chunks, importantWordsFromDB));
  }, [sentence]);

  useEffect(() => {
      const localStorageSentence = JSON.parse(localStorage.sentence)
      const { understanding_rate } = localStorageSentence[0]
      localStorage.setItem('sentence', JSON.stringify([{
        id: sentence.id,
        chunks: [...finishedLines],
        isTimeUp: timer === 0 ? true : false,
        leftSeconds: timer,
        understanding_rate,
      }]));
      if (timer === 0) redirectToNextPage();
  }, [timer]);

  return (
    <div className={`${style.marginTop}`}>
      <div className="text-center mb-px-23">
        <p className="font-bold text-16 text-primary-500">チャンクごとに意味を考えながら<br/>時間内に英文を読みましょう</p>
      </div>

      <ContentContainer title={sentence.title} className="pt-px-16 mx-px-10">
        <div id="chunk-content" className="pb-px-24 text-justify pt-px-32 text-14 font-normal text-basic-100">
          {content}
        </div>
      </ContentContainer>
      
      <div className={style.btnDiv}>
        <Link to="#" onClick={() => redirectToNextPage()}>
          <Button
            className="flex justify-center"
            innerClass={style.btn}
            type="darkblue-square"
          >
            Finished
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReadingResult;
