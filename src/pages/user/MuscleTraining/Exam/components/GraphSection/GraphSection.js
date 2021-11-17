import React from 'react';

import Button from '../../../../../../shared/Button/Button';
import PieChart from '../../../../../../shared/PieChart';
import Tag from '../../../../../../shared/Tag/Tag';

import { getZeroPaddedNum } from '../../../../../../utils/numberHelpers';

import styles from './GraphSection.module.css';

const GraphSection = ({
  categoryType,
  overAllScore,
  data
}) => {

  return (
    <section className={`${styles.body}bg-primary-50`}>
      <div className="bg-primary-50 align-top pt-0 pb-px-16 pr-px-16 relative">
        <div className={`${styles.learningScore}`}>
          <span className={`text-primary-400 font-theme-bolder text-16`}>知識習熟度</span>
          <br />
          <span className={`text-secondary-500 font-theme-bolder text-30`}>
            {overAllScore ? getZeroPaddedNum(4, overAllScore) : '0000'}
          </span>
          <br />
          <div className="pt-px-12 inline-flex">
            <Tag
              className="font-theme-bolder"
              color="orange"
              size="s"
              width="82px"
              light
            >
              Mastered
            </Tag>
            <div className="ml-px-8 text-14 font-theme-normal text-primary-500">
              <span className="font-theme-normal">{data[0].score}</span>
              {data[0].diffText !== 0 && (
                <span className="ml-px-5 font-theme-bolder">{data[0].masterSign}{data[0].diffText}</span>
              )}
            </div>
          </div>
          <br />
          <div className="pt-px-2 inline-flex">
            <Tag
              className="font-theme-bolder text-primary-500"
              color="teal"
              size="s"
              width="82px"
              darkBlue
            >
              In Progress
            </Tag>
            <div className="ml-px-8 text-14 font-theme-normal text-primary-500">
              <span className="font-theme-normal">{data[1].score}</span>
              {data[1].diffText !== 0 && (
                <span className="ml-px-5 font-theme-bolder">{data[1].inProgressSign}{data[1].diffText}</span>
              )}
            </div>
          </div>
          <br />
          <div className="pt-px-2 inline-flex">
            <Tag
              className="font-theme-bolder"
              color="darkGray"
              size="s"
              width="82px"
              light
            >
              Not Tried
            </Tag>
            <div className="ml-px-8 text-14 font-theme-normal text-primary-500">
              <span className="font-theme-normal">{data[2].score}</span>
            </div>
          </div>
        </div>
        <div className={`flex justify-end`}>
          <PieChart
            dataset={data}
            width="270"
            height="250"
          />
        </div>
        <div className="flex justify-center -mt-px-16">
            <Button type="white-small">
              {categoryType === 'word' ? '単語' : 'フレーズ'}
            </Button>
        </div>
      </div>
    </section>
  );
};

export default GraphSection;
