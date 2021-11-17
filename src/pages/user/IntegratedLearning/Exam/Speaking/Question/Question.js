import React, { Fragment, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

import Header from '../../../../../../shared/Header';
import Player from '../../../../../../shared/Header/Player';
import VideoPlayer from '../../../../../../shared/VideoPlayer';
import Recorder from '../../../../../../shared/Recorder';
import Instruction from './components/Instruction';
import SingleQuestion from './components/SingleQuestion';
import ChoiceQuestion from './components/ChoiceQuestion';
import ChoiceExplanation from './components/ChoiceExplanation';

import style from './Question.module.css';

import data from './data';

const Question = () => {
  const { id } = useParams();
  const { state } = queryString.parse(useLocation().search);
  const type = data[id].type;
  const [question,setQuestion] = useState(data[id]);
  const [isShowExplanation,setIsShowExplanation] = useState(false);
  const [isSelectedChoiceCorrect,setIsSelectedChoiceCorrect] = useState(false);
  const [selectedChoice,setSelectedChoice] = useState();
  const states = {
    disabled: {
      recorderState: 'disabled',
    },
    recording: {
      recorderState: 'recording',
    },
    feedback: {
      recorderState: 'disabled',
    }
  };

  const showExplanation = (choiceIndex) => {
    setSelectedChoice(choiceIndex);
    setIsShowExplanation(true);
  }

  const willRetry = () => {
    setIsShowExplanation(false);
  }

  return (
    <div className={`${style.container}`}>
      <div className={`bg-background-200 ${style.speakingPageBody}`}>
        <Header hasBack={false} title="Speaking 自分の意見を言う">
          <Player action="PLAY" isPlaying={true} />
        </Header>
        <div>
          <VideoPlayer
            src="https://dcipher4320.s3.amazonaws.com/dummy_vid.mp4"
            className={style.videoPlayer}
          />
        </div>
        <div className="px-px-8">
          <Instruction
            className={style[type]}
            state={state}
            type={type}
            isShowExplanation={isShowExplanation}
            instruction={question.instruction}
            subDialogue={question.subDialogue}
          />
          {isShowExplanation ? (
            <ChoiceExplanation explanations={question.choices[selectedChoice].explanations} isCorrect={isSelectedChoiceCorrect} willRetry={willRetry} />
          ) : (
            <Fragment>
              {type === 'single' && (
                <SingleQuestion
                  state={state}
                  hasPolygon={question.hasPolygon}
                  firstDialogue={question.firstDialogue}
                  secondDialogue={question.secondDialogue}
                />
              )}
              {type === 'choices' && (
                <ChoiceQuestion
                  state={state}
                  question={question}
                  setQuestion={setQuestion}
                  showExplanation={showExplanation}
                  setIsSelectedChoiceCorrect={setIsSelectedChoiceCorrect}
                />
              )}
              <div className={`grid justify-center ${style[`${type}-${state}`]}`}>
                <Recorder type={states[state].recorderState} />
                {state === 'recording' && (
                  <span
                    className={`text-14 font-hiragino-kaku font-normal text-center ${style.iconText}`}
                  >
                    録音中...
                  </span>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
