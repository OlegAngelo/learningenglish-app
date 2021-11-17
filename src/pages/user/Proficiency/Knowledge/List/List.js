import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import GraphSection from '../../../../../shared/GraphSection';
import UnitBox from './components/UnitBox';
import Footer from '../../../../../shared/Footer';
import ProficiencyHeader from '../../components/ProficiencyHeader';
import Loading from '../../../../../shared/Loading';

import {
  fetchOverallKnowledgeProficiency,
  fetchKnowledgeProficiencyForAllUnits,
} from '../../../../../redux/proficiency/slice';
import {
  overallKnowledge,
  proficiencyForAllUnits,
  calculatePhrasePercentage,
  calculateWordPercentage,
} from '../../../../../redux/proficiency/selectors';

import styles from './List.module.css';

const List = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const overallProficiency = useSelector(overallKnowledge);
  const units = useSelector(proficiencyForAllUnits);
  const { category } = useParams();
  const graphSectionData = {
    overallProficiency: overallProficiency,
    calculatePhrasePercentage: useSelector(calculatePhrasePercentage),
    calculateWordPercentage: useSelector(calculateWordPercentage),
  };

  useEffect(() => {
    dispatch(fetchOverallKnowledgeProficiency()).then(() => setLoading(false));
    dispatch(fetchKnowledgeProficiencyForAllUnits());
    localStorage.setItem('previous_screen', '/proficiency/knowledge/words');

    localStorage.removeItem('breadcrumbs');
  }, []);

  return (
    <div className="h-screen">
      <ProficiencyHeader
        isLoading={loading}
        title="知識"
      />

      {loading ? (
        <Loading
          className="top-6 bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          zIndex="z-0"
        />
      ) : (
        <Fragment>
          <GraphSection
            categoryType={category}
            pathname="/proficiency/knowledge"
            urlChangeable
            data={graphSectionData}
          />
          <div className="mr-px-10 ml-px-9 mt-px-22 pb-32">
            <div
              className={`px-px-10 mb-px-16 font-bold text-18 text-primary-500 font-hiragino ${styles.lineHeight}`}
            >
              単語・フレーズの習熟度
            </div>
            <UnitBox units={units} category={category} />
          </div>
        </Fragment>
      )}

      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default List;
