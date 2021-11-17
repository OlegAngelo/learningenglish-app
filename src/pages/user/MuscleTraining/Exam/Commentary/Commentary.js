import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Button from '../../../../../shared/Button/Button';
import Header from '../../../../../shared/Header/Header';
import Alert from '../../../../../shared/Alert';
import SpeakerIcon from '../../../../../shared/icons/SpeakerIcon';

import { removeSpecialCharacters } from '../../../../../utils/text';
import questionHelper from '../../../../../utils/questionHelper';

import styles from './Commentary.module.css';
import Loading from '../../../../../shared/Loading/Loading';

import {
  getTrainingVocabularies,
  getTrainingVocabIndex,
  getTrainingUnit,
} from '../../../../../redux/training/selectors';
import {
  incrementTrainingVocabIndex,
  decrementTrainingVocabIndex,
  setResultTrainingVocabIndex,
  fetchMuscleTrainingResult,
} from '../../../../../redux/training/slice';

const Commentary = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: commentaryId } = useParams();
  const trainingResultId = localStorage.getItem('log_learn_session_id');

  const resultDetailIndex = useSelector(getTrainingVocabIndex);
  const results = useSelector(getTrainingVocabularies);
  const { id: unitId } = useSelector(getTrainingUnit);

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [sentenceAudioUrl, setSentenceAudioUrl] = useState(null);
  const [isShowAudioModal, setIsShowAudioModal] = useState(false);
  const [interrupted, setInterrupted] = useState(false);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [exampleSentence, setExampleSentence] = useState('');
  const [exampleSentenceTranslation, setExampleSentenceTranslation] = useState('');
  const [pronunciationTips, setPronunciationTips] = useState('');
  const playBackQuestion = '問題を再生';
  const playBackSentence = '例文を再生';
  const resultDetail = results[resultDetailIndex];
  const subTitle =
    resultDetail &&
    ` ${
      resultDetail.question.meaning
        ? resultDetail.question.meaning
        : resultDetail.question.translation
    } `;

  const handleNext = () => {
    if (resultDetailIndex < results.length - 1) {
      stop();
      dispatch(incrementTrainingVocabIndex());
    }
  }

  const handlePrev = () => {
    if (resultDetailIndex > 0) {
      stop();
      dispatch(decrementTrainingVocabIndex());
    }
  };

  const onError = () => {
    setAudioUrl(null);
  };

  const onSentenceError = () => {
    setSentenceAudioUrl(null);
  };

  const onPlaying = () => {
    setIsAudioPlaying(true);
  };

  const onEnded = () => {
    setIsAudioEnded(true);
    setIsAudioPlaying(false);
  };

  function shouldReload() {
    return this.currentTime !== 0 && this.duration === Infinity;
  }

  useEffect(() => {
    if (audioUrl !== null) {
      audioUrl.onerror = onError;
      audioUrl.onplaying = onPlaying;
      audioUrl.onended = onEnded;
      audioUrl.shouldReload = shouldReload;
    }

    if (sentenceAudioUrl !== null){
      sentenceAudioUrl.onerror = onSentenceError;
      sentenceAudioUrl.onplaying = onPlaying;
      sentenceAudioUrl.onended = onEnded;
      sentenceAudioUrl.shouldReload = shouldReload;
    }
  }, [audioUrl, sentenceAudioUrl]);

  const play = () => {
    if (audioUrl === null) {
      setIsShowAudioModal(true);
    } else if (audioUrl.paused) {
      if (audioUrl.shouldReload()) {
        audioUrl.load();
      }

      audioUrl.currentTime = 0;
      audioUrl.play();
      setIsAudioEnded(false);
    }
  };

  const playSentence = () => {
    if (sentenceAudioUrl === null) {
      setIsShowAudioModal(true);
    } else if (sentenceAudioUrl.paused) {
      if (sentenceAudioUrl.shouldReload()) {
        sentenceAudioUrl.load();
      }

      sentenceAudioUrl.currentTime = 0;
      sentenceAudioUrl.play();
      setIsAudioEnded(false);
    }
  };

  const stop = () => {
    if (audioUrl !== null) {
      audioUrl.pause();
      audioUrl.currentTime = 0;
    }

    if (sentenceAudioUrl !== null) {
      sentenceAudioUrl.pause();
      sentenceAudioUrl.currentTime = 0;
    }

    setIsAudioPlaying(false);
    setIsAudioEnded(false);
  };

  const getAudioUrl = (fileName) => {
    return `${process.env.REACT_APP_SERVER_API}/api/question-audio/${unitId}/${resultDetail.logTrainingType}/${fileName}`;
  };

  useEffect(() => {
    if (resultDetail) {
      window.scrollTo(0,0);
      history.replace(
        `/training/muscle-exam/commentary/${resultDetail.logTrainingId}`
      );

      let learningType = resultDetail.logTrainingType;
      setExampleSentence((learningType == 'word') ? questionHelper.formatQuestionSentence(resultDetail.question.example_sentence) : '');
      setExampleSentenceTranslation(resultDetail.question.example_sentence_jp);
      setPronunciationTips(resultDetail.question.pronunciation_point);

      setAudioUrl(
        new Audio(getAudioUrl(resultDetail.question.audio_file))
      );

      if (learningType === 'word') {
        setSentenceAudioUrl(
          new Audio(getAudioUrl(resultDetail.question.example_sentence_audio_file))
        );
      }
    }
  }, [resultDetail]);

  useEffect(() => {
    if (results.length < 1) {
      dispatch(fetchMuscleTrainingResult(trainingResultId));
    } else {
      dispatch(setResultTrainingVocabIndex({ commentaryId }));
    }
  }, [results]);

  useEffect(() => {
    if (resultDetailIndex > -1) {
      setIsFetchingData(false);
    }
  }, [resultDetailIndex])

  return (
    <Fragment>
      {isFetchingData ? (
        <Loading
          className="bg-background-200 h-3/4"
          iconClass="bg-primary-500 text-primary-500"
          position="top-1/3"
        />
      ) : (
        <div className="bg-background-200 flex flex-col min-h-screen pb-8">
          <Alert
            show={isShowAudioModal}
            msg="音声ファイルの取得に失敗しました。"
            callBack={() => {
              setIsShowAudioModal(false);
              setInterrupted(false);
            }}
          />
          <Header hasBack="true" title="解説" />
          <div className="flex-1">
            <div className={`px-px-24 -mt-px-15 ${ resultDetail.logTrainingType === 'word' ? `text-center`:`text-left` } pt-px-100`}>
              <p
                className={`font-theme-normal text-24 ${styles.questionTitle}`}
              >
                {removeSpecialCharacters(resultDetail.question.title)}{' '}
              </p>
              <p
                className="font-theme-norm text-18 mt-px-8"
                dangerouslySetInnerHTML={{
                  __html: subTitle.replace(/\n/g, '<br/>'),
                }}
              />
              <div className='mt-px-20 text-center w-full'>
                <button
                  onClick={() => play()}
                  disabled={isAudioPlaying}
                  className="disabled:opacity-50"
                >
                  <SpeakerIcon width="25" height="24" className={`text-center mx-auto ${styles.speakerIcon}`} />
                  <div className="text-8 text-primary-400 font-bold mx-auto mt-px-4">
                    {playBackQuestion}
                  </div>
                </button>
              </div>
            </div>
            <div className="mt-px-26">
              {exampleSentence && (
                <div className="py-px-14 px-px-16 mx-px-8 bg-basic-400 rounded-px-4">
                  <p className="font-bold text-primary-500 text-16">
                    例文
                  </p>
                  <p className="font-bold text-14 leading-px-24 text-basic-100">
                    {exampleSentence}
                  </p>
                  <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>
                    {exampleSentenceTranslation}
                  </p>
                  <div className='text-center w-full'>
                    <button
                      onClick={() => playSentence()}
                      disabled={isAudioPlaying}
                      className="disabled:opacity-50"
                    >
                      <SpeakerIcon width="25" height="24" className={`text-center mx-auto ${styles.speakerIcon}`} />
                      <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                        {playBackSentence}
                      </div>
                    </button>
                  </div>
                </div>
              )}
              <div className="px-px-16 mx-px-8 mt-px-8 bg-basic-400 rounded-px-4">
                <p className="pt-px-14 font-bold text-primary-500 text-16">
                  解説
                </p>
                <p className="text-14 font-theme-normal pb-px-34 pt-px-8 leading-relaxed whitespace-pre-wrap">
                  {resultDetail.question.description}
                </p>
              </div>
              {pronunciationTips && (
                <div className="px-px-16 mx-px-8 mt-px-8 bg-basic-400 rounded-px-4">
                  <p className="pt-px-14 mb-px-8 font-bold text-16 leading-px-23 text-primary-500">
                    発音のポイント
                  </p>
                  <p className={`mb-px-34 pb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>
                    {pronunciationTips}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            className={`${styles.buttonGroup} bg-background-200 flex justify-center`}
          >
            <Button
              type="white-square-narrow"
              className="mr-2"
              innerClass={`${styles.buttonSize}
                ${clsx(resultDetailIndex == 0 && 'bg-basic-500')}
              `}
              onClick={() => handlePrev()}
            >
              <p
                className={`text-14 font-bold
                  ${clsx(resultDetailIndex == 0 && 'text-disabled-gray')}
                `}
              >
                前の解説
              </p>
            </Button>
            <Button
              type="white-square-narrow"
              innerClass={`${styles.buttonSize}
                ${clsx(resultDetailIndex === results.length - 1 && 'bg-basic-500')}
              `}
              onClick={() => handleNext()}
            >
              <p
                className={`text-14 font-bold ${styles.buttonSize}
                  ${clsx(resultDetailIndex === results.length - 1 && 'text-disabled-gray')}
                `}
              >
                次の解説
              </p>
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Commentary;
