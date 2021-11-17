import React from 'react';
import HTMLReactParser from 'html-react-parser';

import ChevronRightIcon from '../../../../../shared/icons/ChevronRightIcon';
import Tag from '../../../../../shared/Tag/Tag';
import styles from './UnitBox.module.css';
import LevelStar from '../../../../../shared/Level';
import CheckIcon from '../../../../../shared/icons/CheckIcon';

const UnitBox = ({
  className,
  title,
  description,
  description2,
  session,
  categoryLabelText,
  hasArrowRight = false,
  ...props
}) => {
  const getWidthValue = () => {
    if (description === 'クイックスタート') {
      return '104';
    } else if (description === 'コース選択') {
      return '75';
    } else if (description === '復習') {
      return '35';
    }
  };

  return (
    <div
      className={`bg-white relative border border-primary-100 box-border text-basic-100 font-bold ${styles.unitCard}`}
    >
      <div>
        <div className="ml-px-20 mr-px-16">
          <div className={`inline-flex ${styles.tagContent}`}>
            {props.live && (
              <Tag
                className={`font-theme-normal text-white bg-primary-500 mr-px-8 ${styles.tag}`}
                color="darkblue"
                size="xs"
                width={`${getWidthValue}px`}
                pill
                light
              >
                LIVE
              </Tag>
            )}
            <Tag
              className={`font-theme-normal ${styles.tag}`}
              color="gray"
              size="xs"
              width={`${getWidthValue}px`}
              pill
              weightLight
            >
              {description}
            </Tag>
            { description2 &&
              <Tag
                className={`ml-px-4 font-theme-normal ${styles.tag}`}
                color="gray"
                size="xs"
                width={`${getWidthValue}px`}
                pill
                weightLight
              >
                {description2}
              </Tag>
            }
            <label className="ml-px-8">
              {!props.paragraphclassname ? (
                <span className="text-black text-12 font-theme-normal">
                  {session ? session.learning_set_count : '0'} セット ／{' '}
                  {session ? session.total_study_time : '0:00:00'}
                </span>
              ) : (
                <div className="flex">
                  <div className="pb-px-4">
                    <LevelStar level={props.level} />
                  </div>
                  {props.isfinished && (
                    <>
                      <div className="px-px-8">
                        <CheckIcon color="#044071" />
                      </div>
                      <div className="font-normal text-12 font-hiragino text-primary-500">
                        <p className="pt-px-4">
                          {props.wpm && `WPM ${props.wpm}`}
                        </p>
                      </div>
                    </>
                  )}
                  {props.withMaterials && (
                    <div className="pl-px-10 font-normal text-12 font-hiragino text-black">
                      <p className="pt-px-6">確認問題有</p>
                    </div>
                  )}
                </div>
              )}
            </label>
          </div>
          <div className={`my-px-11 flex`} {...props}>
            <p
              className={`font-theme-bolder leading-px-21 ${session?.news_id ? 'text-14' : 'text-16'} ${
                !props.paragraphclassname
                  ? `flex-none`
                  : props.paragraphclassname
              } `}
            >
              {HTMLReactParser(title)}
            </p>
            <div className="absolute right-12">
              <p
                className={`text-center flex-wrap bg-primary-500 text-white ${styles.categoryLabel}`}
              >
                {categoryLabelText}
              </p>
            </div>
          </div>
        </div>
        {hasArrowRight && (
          <div className={`absolute ${styles.arrowRightIcon}`}>
            <ChevronRightIcon />
          </div>
        )}
      </div>
    </div>
  );
};

UnitBox.defaultProps = {
  className: '',
  title: 'Unit 1 自己紹介',
  description: 'クイックスタート',
  session: null,
};

export default UnitBox;
