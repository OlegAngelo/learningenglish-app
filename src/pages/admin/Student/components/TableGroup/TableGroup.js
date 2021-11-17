import React from 'react';

import Table from '../../../../../shared/Table';
import EditIcon from '../../../../../shared/icons/EditIcon';

import style from './TableGroup.module.css';

const TableGroup = (props) => {
  const tableData = [
    ['筋トレ', '4', '00:45;45'],
    ['統合', '2', '00:45;45'],
    ['実践', '1', '00:45;45'],
    ['合計', '7', '12:45;45'],
  ];

  return (
    <div className={`w-full ml-px-32 ${style.tableGround}`}>
      <div className="w-full">
        <div className={`h-px-60 bg-adminPrimary-800 flex items-center ${style.table1}`}>
          <p className="text-basic-400 text-16 leading-px-16 ml-px-23">
            2020/12/20（金）
          </p>
        </div>
        <Table type="basic" className={`${style.table1} ${style.hasTotal}`}>
          <thead>
            <tr className="text-left">
              <th>学習</th>
              <th>回数</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x[0]}</td>
                  <td>{x[1]}</td>
                  <td>{x[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <p className="text-16 text-base-dark leading-px-16 font-bold mt-px-21 mb-px-12 ml-px-8">
        筋トレ
      </p>

      <Table type="basic" className={style.table2}>
        <thead>
          <tr className="text-left">
            <th>コース</th>
            <th>トレーニング</th>
            <th>時間</th>
            <th>集中度</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((x, i) => {
            return (
              <tr key={i}>
                <td>Unit.01</td>
                <td>クイックスタート</td>
                <td>単語</td>
                <td>集中度MAX</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <p className="text-16 text-base-dark leading-px-16 font-bold mt-px-25 mb-px-12 ml-px-8">
        統合学習
      </p>

      <Table type="basic" className={style.table3}>
        <thead>
          <tr className="text-left">
            <th>コース</th>
            <th>トレーニング</th>
            <th>集中度</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2].map((x, i) => {
            return (
              <tr key={i}>
                <td>Unit.01 Lesson.01 自己紹介</td>
                <td>クイックスタート</td>
                <td>集中度MAX</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className={`flex justify-between ${style.table4}`}>
        <p className="text-16 text-base-dark leading-px-16 font-bold mt-px-21 mb-px-12 ml-px-8">
          実践
        </p>
        <div className="mt-px-16 mr-px-34">
          <EditIcon color="#0D89EE" height="24px" width="24px" />
          <span className="text-14 ml-px-4 text-adminPrimary-400 leading-px-14">
            編集
          </span>
        </div>
      </div>

      <Table type="basic" className={style.table4}>
        <thead>
          <tr className="text-left">
            <th>コース</th>
            <th>学習ポイント</th>
            <th>集中度</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>〇〇先生講義</td>
            <td>60分</td>
            <td>集中度MAX</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableGroup;
