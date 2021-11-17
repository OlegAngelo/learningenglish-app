import React, { Fragment } from 'react';

import Button from '../../../../../../../shared/Button';
import ResultCard from '../LogCard';
import Tag from '../../../../../../../shared/Tag';

import style from './LearningLogSection.module.css';

const LearningLogSection = () => {
  const results = [
    {
      title: 'conference',
      subtitle: '会議',
      tagsNo: 1,
    },
    {
      title: 'agenda',
      subtitle: '協議事項',
      tagsNo: 1,
    },
    {
      title: 'objective',
      subtitle: '目的',
      tagsNo: 1,
    },
    {
      title: 'Employment',
      subtitle: '雇用',
      tagsNo: 2,
    },
    {
      title: 'Term',
      subtitle: '期間',
      tagsNo: 2,
    },
    {
      title: 'opinion',
      subtitle: '意見',
      tagsNo: 2,
    },
    {
      title: 'suggest',
      subtitle: '提案',
      tagsNo: 3,
    },
    {
      title: 'Employment',
      subtitle: '雇用',
      tagsNo: 3,
    },
  ];

  return (
    <div className="pt-px-10">
      {results.map((result, i) => {
        return (
          <ResultCard title={result.title} subtitle={result.subtitle} key={i}>
            {result.tagsNo === 1 && (
              <div className="flex">
                <Tag 
                  color="orange" 
                  size="m" 
                  width="115.61px" 
                  light
                >
                  Mastered !
                </Tag>
              </div>
            )}
            {result.tagsNo === 2 && (
              <div className="flex">
                <Tag 
                  color="darkGreen" 
                  size="m" 
                  width="115.61px" 
                  light
                >
                  In Progress
                </Tag>
              </div>
            )}
            {result.tagsNo === 3 && (
              <div className="flex">
                <Tag 
                  color="darkGray" 
                  size="m" 
                  width="115.61px" 
                  light
                >
                  Not Tried
                </Tag>
              </div>
            )}
          </ResultCard>
        );
      })}

      <Button
        className={`flex justify-center pb-px-32 bg-background-200 ${style.learningLogWordButton}`}
        type="white-bold"
      >
        トレーニングを再チャレンジ
      </Button>
    </div>
  );
};

export default LearningLogSection;
