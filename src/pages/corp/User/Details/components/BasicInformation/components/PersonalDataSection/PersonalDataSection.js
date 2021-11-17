import React from 'react';

import styles from './PersonalDataSection.module.css';

const PersonalDataSection = () => {
  const personalData = [
    { text: '名前', value: '佐藤 佑樹' },
    { text: 'メールアドレス', value: 'yuki.sato@edgeschool.co.jp' },
    { text: '年齢', value: '23' },
    { text: 'グループ', value: 'グループ名0000000001' },
  ];

  return (
    <div className="mb-px-40">
      <div className="mb-2">
        <div className="grid gap-4 grid-cols-3 pt-px-16">
          {personalData &&
            personalData.map((item, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-400 text-12 leading-px-12">
                  {item.text}
                </h3>
                <p
                  className={`${
                    styles.value
                  } font-normal text-14 leading-px-21 pt-px-12 pb-5 ${
                    index === 0 ? styles.name : ''
                  }`}
                >
                  {item.value || '-'}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalDataSection;
