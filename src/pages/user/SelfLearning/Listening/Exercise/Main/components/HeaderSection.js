import React from 'react';

import Header from '../../../../../../../shared/Header';
import HeaderClose from '../../../../../../../shared/Header/Close';

import useSLListeningExercise from './useSLListeningExercise';

const HeaderSection = (props) => {
  const { level } = useSLListeningExercise();

  return (
    <Header 
      title={`Level ${level.order} Listening`} 
      hasBack={false} 
      rootClass="fixed w-full z-10"
    >
      <HeaderClose
        setInterrupted={() => {}}
        resetExamState={() => {}}
        isFromSLListening
      />
    </Header>
  );
};

export default HeaderSection;
