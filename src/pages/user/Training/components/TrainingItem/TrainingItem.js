import React from 'react';
import { Link } from 'react-router-dom';

import KeyboardArrowRightIcon from '../../../../../shared/icons/KeyboardArrowRight';
import ItemCard from '../../../../../shared/ItemCard';
import styles from './TrainingItem.module.css';

const TrainingItem = ({ index, imageSrc, title, options }) => {
  const isLinkToNull = (option) => option.linkTo === null;

  return (
    <div className={`mx-px-20 mb-px-34 ${styles.trainingItemContainer}`}>
      <div className={`mb-px-9 ${styles[`index${index}Container`]}`}>
        <div className={`text-primary-500 text-24 leading-px-36 font-bold mb-px-14 ${styles[`index${index}Title`]}`}>{title}</div>
        <div className={`flex justify-center ${styles.imageContainer}`}>
          <img src={imageSrc} />
        </div>
      </div>
      <div>
        {options.map((option, index) => (
          <Link key={index} to={!isLinkToNull(option) ? option.linkTo : '#'}>
            <div className="mb-px-16">
              <ItemCard
                bgColor={!isLinkToNull(option) ? 'bg-primary-500' : 'bg-basic-500'}
                width="374px"
                height="60px"
                className="py-px-16 px-px-13 relative"
              >
                <div className="-mt-px-3 pl-px-3">{option.icon}</div>
                <div className={`${!isLinkToNull(option) ? 'text-basic-400' : 'text-basic-300'} pt-px-3 ${styles.name} text-left`}>{option.name}</div>
                {!isLinkToNull(option) ? (
                  <div className="absolute right-px-17 pt-px-1">
                    <KeyboardArrowRightIcon color="#FFFFFF" />
                  </div>
                ) : (
                  <div className={`text-16 font-bold ${styles.comingSoon} text-basic-300 absolute right-px-17 pt-px-4`}>
                    Coming Soon...
                  </div>
                )}
              </ItemCard>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrainingItem;
