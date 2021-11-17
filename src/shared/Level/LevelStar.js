import React from 'react';
import StarIcon from '../icons/StarIcon';
import StarIconBorder from '../icons/StarIconBorder';

const LevelStar = ({ level }) => {
  const levelArray = new Array();
  for (let index = 0; index < 3; index++) {
    if (index < level) levelArray.push(<StarIcon key={index} />);
    else levelArray.push(<StarIconBorder key={index} />);
  }

  return <div>{levelArray}</div>;
};

export default LevelStar;
