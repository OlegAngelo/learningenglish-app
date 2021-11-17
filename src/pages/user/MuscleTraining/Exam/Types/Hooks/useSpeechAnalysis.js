import { useEffect, useState } from 'react';

import { log } from '../../../../../../utils/loggerHelper';
import questionHelper from '../../../../../../utils/questionHelper';
import { transcript, approximation, correctness } from '../../../../../../api/SpeechAnalysisApi';

export const useSpeechAnalysis = (data) => {
  const [speechResponse, setSpeechResponse] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    learningType,
    correctAnswer,
    choices,
    categories,
    questionItem,
    setAnswers,
    setResult,
    setResponse,
    setWord,
    setSentence,
    setIncorrectIndices,
    setSelected,
    setCanRecord,
    hint,
    timerProps,
  } = data;

  const speechTypeHandler = (recordingBlob) => {
    if (categories === "english-speech-recognition") {
      sendApproximationToAPI(recordingBlob);
    } else {
      if (learningType === "word") {
        sendTranscriptToAPI(recordingBlob);
      } else if (learningType === "phrase") {
        sendCorrectnessToAPI(recordingBlob, correctAnswer);
      } else {
        log("learningType is not defined or invalid");
      }
    }
  }

  /**
   * 
   * word.match(/\b[aA-zZ]\s/g) = matches the letter with spaces after
   * e.g 'C E O' and it returns ['C ','E ']
   *  word.toLowerCase().replaceAll(/\s/g, '') = remove all whitespaces
   * e.g 'C E O' -> 'ceo'
   *  
   */
  const checkData = (word) => {
    let matchWord = word.match(/\b[aA-zZ]\s/g);
    if (matchWord?.length >= 2) {
      return word.toLowerCase().replaceAll(/\s/g, '');
    } 
    
    return word.toLowerCase();
  };

  const handleWordSubmit = (data) => {
    let res = "";
    let responseMessage = "";
    let voiceAnswer = checkData(data.transcript);
    let correctAnswerLowercase = correctAnswer.toLowerCase();

    setSelected(voiceAnswer);
    const responseMessageShouldRelyOnTimer = ['english-speech-recognition'];

    if (voiceAnswer == correctAnswerLowercase) {
      setWord(questionItem.title);
      setResult('correct');
      //set to 80.00 beacuse only 1 word is compared (no need for accuracy rate);

      if (responseMessageShouldRelyOnTimer.includes(categories)) {
        responseMessage = questionHelper.getResponseText(
          timerProps.percentage,
          timerProps.seconds
        );
        setResponse(responseMessage);
      } else {
        responseMessage = questionHelper.getSpeechAnalysisResponse(80.0);
        setResponse(responseMessage);
      }
      res = 'correct';
    } else {
      setWord(voiceAnswer);
      setResult('incorrect');
      setResponse('Keep it up!')
      res = 'incorrect';
      responseMessage = 'Keep it up!';
    }
    setAnswers((answers) => [
      ...answers,
      questionHelper.generateVoiceQuestionResult({
        category: categories,
        questionId: questionItem.id,
        transcription: data.transcript,
        accuracy: data.confidence,
        result: res,
        response: responseMessage,
        timerProps: timerProps,
      }),
    ]);
  }

  const handlePhraseSubmit = (data) => {
    let incorrectWords = data.falsy_and_missing_text;
    const incorrects = [];

    setSentence(data.transcript);
    setSelected(data.transcript);

    incorrectWords.forEach(item => incorrects.push((item.position)-1));

    let res = "";
    let responseMessage = "";

    if (incorrects.length > 0) {
      setIncorrectIndices(incorrects);
      setResult('incorrect');
      res = 'incorrect';
    } else {
      setResult('correct');
      res = 'correct';
    }

    setResponse(questionHelper.getSpeechAnalysisResponse(data.accuracy_rate));
    responseMessage = questionHelper.getSpeechAnalysisResponse(data.accuracy_rate);

    setAnswers((answers) => [
      ...answers,
      questionHelper.generateVoiceQuestionResult({
        category: categories,
        questionId: questionItem.id,
        transcription: data.transcript,
        accuracy: data.accuracy_rate,
        result: res,
        response: responseMessage,
        hint: hint,
        timerProps: timerProps,
      }),
    ]);
  };

  const somethingWentWrong = '予期せぬエラーが発生しました。\n再度お試しください。';
  const pleaseSpeakLouder = '音声の認識に失敗しました。\nもう少し大きな声で発話してください。';

  const serverErrorHandler = (error) => {
    console.error(error);

    setErrorMessage(somethingWentWrong);
    setFetchingData(false);
    setCanRecord(true);
  };

  const sendTranscriptToAPI = async (recordingBlob) => {
    await transcript(recordingBlob)
      .then(response => {
        const { data, status } = response;
        log(status);
        setFetchingData(false);
        if (status !== 200) {
          setErrorMessage(somethingWentWrong);
        } else if (data.transcript === null) {
          setErrorMessage(pleaseSpeakLouder);
        } else {
          setSpeechResponse(data);
          handleWordSubmit(data);
        }
      })
      .catch(error => {
        serverErrorHandler(error);
      });
  }

  const sendCorrectnessToAPI = async (recordingBlob) => {
    await correctness(recordingBlob, correctAnswer)
      .then(response => {
        const { data, status } = response;
        log(status);
        setFetchingData(false);
        if (status !== 200) {
          setErrorMessage(somethingWentWrong);
        } else if (data.transcript === null) {
          setErrorMessage(pleaseSpeakLouder);
        } else {
          setSpeechResponse(data);
          handlePhraseSubmit(data);
        }
      })
      .catch(error => {
        serverErrorHandler(error);
      });
  }

  const sendApproximationToAPI = async (recordingBlob) => {
    await approximation(recordingBlob, correctAnswer, choices)
      .then(response => {
        const { data, status } = response;
        setFetchingData(false);
        if (status !== 200) {
          setErrorMessage(somethingWentWrong);
        } else if (data.transcript == null) {
          setErrorMessage(pleaseSpeakLouder);
        } else {
          //api dont return confidence and this is needed for save result
          data.confidence = null;
          setSpeechResponse(data);
          handleWordSubmit(data);
        }
      })
      .catch(error => {
        serverErrorHandler(error);
      });
  }

  return {
    speechTypeHandler: speechTypeHandler,
    speechResponse,
    setFetchingData,
    fetchingData,
    errorMessage,
    setErrorMessage,
  }
}

export default useSpeechAnalysis;
