import React, { useState } from 'react';

import Header from '../../../../../shared/Header/Header';
import PauseIcon from '../../../../../shared/icons/PauseIcon';
import Button from '../../../../../shared/Button/Button';
import ResultTop from './components/ResultTop';
import ResultBottom from './components/ResultBottom';
import ResultCubeGraph from './components/ResultCubeGraph';

const Result = (props) => {

  const [countdown, setCountdown] = useState(3);
  if (countdown > 0) {
    return <ResultCubeGraph {...{ countdown, setCountdown }} />;
  }

  return (
    <div>
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full">
          <Header hasBack={false} title="学習結果" titleClass="ml-px-15">
            <PauseIcon />
          </Header>
        </div>
      </div>
      <ResultTop />
      <ResultBottom />
      <div className="py-px-25 flex justify-center">
        <Button type="white-square-wide" innerClass="w-px-88">
          <span className="font-bold">NEXT</span>
        </Button>
      </div>
    </div>
  );
};

export default Result;
