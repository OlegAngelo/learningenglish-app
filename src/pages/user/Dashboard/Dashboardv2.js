import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Bubble from './components/Bubble';
import ObjectiveList from './components/ObjectiveList/ObjectiveList';
import Footer from '../../../shared/Footer';
import Header from '../../../shared/Header';
import Loading from '../../../shared/Loading';
import QuickstartOption from './components/QuickstartOption';
import ItemCard from '../../../shared/ItemCard';
import Button from '../../../shared/Button';
import Alert from '../../../shared/Alert';
import PersonCircleIcon from '../../../shared/icons/PersonCircleIcon';
import StarIcon from '../../../shared/icons/StarIcon';

import { fetchLastMotivationTimestamp } from '../../../redux/training/slice';
import { lastMotivationTimestamp, isFetchingLastMotivationTimestamp } from '../../../redux/training/selectors';
import { getUrlBasedOnLastTrainingTime } from '../../../utils/trainingHelper';
import AuthApi from '../../../services/AuthApi';
import logMissionApi from '../../../api/LogMissionApi';
import proficiencyApi from '../../../api/ProficiencyApi';

import style from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [missionData, setMissionData] = useState([]);
  const motivationTimestamp = useSelector(lastMotivationTimestamp);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isLogout, setIsLogout] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const loading = useSelector(isFetchingLastMotivationTimestamp);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const headerProps = {
    hasBack: false,
    title: 'EDGe School',
  };

  const location = useLocation();

  const history = useHistory();


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
    localStorage.setItem('prev_route', '/');
    localStorage.setItem('selected_question_type', questionType);

    history.push(getUrlBasedOnLastTrainingTime(motivationTimestamp, route, learningType));
  };

  const fetchLogMissionData = () => {
    logMissionApi.getLogMission()
      .then(response => {
        setMissionData([
          {
            text: '気分の選択',
            checked: response.data.has_motivation,
          },
          {
            text: '筋トレ20問',
            checked: response.data.is_achieved_target_training,
          },
          {
            text: 'News',
            text_next_line: '1本Finishする',
            checked: response.data.is_achieved_target_news,
          },
        ]);
        setIsFetchingData(false);
      })
  }

  const logoutOnClick = (event) => {
    setIsLogout(true);
    AuthApi.logout();
  };

  useEffect(() => {
    dispatch(fetchLastMotivationTimestamp());
    fetchLogMissionData();
    proficiencyApi.getOverallProficiency().then((response) => {
      let { data } = response;
      setOverallProgress(data.overall);
      setPercentage(data.percentage);
    });

    localStorage.removeItem('breadcrumbs')

    return () => {
      setOverallProgress(0);
      setPercentage(0);
    }
  }, []);

  return (
    <div className="h-screen">
      {(loading && isFetchingData) || isLogout ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <div className={style.dashboard}>
          <div
            className={`bg-primary-500 ${style.topDashboardv2}`}
          >
            <Header {...headerProps}>
              <div className="block text-basic-400 text-center">
                <button className="focus:outline-none">
                  <div className="mb-px-5 rounded">
                    <PersonCircleIcon />
                  </div>
                  <div className="text-8">マイページ</div>
                </button>
              </div>
            </Header>
            <div className="flex py-px-20">
              <Bubble percent="10" />
              <div className="flex-1 block text-secondary-500 font-bold pr-px-20">
                <div className="text-20 mb-px-8">プレゼンテーションの内容理解</div>
                <div className="text-10 leading-none">事前に話す内容を決めておき、発言する</div>
                <div className="leading-none mt-px-9">
                  <StarIcon color="#044071" classname="rounded-full bg-primary-100 p-px-2 mr-px-6"/>
                  <StarIcon color="#044071" classname="rounded-full bg-primary-100 p-px-2 mr-px-6"/>
                  <StarIcon color="#044071" classname="rounded-full bg-primary-100 p-px-2 mr-px-6"/>
                  <StarIcon color="#044071" classname="rounded-full bg-primary-100 p-px-2 mr-px-6"/>
                </div>
              </div>
            </div>
          </div>
          <div className={`bg-white pt-px-15 ${style.goals}`}>
            <div>
              <ObjectiveList title="今日の目標" data={missionData} />
              <div className="px-px-16 pt-px-8">
                <Link to="/motivation">
                  <Button onClick={() => localStorage.removeItem('env_next_page')} type="white-rectangle">気分を選択する</Button>
                </Link>
              </div>
              <div className='ml-5 mt-5 font-bold text-primary-500 text-18'>
                あなたにオススメのトレーニング
              </div>
              <div
                className={`${style.unit1} ${style.quickstartOption} ${style.buttonLink}`}
                onClick={() => handleRedirectToQuickStart('word')}
              >
                <ItemCard
                  bgColor='bg-primary-500'
                  width={null}
                  height="60px"
                  className="flex-col items-center justify-center w-full mx-16 "
                >
                  <QuickstartOption
                    title="筋トレ"
                    subTitle="クイックスタート"
                    buttonText="単語"
                  />
                </ItemCard>
              </div>
              <div
                className={`mt-4 ${style.quickstartOption}`}
                onClick={() => handleRedirectToQuickStart('phrase')}
              >
                <ItemCard
                  bgColor='bg-primary-500'
                  width={null}
                  height="60px"
                  className="flex-col items-center justify-center w-full mx-16"
                >
                  <QuickstartOption
                    title="筋トレ"
                    subTitle="クイックスタート"
                    buttonText="フレーズ"
                  />
                </ItemCard>
              </div>
            </div>
          </div>
          <div className={`flex justify-between px-px-16 ${style.logoutContainer}`}>
            <span
              className={`text-primary-500 text-11 leading-px-11 ${style.logout}`}
              onClick={logoutOnClick}
            >
              ログアウト
            </span>
            <a
              className={`text-primary-500 text-11 leading-px-11 ${style.logout}`}
              href="https://docs.google.com/forms/d/e/1FAIpQLSffQvs0NWSbcwuZI3J0hr7poBVf7UdBYjoBd0xbcHxjhBHpFg/viewform"
              target="_blank"
            >
              お問い合わせフォーム
            </a>
          </div>
          <div className="fixed left-0 right-0 bottom-0">
            <Footer />
          </div>
        </div>
      )}

      <Alert
        show={isShowModal}
        zIndex={20}
        msg={errorMessage}
        callBack={() => setIsShowModal(false)}
      />
    </div>
  );
};

export default Dashboard;
