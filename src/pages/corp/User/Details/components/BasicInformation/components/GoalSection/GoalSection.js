import React from 'react';
import Parser from 'html-react-parser';

import styles from './GoalSection.module.css';

const GoalSection = () => {
  const goalData = [
    { text: '', value: '高校英語<br />学びなおし', active: false },
    { text: '', value: 'プレゼン<br />内容理解', active: true },
    { text: '', value: '英語原文での<br />情報収集', active: false },
    { text: '', value: '準備をしたうえで<br />会議・プレゼン', active: true },
    { text: '', value: '英語会議<br />内容理解', active: true },
    {
      text: '',
      value: 'テキスト<br />コミュニケー<br />ション',
      active: false,
    },
  ];

  return (
    <div className="mb-px-40">
      <div className="mb-2">
        <p className="text-left font-bold text-18 text-background-300 leading-none mb-5">
          目標
        </p>

        <div>
          <p className="text-left font-bold text-12 text-adminGray-400 leading-none mb-5">
            現在の目標
          </p>
          <p className="text-left font-bold text-14 text-adminGray-900 leading-none mb-5">
            プレゼン　内容理解
          </p>
        </div>

        <div className="mt-4 pt-8">
          <p className="text-left font-bold text-12 leading-none text-adminGray-400 mb-4">
            達成済みの目標
          </p>
          <div className="grid gap-0 grid-cols-6">
            {goalData &&
              goalData.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.goal} ${
                    item.active ? 'bg-adminGray-100' : styles.inactive
                  }`}
                >
                  <p className="text-left font-normal text-12 text-400 leading-none">
                    {item.text || ''}
                  </p>
                  <div className="pt-px-6" />
                  <p className="text-left font-normal text-12 text-400 leading-px-14">
                    {Parser(item.value) || ''}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSection;
