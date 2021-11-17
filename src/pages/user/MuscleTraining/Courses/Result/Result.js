import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import GraphSection from '../../../../../shared/GraphSection';
import Footer from '../../../../../shared/Footer';
import Header from '../../../../../shared/Header';
import Loading from '../../../../../shared/Loading';
import Menu from '../../../../../shared/Menu';
import Button from '../../../../../shared/Button';
import Tab from '../../../../../shared/Menu/components/Tab';
import LearningLog from '../../Exam/components/LearningLog';

import {
  fetchOverallKnowledgeProficiencyByUnit,
  fetchKnowledgeProficiencyForAllUnits,
} from '../../../../../redux/proficiency/slice';
import { fetchMuscleTrainingResult, fetchMuscleTrainingResultByUnit } from '../../../../../redux/training/slice';
import { getTrainingResults, getTrainingUnit, getTrainingResultsByUnit } from '../../../../../redux/training/selectors';
import {
  overallKnowledgeByUnit,
  calculatePhrasePercentageByUnit,
  calculateWordPercentageByUnit,
} from '../../../../../redux/proficiency/selectors';

import style from './Result.module.css';

const IntegratedTrainingLog = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const lessonType = localStorage.getItem('learning_log_lesson_type') !== null
    ? localStorage.getItem('learning_log_lesson_type')
    : 'muscle-training-word';
  const dispatch = useDispatch();
  const trainingResults = useSelector(getTrainingResults);
  const trainingResultsByUnit = useSelector(getTrainingResultsByUnit);
  const trainingUnit = useSelector(getTrainingUnit);
  const prevPage = localStorage.getItem('course_result_prev_page');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryType, setCategoryType] = useState('words');
  const graphSectionData = {
    overallProficiency: useSelector(overallKnowledgeByUnit),
    calculatePhrasePercentage: useSelector(calculatePhrasePercentageByUnit),
    calculateWordPercentage: useSelector(calculateWordPercentageByUnit),
  };

  useEffect(() => {
    let unitID = courseId;

    if (localStorage.learning_log_training_unit) {
      unitID = JSON.parse(localStorage.getItem('learning_log_training_unit'));
    }

    dispatch(fetchOverallKnowledgeProficiencyByUnit(unitID));
    dispatch(fetchKnowledgeProficiencyForAllUnits());
    localStorage.setItem('course_result_id', courseId);
    if (prevPage === 'muscle-courses') {
      dispatch(fetchMuscleTrainingResultByUnit(courseId)).then(() => {
        setIsLoading(false);
      });
    } else {
      dispatch(fetchMuscleTrainingResult(courseId)).then(() => {
        setIsLoading(false);
      });
    }
    getCategoryType();

    return () => setIsLoading(true);
  }, []);

  const getLessonType = () => {
    return (lessonType === 'muscle-training-phrase') ? 'phrase' : 'word';
  };

  const getCategoryType = () => {
    return (lessonType === 'muscle-training-phrase') ? setCategoryType('phrases') : setCategoryType('words');
  }

  return (
    <div className="pb-32 h-screen">
      <div className="fixed top-0 z-10 w-full">
        <Header
          hasBack={true}
          title={trainingUnit.name}
          rootClass={style.trainingLogHeader}
          titleClass="h-px-20"
        />
        <div className={style.trainingLogTab}>
          <Menu
            bgColor="primary-500"
            spaceX="7"
            paddingX="4"
            paddingY="3"
          >
            <Link to={`/training/muscle-courses/${courseId}/lesson-log/result`}>
              <Tab type="rounded3" isActive>学習結果</Tab>
            </Link>
            <Link
              className={trainingUnit.id ? '' : style.disabledLink}
              to={`/training/muscle-courses/${trainingUnit.id}/lesson-log/words`}
            >
              <Tab type="rounded3">単語</Tab>
            </Link>
            <Link
              className={trainingUnit.id ? '' : style.disabledLink}
              to={`/training/muscle-courses/${trainingUnit.id}/lesson-log/phrases`}
            >
              <Tab type="rounded3">フレーズ</Tab>
            </Link>
          </Menu>
        </div>
      </div>

      {isLoading ? (
        <Loading
          className="top-6 bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          height="h-screen"
          zIndex="z-0"
        />
      ) : (
        <div className="mt-px-110 pt-px-5">
          <GraphSection
            categoryType={categoryType}
            setCategoryType={setCategoryType}
            pathname={`/training/muscle-courses/${courseId}/lesson-log/result`}
            data={graphSectionData}
          />

          <div className="pb-px-100">
            <p className="px-2 pt-4 text-primary-500 font-theme-bolder text-18 font-hiragino">
              {`筋トレ ${trainingUnit.name}`}
            </p>
            {prevPage === 'learning-logs' ? (
              <LearningLog muscleTrainingResult={trainingResults} />
            ) : (
              <Fragment>
                {(trainingResultsByUnit.words.length > 0 && categoryType === 'words') && (
                  <LearningLog
                    categoryType={categoryType}
                    muscleTrainingResult={trainingResultsByUnit.words}
                  />
                )}
                {(trainingResultsByUnit.phrases.length > 0 && categoryType === 'phrases') &&(
                  <LearningLog
                    categoryType={categoryType}
                    muscleTrainingResult={trainingResultsByUnit.phrases}
                  />
                )}
              </Fragment>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default IntegratedTrainingLog;
