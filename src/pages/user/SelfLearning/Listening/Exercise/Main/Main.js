import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useLocation } from 'react-router';

import ContentSection from './components/ContentSection';
import HeaderSection from './components/HeaderSection';
import DictationModal from './components/DictationModal/DictationModal';
import ListeningCountdown from '../Countdown';
import Loading from '../../../../../../shared/Loading';
import useCountDown from '../../../../../../hooks/useCountDown';
import ListItemModal from '../../../components/ListItemModal';

import useSLListeningExercise from './components/useSLListeningExercise';
import { fetchPreferences } from '../../../../../../redux/userPreference/slice';
import { lockStatus } from '../../../../../../utils/lockStatus';

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questions } = useSelector((state) => state.selfLearningListeningExercise);
  const { 
    currentQuestion, 
    isFetchingQuestions, 
    loadQuestions, 
    resetQuestions, 
    userProficiency 
  } = useSLListeningExercise();

  const {countdown} = useCountDown({
    seconds: 3,
    shouldStart: !isFetchingQuestions,
  });

  const [showModal, setShowModal] = useState(false);

  const [lock, setLock] = useState({
    ...lockStatus,
    ...{
      showModal,
      redirectToLink: '/self-learning/listening',
      redirectToLabel: 'Listening トップページへ'
    }
  });

  useEffect(() => {
    if (!userProficiency?.is_mastered) {
      const status = lockStatus(userProficiency?.updated_at);
      setShowModal(status.isLock);
      setLock({
        ...lock, 
        ...status, 
        ...{ showModal, setShowModal }
      });
    }
  }, [showModal, userProficiency]);

  useEffect(() => {
    loadQuestions();
    dispatch(fetchPreferences());

    return () => resetQuestions();
  }, []);

  const redirectNotFound = () => {
    history.push({
      pathname: '/404',
      state: {
        route: `/self-learning/listening/${localStorage.getItem('listening_level_id')}/list`,
        text: 'Go back to Listening List Page',
      },
    });
  };
  
  if (isFetchingQuestions) {
    return <Loading height="h-screen" rootPosition="relative" />;
  } else if (lock.isLock) {
    return <ListItemModal {...lock} />
  } else if (countdown > 0 && questions.length) {
    return <ListeningCountdown countdown={countdown} />;
  } else if (questions.length) {
    return (
      <Fragment>
          <DictationModal />
          <div className="bg-background-200 h-screen" key={currentQuestion?.id}>
            <HeaderSection />
            <ContentSection />
          </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {redirectNotFound()}
      </Fragment>
    );
  }
};

export default Main;
