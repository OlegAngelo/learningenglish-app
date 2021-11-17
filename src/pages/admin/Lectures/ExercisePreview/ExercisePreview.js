import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const ExercisePreview = () => {
  const { questionIds } = queryString.parse(useLocation().search);

  return (
    <div className="w-full h-screen bg-black flex justify-center">
      <iframe
        src={`${process.env.REACT_APP_FRONTEND_URL}/admin/training/muscle-exam/5?learningType=phrase&questionType=lecture-training-preview&questionIds=${questionIds}`}
        style={{width: '375px'}}
      ></iframe>
    </div>
  );
};

export default ExercisePreview;
