import React from 'react';

// import GraphSection from './components/GraphSection';
// import SkillSet from './components/SkillSet';
import Footer from '../../../../shared/Footer';
import ProficiencyHeader from '../components/ProficiencyHeader';

const Skill = () => {
  return (
    <div className="pb-24 bg-basic-400 h-screen">
      <ProficiencyHeader title="技能" />

      <div className="text-16 font-bold text-center text-primary-300 mt-11 leading-px-23">
        Coming Soon...
      </div>

      {/* <GraphSection />

      <SkillSet /> */}

      <div className="fixed left-0 right-0 bottom-0">
        <Footer/>
      </div>
    </div>
  );
};

export default Skill;
