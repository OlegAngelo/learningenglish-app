import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../../../../../../shared/Card';
import Table from '../../../../../../../shared/Table';
import BoardComponent from '../BoardComponent';

import {
  lectureExercises,
  exerciseDetails,
} from '../../../../../../../redux/lectures/selectors';

import styles from './QuestionInfo.module.css';

const QuestionInfo = () => {
  const { fetchingLectureExercise } = useSelector((state) => state.lectures);
  const exercises = useSelector(lectureExercises);
  const details = useSelector(exerciseDetails);

  return (
    <Fragment>
      <BoardComponent className="justify-items-end px-0">
        <p className="text-left font-bold text-18 text-background-300 leading-none pb-px-16">
          情報
        </p>
        <div className="grid gap-x-4 grid-cols-3">
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">回答人数</h3>
              <p className="text-16 leading-px-16 pt-px-12 pb-px-12 text-adminGray-800">
                {details.total_participants ?? '-'}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">問題数</h3>
              <p className="text-16 leading-px-16 pt-px-12 pb-px-12 text-adminGray-800">
                {details.total_questions}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-px-16">
              <h3 className="font-bold text-gray-400 text-12 leading-px-12">正答率</h3>
              <p className="text-16 leading-px-16 pt-px-12 pb-px-12 text-adminGray-800">
                {details.total_average_correct}
              </p>
            </div>
          </Card>
        </div>
      </BoardComponent>

      <Table type="basic" className={styles.table}>
        <thead>
          <tr className="text-left">
            <th>問題形式</th>
            <th>問題ID</th>
            <th>正答率</th>
          </tr>
        </thead>
        <tbody>
          {fetchingLectureExercise ? (
            <tr>
              <td colspan="3" align="center">
                読み込み中...
              </td>
            </tr>
          ) : exercises?.length ? (
            exercises.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.question_type_jp}</td>
                  <td>{item.id_name}</td>
                  <td>{item.average_percentage}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colspan="3" align="center">
                確認問題がありません
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default QuestionInfo;
