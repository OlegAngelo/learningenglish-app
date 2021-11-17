import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Course from '../../components/CourseList';
import Footer from '../../../../../shared/Footer';
import Header from '../../../../../shared/Header';
import Loading from '../../../../../shared/Loading';
import ItemCard from '../../../../../shared/ItemCard';
import Alert from '../../../../../shared/Alert';
import QuickstartOption from '../../../Dashboard/components/QuickstartOption';
import CheckListIcon from '../../../../../shared/icons/CheckListIcon';

import { fetchUnitList } from '../../../../../redux/unit/slice';
import { unitList } from '../../../../../redux/unit/selectors';
import { getUrlBasedOnLastTrainingTime } from '../../../../../utils/trainingHelper';
import { fetchLastMotivationTimestamp } from '../../../../../redux/training/slice';
import { lastMotivationTimestamp } from '../../../../../redux/training/selectors';

import styles from './List.module.css';

const List = () => {
  const dispatch = useDispatch();
  const units = useSelector(unitList);
  const [loading, setLoading] = useState(true);
  const motivationTimestamp = useSelector(lastMotivationTimestamp);
  const history = useHistory();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const headerProps = {
    hasBack: true,
    title: '筋トレメニュー一覧',
  };

  useEffect(() => {
    dispatch(fetchUnitList());
    dispatch(fetchLastMotivationTimestamp()).then(() => {
      setLoading(false);
    });

    localStorage.removeItem('learning_log_training_unit');

    // Set previous_screen for `checkCurrentRoute()` in `src/shared/Header/Header.js`
  }, []);

  useEffect(() => {
    if (location.params) {
      setIsShowModal(location.params.message);
      setErrorMessage(location.params.message);
    }
  },[location]);

  const handleRedirectToQuickStart = (learningType) => {
    const questionType = 'quick-start';
    const route = `/training/muscle-exam?learningType=${learningType}&questionType=${questionType}`;

    localStorage.setItem('unit_id', null);
    localStorage.setItem('prev_route', '/training/muscle-courses');
    localStorage.setItem('selected_question_type', questionType);

    history.push(getUrlBasedOnLastTrainingTime(motivationTimestamp, route, learningType));
  };

  const handleRedirectToCheckList = (learningType) => {
    const route = `/proficiency/knowledge/check-list/${learningType}`;
    localStorage.setItem('previous_screen', '/training/muscle-courses');

    history.push(route);
  };

  return loading ? (
    <div className="h-screen">
      <Header
        {...headerProps}
        rootClass="fixed z-10 w-full"
      />
      <Loading
        className="top-0 bg-background-200"
        iconClass="bg-primary-500 text-primary-500"
        zIndex="z-0"
      />
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  ) : (
    <div className={styles.list}>
      <Header {...headerProps} />
      <div className={`bg-basic-400 ${styles.listContent}`}>
        <h1 className={`mt-px-20 text-primary-500 text-18 font-bold mx-auto ${styles.titleLabel}`}>
          学習内容をおまかせ！
        </h1>
        <div className={styles.buttons}>
          <div
            className="pt-px-6"
            onClick={() => handleRedirectToQuickStart('word')}
          >
            <ItemCard
              bgColor='bg-primary-500'
              width="343px"
              height="60px"
            >
              <QuickstartOption
                subTitle="クイックスタート"
                buttonText="単語"
                fromPage="MuscleCourse"
              />
            </ItemCard>
          </div>
          <div
            className="pt-px-9 pb-px-21"
            onClick={() => handleRedirectToQuickStart('phrase')}
          >
            <ItemCard
              bgColor='bg-primary-500'
              width="343px"
              height="60px"
            >
              <QuickstartOption
                subTitle="クイックスタート"
                buttonText="フレーズ"
                fromPage="MuscleCourse"
              />
            </ItemCard>
          </div>
        </div>
        <h1 className={`mt-px-19 text-primary-500 text-18 font-bold mx-auto ${styles.buttonsLabel}`}>
          チェックリストを確認する
        </h1>
        <div className={styles.buttons}>
          <div
            className="pt-px-6"
            onClick={() => handleRedirectToCheckList('word')}
          >
            <ItemCard
              className="px-px-19 items-center justify-start"
              bgColor="border border-primary-500"
              width="343px"
              height="60px"
            >
              <CheckListIcon
                color="#044071"
                width="29px"
                height="29px"
              />
              <span className="ml-px-19 font-bold text-15 leading-px-20 text-primary-500 tracking-tight">
                Check List
              </span>
            </ItemCard>
          </div>
        </div>
        <h1 className={`mt-px-19 text-primary-500 text-18 font-bold mx-auto ${styles.buttonsLabel}`}>
          自分で学習範囲を選ぶ
        </h1>
        <div className="mt-px-8">
          {units.map((unit, index) => (
            <Link key={index} to={`/training/muscle-courses/${unit.id}/settings`}>
              <Course
                unitId={unit.id}
                unitTitle={unit.name}
                word={unit.word}
                phrase={unit.phrase}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>

      <Alert
        show={isShowModal}
        msg={errorMessage}
        callBack={() => setIsShowModal(false)}
      />
    </div>
  );
}

export default List;
