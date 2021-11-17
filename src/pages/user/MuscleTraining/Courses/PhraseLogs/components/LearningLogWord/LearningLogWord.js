import React from 'react';
import Button from '../../../../../../../shared/Button';
import Tag from '../../../../../../../shared/Tag';

import style from './LearningLogWord.module.css';

const LearningLogWord = () => {
  return (
    <div>
      <div className={`${style.headerBorder}`}></div>
      <div className={`h-auto ${style.logWordCard}`}>
        <div className={`flex justify-between ${style.logWordCardContent}`}>
          <div className="font-hiragino-kaku">
            <div
              className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}` }
            >
              agree with 〜
            </div>
            <div className="font-normal text-basic-200 text-14">
              〜に賛成する
            </div>
          </div>
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
        </div>
      </div>
      <div className={`h-auto ${style.logWordCard}`}>
        <div className={`flex justify-between ${style.logWordCardContent}`}>
          <div className="font-hiragino-kaku">
            <div
              className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}` }
            >
              make a point
            </div>
            <div className="font-normal text-basic-200 text-14">
              主張の正しいことを示す、要点をわかってもらう
            </div>
          </div>
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
        </div>
      </div>
      <div className={`h-auto ${style.logWordCard}`}>
        <div className={`flex justify-between ${style.logWordCardContent}`}>
          <div className="font-hiragino-kaku">
            <div
              className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}` }
            >
              deal with ～
            </div>
            <div className="font-normal text-basic-200 text-14">
              ～に取り組む
            </div>
          </div>
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
        </div>
      </div>
      <div className={`h-auto ${style.logWordCard}`}>
        <div className={`flex justify-between ${style.logWordCardContent}`}>
          <div className="font-hiragino-kaku">
            <div
              className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}` }
            >
              Term of Employment
            </div>
            <div className="font-normal text-basic-200 text-14">契約期間</div>
          </div>
          <div className="self-center">
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
          </div>
        </div>
      </div>
      <div className={`h-auto ${style.logWordCard}`}>
        <div className={`flex justify-between ${style.logWordCardContent}`}>
          <div className="font-hiragino-kaku">
            <div
              className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}` }
            >
              Please refer to the attachment.
            </div>
            <div className="font-normal text-basic-200 text-14">
              添付のファイルをご参照ください
            </div>
          </div>
          <div className="self-center">
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
          </div>
        </div>
      </div>
      <div className={`h-auto ${style.logWordCard}`}>
        <div className={`flex justify-between ${style.logWordCardContent}`}>
          <div className="font-hiragino-kaku">
            <div
              className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}` }
            >
              We have no choice but 〜
            </div>
            <div className="font-normal text-basic-200 text-14">
              ～するほかに選択肢がない
            </div>
          </div>
          <div className="self-center">
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
          </div>
        </div>
      </div>
      <div className={`h-auto ${style.logWordCard}`}>
        <div className={`flex justify-between ${style.logWordCardContent}`}>
          <div className="font-hiragino-kaku">
            <div
              className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}` }
            >
              Term of Employment
            </div>
            <div className="font-normal text-basic-200 text-14">契約期間</div>
          </div>
          <div className="self-center">
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
          </div>
        </div>
      </div>

      <Button
        className={`flex justify-center pb-px-32 bg-background-200 ${style.learningLogWordButton}`}
        type="white-bold"
      >
        トレーニングを再チャレンジ
      </Button>
    </div>
  );
};

export default LearningLogWord;
