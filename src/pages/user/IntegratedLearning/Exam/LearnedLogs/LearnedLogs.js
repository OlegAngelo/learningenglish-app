import React from 'react';

import Button from '../../../../../shared/Button';
import Header from '../../../../../shared/Header';
import CategoryResultSection from './components/CategoryResultSection';

import resultLogData from './resultLogData';

const LearnedLogs = () => {
  const headerTitle = '統合学習 Unit.1 Lesson.1';
  return (
    <div className="min-h-full pb-px-50 bg-basic-400">
      <Header
        hasBack={false}
        title={headerTitle}
      />

      <div className="mt-2 grid grid-cols-1 gap-2 bg-background-200">
        {resultLogData.map((data, index) => (
          <CategoryResultSection
            data={data}
            key={index}
          />
        ))}
      </div>

      <div className="mt-px-2 flex justify-center">
        <Button type="white-square-wider">
          <span className="font-bold">学習終了</span>
        </Button>
      </div>
    </div>
  );
};

export default LearnedLogs;
