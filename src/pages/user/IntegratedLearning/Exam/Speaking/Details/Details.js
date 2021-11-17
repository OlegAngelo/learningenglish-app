import React from 'react';

import SituationSection from './components/SituationSection';
import CardImage from '../../components/CardImage';
import Header from '../../../../../../shared/Header';
import PauseIcon from '../../../../../../shared/icons/PauseIcon';

import style from './Details.module.css';

const Details = (props) => {
  return (
    <div className="bg-background-200 h-full">
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full">
          <Header hasBack={false} title="統合学習" titleClass="ml-px-15">
            <PauseIcon />
          </Header>
        </div>
      </div>

      <CardImage imgSrc="/images/learning-speaking.png">
        <p className="text-12 text-basic-500 font-bold mt-px-2">
          SPEAKING
        </p>
        <p className={`text-16 text-basic-500 mt-px-12 mb-px-13 ${style.opinion}`}>
          自分の意見を言う
        </p>
      </CardImage>

      <SituationSection />
    </div>
  );
};

export default Details;
