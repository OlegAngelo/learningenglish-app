export const generateSpeechAnalysisRequest = (type, userVoice, choices, correctAnswer) => {
  const options = ['transcript', 'approximation', 'correctness'];
  if (options[0] === type) {
    return {
      type: options[0],
      userVoice: userVoice,
    };
  } else if (options[1] === type) {
    return {
      type: options[0],
      userVoice: userVoice,
      choices: choices,
    };
  } else if (options[2] === type) {
    return {
      type: options[0],
      userVoice: userVoice,
      correctAnswer: correctAnswer
    };
  }
};

export const convertFormData = (blob, correctAnswer, choices) => {
  const formData = new FormData();

  if (blob === null){
    formData.append('speech', blob);
  } else {
    const extension = blob ? blob.type.split('/')[1] : 'audio/wav';
    formData.append('speech', blob, `${Date().valueOf()}.${extension}`);
  }

  //append if type Correctness
  correctAnswer && formData.append('answer', correctAnswer);

  //append if type Approximation
  if (choices !== undefined) {
    formData.append('a', choices[0].choiceText);
    formData.append('b', choices[1].choiceText);
    formData.append('c', choices[2].choiceText);
    formData.append('d', choices[3].choiceText);
  }

  return formData;
}
