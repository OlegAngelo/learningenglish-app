import React from 'react';

import BarChart from './components/BarChart';
import DataBox from './components/DataBox';

import styles from './Dashboard.module.css';

const Dashboard = (props) => {
  const barChartDatas = [
    {
      label: '利用ユーザー数',
      backgroundColor: '#0B78D1',
      hoverBackgroundColor: '#0B78D1',
      data: [100, 100, 100, 100, 100, 100, 100],
    },
    {
      label: 'ユーザー学習回数',
      backgroundColor: '#00A48E',
      hoverBackgroundColor: '#00A48E',
      data: [175, 175, 175, 175, 175, 175, 175],
    },
  ];

  const barChartLabels = [
    ['2020/12/01', 'Sun'],
    ['2020/12/02', 'Mon'],
    ['2020/12/03', 'Tue'],
    ['2020/12/04', 'Wed'],
    ['2020/12/05', 'Thu'],
    ['2020/12/06', 'Fri'],
    ['2020/12/07', 'Sat'],
  ];

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full bg-adminGray-100">
      <p className={`${styles.dashboardText} text-14 text-adminGray-500 pb-px-18`}>
        ダッシュボード
      </p>
      <p className="text-20 text-base-dark leading-px-18 font-bold pb-px-33">
        データサマリー
      </p>
      <p className="text-18 text-base-dark leading-px-18 font-bold pb-px-16">
        利用者の状況
      </p>

      <div className="flex mb-px-9">
        <DataBox
          upperText="利用ユーザー数"
          bottomText="0000人"
          iconColor="#0B78D1"
        />
        <DataBox
          upperText="ユーザー学習回数"
          bottomText="0000回"
          iconColor="#00A48E"
        />
      </div>

      <div>
        <BarChart datas={barChartDatas} labels={barChartLabels} />
      </div>
    </div>
  );
};

export default Dashboard;
