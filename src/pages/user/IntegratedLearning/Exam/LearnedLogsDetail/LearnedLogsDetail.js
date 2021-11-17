import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../../../shared/Button';
import Header from '../../../../../shared/Header';
import Tag from '../../../../../shared/Tag';
import QuestionnaireItemChoice from './components/QuestionItemChoice';
import { upperCaseFirst } from '../../../../../utils/text';
import resultSummaryData from '../LearnedLogs/resultLogData';

import styles from './LearnedLogsDetail.module.css'

const LearnedLogsDetail = ({ match }) => {
  const headerTitle = '統合学習 Unit.1 Lesson.1';
  const questionID = match.params.questionId;
  const categoryType = match.params.id
  const categoryID = resultSummaryData.findIndex(x => x.categoryType === categoryType);
  const { question } = resultSummaryData[categoryID].results[questionID];
  const sectionTitle = `${upperCaseFirst(resultSummaryData[categoryID].categoryType)} ${resultSummaryData[categoryID].categoryTitle}`;
  const nextQuestion = parseInt(questionID) + 1;
  const previousQuestion = parseInt(questionID) - 1;

  return (
    <div className="min-h-full pb-px-40 bg-background-200">
      <Header
        hasBack={true}
        title={headerTitle}
      />
      <div className="bg-white rounded-px-4 max-w-px-928 mx-2.5 mt-2.5 mb-px-23">
        <div className="pt-px-23 text-center pb-px-28">
          <p className="font-bold text-16 font-hiragino-kaku text-primary-400" >問題解説</p>
          <p className="font-bold text-14 font-hiragino text-basic-100">{sectionTitle}</p>
        </div>

        <div className={styles.tagSpacing} >
          <Tag
            color="lightGray"
            size="l"
            width="113px"
            darkBlue
            pill
          >
            <span className="font-bold text-primary-500">Question. {question.order}</span>
          </Tag>
        </div>

        <div className="pt-px-5 mx-4">
          <p className="font-hiragino text-16 font-bold text-basic-100" >{question.title}</p>
        </div>

        <div className="pt-px-30">
          {question.choice.map((choice, index) => (
            <QuestionnaireItemChoice
              text={choice.item}
              isCorrect={choice.isCorrect}
              key={index}
            />
          ))}
          <hr className={styles.hr} />
        </div>

        <div className="mt-px-25 mx-px-21 pb-px-8">
          <p className="text-center text-14 font-hiragino-kaku font-bold text-primary-400 pb-px-11" >POINT</p>
          <p className={`leading-24.5 font-hiragino-kaku text-14 font-normal text-left  pb-px-25 ${styles.pointText} `} >
            {question.pointDescription}
          </p>
        </div>
      </div>

      <div className="mt-px-3 flex justify-center">
        <Button type="darkblue-square">
          <span className="font-bold">本文を見る</span>
        </Button>
      </div>
      <div className="pt-px-36 flex justify-center">
        <div className="pr-px-8">
          {questionID == 0 ? (
            <button disabled className="cursor-not-allowed flex items-center justify-center focus:outline-none rounded bg-background-100 text-disabled-gray text-14 font-semibold h-px-44 px-px-16 shadow-btn">前の解説</button>
          ) : (
            <Link className="cursor-pointer flex items-center justify-center focus:outline-none rounded bg-basic-400 text-primary-400 text-14 font-semibold h-px-44 px-px-16 shadow-btn" to={`/training/integrated-result/${categoryType}/learned-logs/question/${previousQuestion}`}>前の解説</Link>
          )}
        </div>
        <div>
          {questionID >= resultSummaryData[categoryID].results.length - 1 ? (
            <button disabled className="cursor-not-allowed flex items-center justify-center focus:outline-none rounded bg-background-100 text-disabled-gray text-14 font-semibold h-px-44 px-px-16 shadow-btn">次の解説</button>
          ) : (
            <Link className="cursor-pointer flex items-center justify-center focus:outline-none rounded bg-basic-400 text-primary-400 text-14 font-semibold h-px-44 px-px-16 shadow-btn" to={`/training/integrated-result/${categoryType}/learned-logs/question/${nextQuestion}`}>次の解説</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnedLogsDetail;
