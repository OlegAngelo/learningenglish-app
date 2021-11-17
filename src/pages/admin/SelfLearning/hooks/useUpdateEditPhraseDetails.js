import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import queryString from 'query-string';

import { rules } from '../../../../config/editPhraseDetailsRules.json';

import { getJPTranslatedForAlert, getJPTranslatedMessages } from './computed';

import useUploadSetAudio from './useUploadSetAudio';

import { saveSetDetails } from '../../../../redux/selfLearning/listening/admin/slice';
import AdminListeningApi from '../../../../api/SelfLearning/Listening/AdminListeningApi';

const useUpdateEditPhraseDetails = ({
  register,
  errors,
  handleSubmit,
  isFetchingPhraseData,
  phraseData,
  setModalProps,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const phraseId = useParams().id;
  const [isSubmittedToApi, setIsSubmittedToApi] = useState(false);
  const [defaultAudio, setDefaultAudio] = useState();
  const [isFetchingAudioData, setisFetchingAudioData] = useState(true);
  const {
    importOnClickHandler,
    setIsShowAlertResultModal,
    isShowUploadModal,
    isShowAlertResultModal,
    uploadModalProps,
    uploadResult: ResultAudio,
    isShowModalPercentage,
    uploadPercentage,
    audioFileName,
    audioRaw,
    setAudioRaw,
  } = useUploadSetAudio({ getJPTranslatedForAlert, getJPTranslatedMessages });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { file, setFile } = uploadModalProps;

  const titleFieldProps = {
    register: register(rules.sentence_jp),
    errors: errors.sentence_jp,
    id: 'sentence_jp',
    name: 'sentence_jp',
  };

  const preSentenceProps = {
    register: register(rules.pre_sentence),
    errors: errors.pre_sentence,
    id: 'pre_sentence',
    name: 'pre_sentence',
  };

  const postSentenceProps = {
    register: register(rules.post_sentence),
    errors: errors.post_sentence,
    id: 'post_sentence',
    name: 'post_sentence',
  };

  const questionFieldProps = {
    preSentenceProps,
    postSentenceProps,
  };

  const firstAnswerFieldProps = {
    register: register(rules.correct_answer),
    errors: errors.correct_answer1,
    id: 'correct_answer1',
    name: 'correct_answer1',
  };

  const secondAnswerFieldProps = {
    register: register(rules.correct_answer),
    errors: errors.correct_answer,
    id: 'correct_answer2',
    name: 'correct_answer2',
  };

  const thirdAnswerFieldProps = {
    register: register(rules.correct_answer),
    errors: errors.correct_answer,
    id: 'correct_answer3',
    name: 'correct_answer3',
  };

  const answerFieldProps = {
    firstAnswerFieldProps,
    secondAnswerFieldProps,
    thirdAnswerFieldProps,
  };

  const uploadFieldProps = {
    importOnClickHandler,
    audioFileName,
    phraseData,
    isFetchingPhraseData,
    audio: phraseData?.audio_file,
    audioRaw,
  };

  const getFormData = (data) => {
    const {
      audio_file,
      level,
      phraseId,
      phraseDetails: {
        sentence_jp,
        pre_sentence,
        post_sentence,
        correct_answer1,
        correct_answer2,
        correct_answer3,
      },
    } = data;
    const formData = new FormData();

    formData.append('file', audio_file ? audio_file[0] : defaultAudio);
    formData.append('level', level);
    formData.append('phraseId', phraseId);
    formData.append('sentence_jp', sentence_jp);
    formData.append('pre_sentence', pre_sentence ?? '');
    formData.append('post_sentence', post_sentence ?? '');
    correct_answer1 && formData.append('correct_answers[0]', correct_answer1);
    correct_answer2 && formData.append('correct_answers[1]', correct_answer2);
    correct_answer3 && formData.append('correct_answers[2]', correct_answer3);

    return formData;
  };

  const handleSumbitToApi = (submittedData) => {
    const formmatedData = getFormData({
      audio_file: file?.upload,
      level: phraseData?.set?.level?.order,
      phraseId,
      phraseDetails: { ...submittedData },
    });

    setIsSubmittedToApi(true);
    dispatch(saveSetDetails(formmatedData))
      .then(({ payload }) => {
        const { status, data } = payload;
        setModalProps(getJPTranslatedForAlert(status));

        if (status === 200) {
          setIsShowAlertResultModal(true);
          setIsSubmitted(true);
          setTimeout(
            () => history.push(`/admin/listening/set/${phraseData.set.key}`),
            5000
          );
        }

        if (status === 500) setIsShowAlertResultModal(true);
      })
      .catch((err) => {
        if (err.toJSON().message !== 'Network Error')
          setIsShowAlertResultModal(true);
      })
      .finally(() => {
        setIsSubmittedToApi(false);
      });
  };

  useEffect(() => {
    AdminListeningApi.fetchAudioData({
      level: phraseData?.set?.level.order,
      fileName: phraseData?.audio_file,
    })
      .then((audio) => {
        setDefaultAudio(
          new File([audio.data], phraseData?.audio_file, {
            type: ['audio/mp3', 'audio/mp4', 'audio/mpeg'],
          })
        );
        setisFetchingAudioData(false);
      })
      .catch((err) => {});
  }, [phraseData]);

  return {
    titleFieldProps,
    questionFieldProps,
    answerFieldProps,
    uploadFieldProps,
    setIsShowAlertResultModal,
    isShowUploadModal,
    isShowAlertResultModal,
    isShowModalPercentage,
    uploadPercentage,
    uploadModalProps,
    handleSumbitToApi,
    file,
    setFile,
    isSubmittedToApi,
    audioFileName,
    audioRaw,
    isFetchingAudioData,
    isSubmitted,
    setIsSubmitted,
  };
};

export default useUpdateEditPhraseDetails;
