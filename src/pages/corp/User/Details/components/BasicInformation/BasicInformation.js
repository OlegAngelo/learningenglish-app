import React, { useContext } from 'react';

import { TabContext } from '../TabContent/TabContent';
import LearnerSection from './components/LearnerSection/LearnerSection';
import GoalSection from './components/GoalSection/GoalSection';
import PersonalDataSection from './components/PersonalDataSection/PersonalDataSection';
import PlanSection from './components/PlanSection/PlanSection';

const BasicInformation = ({ name: tabName }) => {
  const { tabPosition } = useContext(TabContext);
  const notActive = tabPosition !== tabName ? 'hidden' : '';

  return (
    <div className={notActive}>
      <PersonalDataSection />
      <LearnerSection />
      <GoalSection />
      <PlanSection />
    </div>
  );
};

export default BasicInformation;
