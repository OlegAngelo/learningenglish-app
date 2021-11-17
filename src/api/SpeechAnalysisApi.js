import axios from 'axios';

import { convertFormData } from '../utils/speechAnalysisHelper';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_SPEECH_ANALYSIS_API}/api/`,
  headers: {
    'content-type': 'multipart/form-data',
    'Authorization': `sampleAccessKey`,
  }
});

export const transcript = (blob) => {

  const options = {
    method: 'POST',
    url: `speech`,
    data: convertFormData(blob),
  };

  return API.request(options);
};

export const approximation = (blob, correctAnswer, choices) => {
  const options = {
    method: 'POST',
    url: `answer`,
    data: convertFormData(blob, correctAnswer, choices),
  };

  return API.request(options);
};

export const correctness = (blob, correctAnswer) => {
  const options = {
    method: 'POST',
    url: `compare`,
    data: convertFormData(blob, correctAnswer.replace('’', '\'')),
  };

  return API.request(options);
};

