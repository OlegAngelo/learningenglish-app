import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../../../../shared/Button/Button';
import CardImage from './CardImage';

import {
  setTimer,
  startTimer,
} from '../../../../../../../../redux/selfLearning/reading/exercise/slice';

import style from './CheckPoint.module.css';

const CheckPoint = ({setContentType}) => {  
  const dispatch = useDispatch();
  const { sentence } = useSelector((state) => state.selfLearningReadingExercise);
  const textJa = {
    read_the_same_sentence_in_paragraph: '同じ文章を、パラグラフの形で読みます。',
    think_about_meaning_of_each_chunk_and_dont_read_it_back: 'チャンクごと意味を考え、返り読みをしないように',
    read_it_consciously: '意識しながら読みましょう。'
  };

  const redirectToNextPage = () => {
    dispatch(
      setTimer({
        timer: sentence.total_limit_sec,
        maxTimer: sentence.total_limit_sec,
      })
    );
    dispatch(startTimer());
    return setContentType('result');
  };

  return (
    <div className={`bg-primary-500 min-h-screen ${style.container}`}>
      <div className="flex flex-col items-center text-center text-basic-400 px-px-20">
        <div className="text-14 mb-px-8">Next step</div>
        <CardImage
          className="w-full pt-px-16 pb-px-20"
          imgClass={`mx-px-20 ${style.image}`}
          imgSrc="/images/reading-checkpoint.svg"
        />
        <p className="text-15 font-bold leading-px-2">
          {textJa.read_the_same_sentence_in_paragraph}
        </p>
        <p className="text-14 pt-px-40">
          {textJa.think_about_meaning_of_each_chunk_and_dont_read_it_back}
          {textJa.read_it_consciously}
        </p>
        <div className={`justify-center bg-primary-500 ${style.buttonPosition}`}>
          <Button
            innerClass={`font-bold ${style.button} cursor-pointer`}
            type="white-square-wider"
            onClick={() => redirectToNextPage()}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckPoint;
