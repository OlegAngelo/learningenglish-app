import React from 'react';

import ContentSection from './components/ContentSection';
import HeaderSection from './components/HeaderSection';
import Footer from '../../../../shared/Footer';

import useNewsHistory from '../../../../hooks/useNewsHistory';

const Index = () => {
  useNewsHistory();

  return (
    <div className="w-full h-screen bg-background-200">
      <HeaderSection />
      <ContentSection />
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
