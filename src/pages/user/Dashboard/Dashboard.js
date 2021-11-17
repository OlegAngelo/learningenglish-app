import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Hexagon from './components/Hexagon';
import ObjectiveList from './components/ObjectiveList';
import Footer from '../../../shared/Footer';
import Header from '../../../shared/Header/Header';
import Progress from '../../../shared/Progress';
import BubbleIcon from '../../../shared/icons/BubbleIcon';
import Language from '../../../shared/icons/Language';
import RecordVoice from '../../../shared/icons/RecordVoice';
import Loading from '../../../shared/Loading';
import QuickstartOption from './components/QuickstartOption';
import ItemCard from '../../../shared/ItemCard/ItemCard';
import Button from '../../../shared/Button';
import Alert from '../../../shared/Alert';

import { fetchLastMotivationTimestamp } from '../../../redux/training/slice';
import { lastMotivationTimestamp, isFetchingLastMotivationTimestamp } from '../../../redux/training/selectors';
import { getUrlBasedOnLastTrainingTime } from '../../../utils/trainingHelper';
import AuthApi from '../../../services/AuthApi';
import logMissionApi from '../../../api/LogMissionApi';
import proficiencyApi from '../../../api/ProficiencyApi';

import style from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(0);
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

  const truncateText = (str) => {
    if (screenWidth == 320 && str.length > 6) {
      return str.substring(0, 4) + '...';
    } else {
      return str;
    }
  };

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
    setScreenWidth(window.innerWidth);

    window.scrollTo(0, 0);
  }, [window.innerWidth]);

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
            className={`bg-primary-500 items-center text-center ${style.topDashboard}`}
          >
            <Header {...headerProps} />
            <div className="flex">
              <div
                className={`flex flex-grow justify-center ${style.hexagonContainer}`}
              >
                <Hexagon />
                <p
                  className={`text-primary-500 font-bold text-14 absolute ${style.hexagonText}`}
                >
                  Coming Soon...
                </p>
              </div>

              <div className="flex-auto flex justify-center pr-px-7">
                <div>
                  <div className={style.graphicons}>
                    <div className="flex items-center">
                      <BubbleIcon width="16" height="16" color="#FFF" />
                      <span className="text-basic-400 text-13 ml-px-5">
                        知識
                      </span>
                    </div>
                  </div>
                  <div className="mb-px-8">
                    <Progress
                      size={percentage || 1}
                      className={overallProgress}
                      innerClass={overallProgress}
                      progressNumber={overallProgress}
                      sizePercentage
                    />
                  </div>
                  <div className="flex items-center">
                    <RecordVoice width="16" height="16" color="#7A91A6" />
                    <span className="text-primary-200 text-13 ml-px-8">
                      技能
                    </span>
                  </div>
                  <div className="mb-px-8 mt-px-2">
                    <Progress
                      size="1"
                      className={style.progressColor}
                      innerClass={style.progressText}
                      progressNumber="000"
                      sizePercentage
                    />
                  </div>
                  <div className="flex items-center">
                    <Language width="16" height="16" color="#7A91A6" />
                    <span className="text-primary-200 text-13 ml-px-8">
                      {truncateText('非言語・異文化')}
                    </span>
                  </div>
                  <div className={`mt-0.5`}>
                    <Progress
                      size="1"
                      className={style.progressColor}
                      innerClass={style.progressText}
                      progressNumber="000"
                      sizePercentage
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`bg-white pt-px-15 ${style.goals}`}>
            <div>
              <ObjectiveList title="今日の目標" data={missionData} />
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
              <div className="px-px-16 pt-px-8">
                <Link to="/motivation">
                  <Button onClick={() => localStorage.removeItem('env_next_page')} type="white-rectangle">気分と学習環境を入力する</Button>
                </Link>
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
