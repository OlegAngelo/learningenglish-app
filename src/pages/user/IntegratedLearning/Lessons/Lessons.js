import React from 'react';

import Footer from '../../../../shared/Footer/Footer';
import Header from '../../../../shared/Header/Header';
import Course from './components/Course/Course';
import Lesson from './components/Lesson/Lesson';
import lessonsData from './lessonsData';

const Lessons = () => {
  return (
    <div className="pb-24">
      <Header
        hasBack={true}
        title="統合学習コース一覧"
      />
      <Course image="/images/person.jpg" title="Unit.1" description="自己紹介" />

      {lessonsData.map((item, index) => (
        <Lesson key={index} title={item.title} types={item.types} attempts={item.attempts} isPaused={item.isPaused} />
      ))}

      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Lessons;
