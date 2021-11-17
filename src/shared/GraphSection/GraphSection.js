import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../Button';
import Loading from '../Loading';
import PieChart from '../PieChart';
import Tag from '../Tag/Tag';

import { getZeroPaddedNum } from '../../utils/numberHelpers';
import { pieChartData } from '../../utils/chartData';

import styles from './GraphSection.module.css';

const GraphSection = ({
  categoryType,
  pathname,
  urlChangeable = false,
  setCategoryType,
  data,
}) => {
  const [_, setProgressBarWidth] = useState(0);
  const [pieData, setPieData] = useState({
    words: null,
    phrases: null,
  });
  const history = useHistory();
  const { overallProficiency, calculatePhrasePercentage, calculateWordPercentage } = data;

  const calculatedPercentage = {
    words: calculateWordPercentage,
    phrases: calculatePhrasePercentage,
  };

  const handleResize = () => {
    setProgressBarWidth(0);
    if (window.innerWidth <= 350) {
      setProgressBarWidth(210);
    } else if (window.innerWidth <= 375) {
      setProgressBarWidth(261);
    } else if (window.innerWidth <= 414) {
      setProgressBarWidth(298);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  const getScoreByQuestionType = (type) => {
    for (const [_, data] of Object.entries(calculatedPercentage[categoryType])) {
      if (data.name === type) {
        return data.text;
      }
    }
  };

  useEffect(() => {
    if (pieData[categoryType] === null) {
      setPieData({
        ...pieData,
        [categoryType]: pieChartData(
          getScoreByQuestionType('In Progress'),
          undefined,
          getScoreByQuestionType('Mastered'),
          undefined,
          getScoreByQuestionType('Not Tried'),
          undefined,
          undefined,
          undefined
        ),
      });
    }
  }, [overallProficiency, categoryType]);

  if (pieData[categoryType] === null) {
    return (
      <Loading
        className="bg-background-200"
        iconClass="bg-primary-500 text-primary-500"
        position="top-1/3"
      />
    );
  }

  const handleCategoryChange = (category) => {
    if (setCategoryType) {
      setCategoryType(category);
    }

    if (urlChangeable) {
      history.replace({ pathname: `${pathname}/${category}` });
    }
  };

  return (
    <section className={`${styles.body}bg-primary-50`}>
      <div className="bg-primary-50 align-top pt-0 pb-px-16 pr-px-16 relative">
        <div className={`${styles.learningScore}`}>
          <span className={`text-primary-400 font-theme-bolder text-16`}>
            知識習熟度
          </span>
          <br />
          <span className={`text-secondary-500 font-theme-bolder text-30`}>
            {overallProficiency
              ? getZeroPaddedNum(4, overallProficiency)
              : '0000'}
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
              <span className="font-theme-normal">
                {pieData[categoryType]['pieChart'][0].score}
              </span>
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
              <span className="font-theme-normal">
                {pieData[categoryType]['pieChart'][1].score}
              </span>
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
              <span className="font-theme-normal">
                {pieData[categoryType]['pieChart'][2].score}
              </span>
            </div>
          </div>
        </div>
        <div className={`flex justify-end`}>
          {
            <div className={categoryType !== 'words' ? 'hidden' : ''}>
              <PieChart
                dataset={pieData[categoryType]['pieChart']}
                width="270"
                height="250"
              />
            </div>
          }
          {
            <div className={categoryType !== 'phrases' ? 'hidden' : ''}>
              <PieChart
                dataset={pieData[categoryType]['pieChart']}
                width="270"
                height="250"
              />
            </div>
          }
        </div>
        <div className="flex justify-center -mt-px-15">
          <Button
            type={
              categoryType === 'words' ? 'white-small' : 'white-small-outline'
            }
            onClick={() => handleCategoryChange('words')}
            withoutFocus
          >
            単語
          </Button>
          <Button
            className="ml-px-7"
            type={
              categoryType === 'phrases' ? 'white-small' : 'white-small-outline'
            }
            onClick={() => handleCategoryChange('phrases')}
            withoutFocus
          >
            フレーズ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GraphSection;
