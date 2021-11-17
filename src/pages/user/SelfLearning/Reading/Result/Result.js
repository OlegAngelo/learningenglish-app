import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../../../../shared/Loading';
import Button from '../../../../../shared/Button';
import ChunkContent from './components/ChunkContent';
import HeaderSection from './components/HeaderSection';
import ParagraphContent from './components/ParagraphContent';
import Footer from './components/Footer';
import useAudio from '../../../../../hooks/useAudio';

import { fetchResult, resetStates } from '../../../../../redux/selfLearning/reading/user/slice';

const Result = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('chunk');
  const [chunkTranslation, setChunkTranslation] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const { logId } = useSelector(state => state.selfLearningReadingExercise);
  const { result } = useSelector((state) => state.userSLReading);
  const audioUrl = result ? `${process.env.REACT_APP_SERVER_API}/api/lr-reading-audio/${result?.sentence?.level?.order}/${result?.sentence?.audio_file}` : '';

  const {
    playingAudio,
    AudioErrorModal,
    stopAudio,
    toggleAudio,
    seekAudio,
    playBackRateAudio,
    loadingAudio,
    clickedPlay,
  } = useAudio(audioUrl);
  
  useEffect(() => {
    if (!logId) return;
    localStorage.setItem('logId', logId);
  }, [logId]);

  useEffect(() => {
    const localStorageLogId = localStorage.getItem('logId');

    dispatch(fetchResult({logId: localStorageLogId}))
      .then((res) => {
        setIsLoading(false);
      });

    return () =>  dispatch(resetStates());
  }, [logId]);

  const nextPageHandler = () => {
    stopAudio();
  };

  const props = { 
    tab, 
    setTab, 
    chunkTranslation, 
    setChunkTranslation,
    result,
    playingAudio,
    toggleAudio,
    seekAudio,
    playBackRateAudio,
    stopAudio,
  };

  return (
    <div className="min-h-screen bg-background-200 pb-px-140">
      {!isLoading  ? (
        <Fragment>
          { (clickedPlay && loadingAudio) && 
            <Loading
              className="text-primary-500"
              iconClass="bg-primary-500"
              zIndex="z-0"
            />
          }
          <AudioErrorModal />
          <HeaderSection {...props} />
            {tab === 'chunk' ? <ChunkContent {...props}/> : tab === 'paragraph' && <ParagraphContent {...props} />}
          <div className="flex justify-center">
            <Link to="/">
              <Button
                innerClass="px-px-11 text-14 cursor-pointer font-bold rounded-px-4"
                type="white-square-wide"
                onClick={() => nextPageHandler()}
              >
                ダッシュボードへ戻る
              </Button>
            </Link>
          </div>
          <Footer {...props} />
        </Fragment>
      ) : (
        <Loading
          className="bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          zIndex="z-0"
          height="h-screen"
          rootPosition="relative"
        />
      )}
    </div>
  );
};

export default Result;
