import React, { Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

import Dialogue from './components/Dialogue';
import Instruction from './components/Instruction';
import Button from '../../../../../../shared/Button';
import Close from '../../../../../../shared/Header/Close';
import Header from '../../../../../../shared/Header';
import Recorder from '../../../../../../shared/Recorder';
import VideoPlayer from '../../../../../../shared/VideoPlayer';

import style from './Review.module.css';

const Review = () => {
  const { id } = useParams();
  const { state } = queryString.parse(useLocation().search);
  const data = [
    {
      instruction: '最後にもう一度発音しましょう',
      dialogue: 'I think we shouldn’t place an advertisement.'
    },
    {
      instruction: '最後にもう一度発音しましょう...',
      dialogue: 'We have no choice but placing an\nadvertisement.'
    },
    {
      instruction: '最後にもう一度発音しましょう...',
      dialogue: 'I think we shouldn’t place an advertisement.'
    }
  ];
  
  const states = {
    review: {
      iconType: 'recording',
      text: <span className={`text-14 font-hiragino-kaku font-normal ml-px-9 ${style.iconText}`}>録音中...</span>
    },
    feedback: {
      iconType: 'disabled',
      text: null
    }
  };

  const isLastItem = (index) => {
    return parseInt(index) === data.length - 1;
  };

  const displayNextButton = () => {
    return (isLastItem(id) && state === 'feedback');
  };

  return (
    <div className={style.container}>
      <div className={`bg-background-200 ${style.speakingReviewPageBody}`}>
        <Header hasBack={false} title="Speaking 自分の意見を言う">
          <Close />
        </Header>
        <div>
          <VideoPlayer src="https://dcipher4320.s3.amazonaws.com/dummy_vid.mp4" className={style.videoPlayer}/>
        </div>
        <div className="mt-px-18 mx-px-8">
          <Fragment>
            <Instruction
              state={state}
              instruction={data[id].instruction}
            />
            <Dialogue
              dialogue={data[id].dialogue}
              state={state}
            />
            {
              (state === 'feedback' && (
                <div className={`flex justify-center ${isLastItem(id) ? style.isLast : style.disableButton}`}>
                  <Recorder type={states[state].iconType}/>
                </div>
              ))
            }
            {
              (state === 'review' && (
                <div className={`grid justify-center ${style.recordingButton}`}>
                  <Recorder type={states[state].iconType}/>
                  {states[state].text}
                </div>
              ))
            }
            {
              (displayNextButton() && (
                <div className={`flex justify-center ${style.nextButton}`}>
                  <Button type="white-square-wider">次の問題に進む</Button>
                </div>
              ))
            }
          </Fragment>
        </div>
    </div>
    </div>
  );
};

export default Review;
