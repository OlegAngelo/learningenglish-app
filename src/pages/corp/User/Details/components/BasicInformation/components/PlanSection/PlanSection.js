import React from 'react';
import Parser from 'html-react-parser';

import Card from '../../../../../../../../shared/Card/Card';

import styles from './PlanSection.module.css';

const PlanSection = () => {
  const planData = [
    { text: '課金プラン', value: 'サブスク（1ヶ月)<br />2021/11/01終了' },
  ];

  return (
    <div className="mb-px-40">
      <div className="mb-2">
        <p className="text-left font-bold text-18 text-background-300 leading-none">
          プラン情報
        </p>

        <div className="grid gap-4 grid-cols-3 pt-px-16">
          {planData &&
            planData.map((item, index) => (
              <Card key={index}>
                <div className="p-px-14">
                  <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                    {item.text}
                  </h3>
                  <p
                    className={`${styles.value} font-normal text-16 leading-px-21 pt-px-12`}
                  >
                    {Parser(item.value) || '-'}
                  </p>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSection;
