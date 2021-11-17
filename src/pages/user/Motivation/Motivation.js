import React, { useState, useEffect } from 'react';

import Button from '../../../shared/Button/Button';
import NextButton from '../../../shared/RatingButton/RatingButton';

import styles from './Motivation.module.css';

const Motivation = () => {
  const [phoneWidth, setPhoneWidth] = useState(0);
  const [haveChosen, setHaveChosen] = useState(false);
  const lastButtonText = haveChosen ? '次へ' : 'スキップ';
  const [data, setData] = useState([
    {
      japaneseText: '落ち着いた',
      englishText: 'relaxed',
      clicked: false,
    },
    {
      japaneseText: '忙しい',
      englishText: 'busy',
      clicked: false,
    },
    {
      japaneseText: 'ハッピー',
      englishText: 'happy',
      clicked: false,
    },
    {
      japaneseText: '不安',
      englishText: 'worried',
      clicked: false,
    },
    {
      japaneseText: 'ワクワク',
      englishText: 'motivated',
      clicked: false,
    },
    {
      japaneseText: '退屈',
      englishText: 'bored',
      clicked: false,
    },
    {
      japaneseText: '元気',
      englishText: 'cheerful',
      clicked: false,
    },
    {
      japaneseText: '疲れた',
      englishText: 'tired',
      clicked: false,
    },
  ]);

  const handleClick = (index) => {
    let newArr = [...data];
    newArr[index].clicked = !newArr[index].clicked;
    setData(newArr);
  };

  const setUserMotivation = () => {
    let userMotivation = {};

    data.forEach(item => {
      userMotivation[`is_${item.englishText}`] = item.clicked;
    });

    localStorage.setItem('user_motivation', JSON.stringify(userMotivation));
  };

  useEffect(() => {
    setPhoneWidth(window.innerWidth);
  }, []);

  useEffect(() => {
   let clicked = data.some(dataVal => dataVal.clicked == true);
   setHaveChosen(clicked);
  }, [data]);

  return (
    <div className="grid grid-flow-row place-items-center h-screen w-full bg-primary-500">
      <div className={`${styles.label} self-end text-center text-basic-400`}>
        <div className={`text-14 font-bold mb-px-8 ${styles.stepText}`}>
          Step1 今の気持ち
        </div>
        <div
          className={`${styles.topText} font-bold font-hiragino text-20 mb-px-25`}
        >
          今のあなたの気分は?
        </div>
      </div>
      <div
        className={`${styles.buttonGroup} grid grid-flow-row grid-cols-2 gap-2`}
      >
        {data.map((item, index) => (
          <Button
            key={index}
            onClick={() => {
              handleClick(index);
            }}
            className="flex-1 text-14"
            innerClass={`${
              item.clicked
                ? 'bg-secondary-500 text-basic-500'
                : 'bg-basic-400 text-primary-400'
            } ${styles.button}`}
            type={
              phoneWidth > 320
                ? 'plain-square-wider'
                : 'plain-square-slight-wide'
            }
            withoutFocus
          >
            {item.japaneseText}
            <br/>
            {item.englishText}
          </Button>
        ))}
      </div>
      <div className={`text-14 font-normal text-center text-basic-400 ${styles.bottomText}`}>
        気分を入力すると、それに合わせて <br/>
        最適な学習をオススメします。
      </div>
      <div className={`mb-px-27 flex space-x-2 ${styles.nextButton}`}>
        <NextButton
          buttonText={lastButtonText}
          onClick={() => setUserMotivation()}
          navigateTo="/learning-environment"
        />
      </div>
    </div>
  );
};

export default Motivation;
