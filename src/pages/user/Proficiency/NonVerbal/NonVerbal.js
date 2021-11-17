import React from 'react';

// import GraphSection from './components/GraphSection';
// import ReadingSection from './components/ReadingSection';
// import SpeakingSection from './components/SpeakingSection';
import Footer from '../../../../shared/Footer';
import ProficiencyHeader from '../components/ProficiencyHeader';

const NonVerbal = () => {
  return (
    <div className="pb-28 bg-basic-400 h-screen">
      <ProficiencyHeader title="非言語・異文化" />

      <div className="text-16 font-bold text-center text-primary-300 mt-11 leading-px-23">
        Coming Soon...
      </div>

      {/* <GraphSection />

      <section className="mt-px-18">
        <h2 className="text-18 text-primary-500 font-semibold px-px-20">Can-Do一覧</h2>
        <ReadingSection />
        <SpeakingSection />
      </section> */}

      <div className="fixed left-0 right-0 bottom-0">
        <Footer/>
      </div>
    </div>
  );
};

export default NonVerbal;
