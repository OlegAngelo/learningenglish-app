import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LearningLog from '../components/LearningLog/';

import Header from '../../../../../shared/Header/Header';
import Loading from '../../../../../shared/Loading';
import Footer from '../../components/QuestionnaireFooter';
import GraphSection from '../components/GraphSection';

import styles from './Result.module.css';

import { pieChartData } from '../../../../../utils/chartData';

import { fetchMuscleTrainingResult, fetchOverAllProficiencyByUnit } from '../../../../../redux/training/slice';
import { getTrainingResults, getTrainingOverallProficiencyScore, getTrainingProficiencyData, getTrainingUnit } from '../../../../../redux/training/selectors';

const Result = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pieData, setPieData] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const overAllScore = useSelector(getTrainingOverallProficiencyScore);
  const proficiencyData = useSelector(getTrainingProficiencyData)
  const trainingResults = useSelector(getTrainingResults);
  const trainingUnit = useSelector(getTrainingUnit);
  const trainingResultId = localStorage.getItem('log_learn_session_id');
  const unitId = localStorage.getItem('unit_id');
  const selectedLessonType = localStorage.getItem('selected_lesson_type');

  useEffect(() => {
    dispatch(fetchOverAllProficiencyByUnit(unitId)).then(() => {
      dispatch(fetchMuscleTrainingResult(trainingResultId)).then(() => {
        setFetchingData(false);
      });
    });
  }, []);

  useEffect(() => {
    if (proficiencyData) {
      getDiffProficiency(proficiencyData);
    }
  }, [proficiencyData]);

  const nextQuestionHandler = () => {
    history.push(`/training/muscle-result/question/${id}?questionType=${selectedLessonType}s`);
  };

  const getDiffProficiency = (data) => {
    let masterDiff = 0;
    let inProgressDiff = 0;
    let currentScores = data[selectedLessonType];
    let masterCount = currentScores.masterCount;
    let masterPrevCount = currentScores.masterCount;
    let inProgressCount = currentScores.inProgressCount;
    let notTriedCount = currentScores.notTriedCount;
    let masterSign = '+';
    let inProgressSign = '+';

    let initProficiency = localStorage.getItem('initialTotalProficiency');
    let initScores = JSON.parse(initProficiency)[selectedLessonType];

    masterPrevCount = initScores.masterCount;
    inProgressCount = initScores.inProgressCount;
    masterDiff = currentScores.masterCount - initScores.masterCount;
    inProgressDiff = currentScores.inProgressCount - initScores.inProgressCount;
    if (masterDiff < 0) {
      masterSign = '-';
    }

    if (inProgressDiff < 0) {
      inProgressSign = '-';
    }
    setPieData(pieChartData(
        inProgressCount,
        Math.abs(inProgressDiff),
        masterCount,
        Math.abs(masterDiff),
        notTriedCount,
        masterSign,
        inProgressSign,
        masterPrevCount,
      )
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full">
          <Header hasBack={false} title="学習結果" />
        </div>
      </div>
      {fetchingData && trainingUnit ? (
        <Loading
          className="bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          position="top-1/3"
          height="h-screen"
          rootPosition="relative"
        />
      ) : (
        <div>
          <GraphSection
            categoryType={selectedLessonType}
            overAllScore={overAllScore}
            data={pieData['pieChart']}
          />
          <div className="pb-px-100">
            <p className="px-2 pt-4 text-primary-500 font-theme-bolder text-18 font-hiragino">
                {`筋トレ ${trainingUnit.name ? trainingUnit.name : ''}`}
            </p>
            <LearningLog muscleTrainingResult={trainingResults} />
          </div>
        </div>
      )}

      <Footer hasNext={true} nextQuestion={() => nextQuestionHandler()} />
    </div>
  );
};

export default Result;
