import React from 'react';
import StarIcon from '../../../../../shared/icons/StarIcon';
import StarIconBorder from '../../../../../shared/icons/StarIconBorder';

const LevelStar = ({ level, classname = '' }) => {
  const levelArray = new Array();
  for (let index = 0; index < 3; index++) {
    if (index < level) levelArray.push(<StarIcon key={index} classname={classname} />);
    else levelArray.push(<StarIconBorder key={index} classname={classname} />);
  }

  return <div>{levelArray}</div>;
};

export default LevelStar;
