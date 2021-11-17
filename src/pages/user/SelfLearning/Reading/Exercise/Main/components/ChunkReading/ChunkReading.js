import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Parser from 'html-react-parser';

import Button from '../../../../../../../../shared/Button/Button';
import CheckIcon from '../../../../../../../../shared/icons/CheckIcon';

import {
  setUnreadLines,
  setFinishedLines,
  setTimer,
  stopTimer,
  saveReadingLog,
} from '../../../../../../../../redux/selfLearning/reading/exercise/slice';
import { formatChunks } from '../../../../../../../../utils/formatChunks';

import style from './ChunkReading.module.css';

const ChunkReading = ({setContentType}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    unreadLines,
    finishedLines,
    sentence,
    timer,
    totalOfLinesAnswered,
    totalChunks: sentenceTotalChunks,
  } = useSelector(state => state.selfLearningReadingExercise)
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [chunkStartAt, setChunkStartAt] = useState(null);
  const [hasReachToLastChunk, setHasReachToLastChunk] = useState(false);

  const updateChunkStates = (event, action) => {
    if (event) event.target.blur();

    const totalChunks = unreadLines.length + finishedLines.length;
    let tempUnreadLines = [...unreadLines];
    let removedLine = null;

    if (unreadLines.length == 0) {
      setHeaderTimer(sentence.total_limit_sec);
      const total_correct = finishedLines.filter(f => f.isCorrect ).length; 
      localStorage.setItem('sentence', JSON.stringify([{ 
        id: sentence.id, 
        chunks: [...finishedLines], 
        isTimeUp: false
      }]));

      const understanding_rate = underStandingRate(total_correct,finishedLines);
      if (understanding_rate >= 80) { 
        const localStorageSentence = JSON.parse(localStorage.sentence)
        localStorage.setItem('sentence', JSON.stringify([{ 
          ...localStorageSentence[0],
          understanding_rate,
        }]));
        return handleLastChunk('passed');
      } 
      else { 
        const finished_at = Date.now(); 
        const localStorageSentence = JSON.parse(localStorage.sentence);
        const { chunks, id: sentence_id , isTimeUp } = localStorageSentence[0]
        const chunk_exercise = JSON.parse(localStorage.chunk_exercise);
        const { start_chunk_exercise_at: started_at } = chunk_exercise

        dispatch(
          saveReadingLog({
            ...{
              chunks: formatChunks(chunks),
              sentence_id,
              whole_reading_left_sec: null,
              isTimeUp,
              understanding_rate
            },
            ...{
              started_at,
              finished_at,
            },
          })
        );
        return handleLastChunk('not passed');
      }
    }

    removedLine = tempUnreadLines.shift();
    dispatch(setUnreadLines(tempUnreadLines));
    const finishedLineData = {
      answeredTime: timer,
      isExceededTimeLimit: timer === 0 ? true : false,
      finishedAt: Date.now(),
      startedAt: chunkStartAt,
      ...removedLine,
    };
    dispatch(setFinishedLines([
      ...finishedLines,
      {
        isCorrect: (action === 'understandable'),
        ...finishedLineData,
      },
    ]));

    currentLineIndex !== totalChunks.length - 1 && setCurrentLineIndex(prevState => ++prevState);
    if (tempUnreadLines.length > 0) setHeaderTimer(tempUnreadLines[0].limit_sec);
    setChunkStartAt(Date.now());
  };

  const underStandingRate = (total_correct , finishedLines) => {
    return Math.floor(total_correct / finishedLines.length * 100) 
  }

  const setHeaderTimer = (seconds) => {
    dispatch(setTimer({
      timer: seconds,
      maxTimer: seconds,
    }));
  };

  const handleLastChunk = (result) => {
    dispatch(stopTimer());
    setTimeout(() => {
      if (result === 'passed') setContentType('checkpoint');
      else history.push(`/self-learning/reading/${sentence.id}/end`);
    }, 3000);
    setHasReachToLastChunk(true);
  };

  const renderContent = () => {
    return (
      <Fragment>
        {[...finishedLines, ...unreadLines].map((line, i) => {
          let className = '';
          const chunk = Parser(line.chunk);

          // text font and color style
          if ((i === 0 && finishedLines.length === 0) || (finishedLines.length > 0 && i === finishedLines.length)) {
            className = "text-24 text-basic-100";
          } else {
            className = "text-14 text-basic-200";
          }

          return (
            <div
              id={`chunk-${i}`}
              className={`chunk-child mb-px-40`}
              key={line.id}
            >
              {line.hasOwnProperty('isCorrect')
                ? line.isCorrect
                  ? (
                    <Fragment>
                      <p className={className}>{chunk}</p>
                      <p className="text-15 text-basic-100 pt-px-3">{line.chunk_jp}</p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p className={`${className} text-exam-error`}>{chunk}</p>
                      <p className="text-15 text-exam-error pt-px-3 flex flex-row">
                        <CheckIcon
                          width="17.59"
                          height="13.41"
                          color="#E34E42"
                          className="mt-px-4 mr-px-10"
                        />
                        {line.chunk_jp}
                      </p>
                    </Fragment>
                  )
                : <p className={`${className} leading-tight`}>{chunk}</p>
              }
            </div>
          );
        })}
      </Fragment>
    );
  };

  useEffect(() => {
    setChunkStartAt(Date.now());
    setHeaderTimer(unreadLines[0].limit_sec);
  }, []);

  useEffect(() => {
    if (timer === 0) updateChunkStates(null, 'notUnderstandable');
  }, [timer]);

  // listen and check if chunk has reached to the last line
  useEffect(() => {
    if (totalOfLinesAnswered === sentenceTotalChunks)
      updateChunkStates(null, 'notUnderstandable');
  }, [totalOfLinesAnswered]);

  // listen chunk changes and automatically move active chunk upwards
  useEffect(() => {
    let childContainer = document.querySelector('#container');
    const child = document.querySelector('.chunk-child');
    const allChilds = childContainer.childNodes;
    const childHeight = child.clientHeight;

    if (currentLineIndex >= allChilds.length) return;

    // specify the block position to display
    const displayBlock = 0;
    let displayPosition = displayBlock * childHeight;

    // specify the chunk block you want to display
    let centerDivPosition = document.getElementById(`chunk-${currentLineIndex}`).offsetTop;
    let offestValue = displayPosition - centerDivPosition;

    // offset the container position
    childContainer.style.position = 'relative';
    childContainer.style.top = currentLineIndex && `${offestValue}px`;
  }, [currentLineIndex]);

  return (
    <div className="mt-px-140">
      <div className={`h-auto ${window.screen.height <= 736 ? style.chunkContainer : ''}`}>
        <div className="text-center">
          <p className="font-bold text-16 text-primary-500">チャンクの意味を考えましょう</p>
        </div>
        <div className={`mx-px-16 relative ${style.sliderContainer}`}>
          <div className={style.overlayTop}></div>
          <div id="parent" className={style.slider}>
            <div id="container" className="-mt-px-30">{renderContent()}</div>
          </div>
          <div className={style.overlayBottom}></div>
        </div>

      </div>

      <div className={`absolute bottom-0 left-0 right-0 ${style.buttonsDiv}`}>
        <div className="flex justify-center">
          <Button
            className="mr-px-8"
            type="white-square-wider"
            onClick={(e) => updateChunkStates(e, 'notUnderstandable')}
            disabled={hasReachToLastChunk}
          >
            わからない
          </Button>
          <Button
            innerClass={style.button}
            type="darkblue-square"
            onClick={(e) => updateChunkStates(e, 'understandable')}
            disabled={hasReachToLastChunk}
          >
            理解できる
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChunkReading;
