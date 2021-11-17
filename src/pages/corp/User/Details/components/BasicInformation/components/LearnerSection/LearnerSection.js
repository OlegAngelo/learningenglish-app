import React from 'react';

import Card from '../../../../../../../../shared/Card/Card';

import styles from './LearnerSection.module.css';

const LearnerSection = () => {
  const learnerData = [
    { text: '会員登録日（メアド登録日）', value: '2020/12/01' },
    { text: '7日間無料登録日（クレカ登録日）', value: '2020/12/01' },
    { text: '利用状況', value: '利用中' },
    { text: 'TOEIC検定スコア', value: '550~630' },
    { text: 'CASEC検定スコア', value: '600~649' },
  ];

  return (
    <div className="mb-px-40">
      <div className="mb-2">
        <p className="text-left font-bold text-18 text-background-300 leading-none">
          情報
        </p>

        <div className="grid gap-4 grid-cols-3 pt-px-16">
          {learnerData &&
            learnerData.map((item, index) => (
              <Card key={index}>
                <div className="p-px-14">
                  <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                    {item.text}
                  </h3>
                  <p
                    className={`${styles.value} font-normal text-16 leading-px-21 pt-px-12`}
                  >
                    {item.value || '-'}
                  </p>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LearnerSection;
