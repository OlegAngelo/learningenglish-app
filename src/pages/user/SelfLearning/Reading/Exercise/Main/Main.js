import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Header from './components/Header';
import Content from './components/Content';
import Alert from '../../../../../../shared/Alert';
import Loading from '../../../../../../shared/Loading';
import ListItemModal from '../../../components/ListItemModal';

import {
  fetchSentenceChunks,
  resetStates,
} from '../../../../../../redux/selfLearning/reading/exercise/slice';
import { lockStatus } from '../../../../../../utils/lockStatus';

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sentenceId = useParams().id;
  const [ contentType, setContentType ] = useState('preview');
  const [ showAlert, setShowAlert ] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { 
    isFetchingChunks, 
    totalChunks, 
    userProficiency, 
    sentence 
  } = useSelector(state => state.selfLearningReadingExercise);
  const [lock, setLock] = useState({
    ...lockStatus,
    ...{
      showModal,
      redirectToLink: '/self-learning/reading',
      redirectToLabel: 'Reading トップページへ '
    }
  });

  const contentProps = {
    contentType,
    setContentType,
  };

  useEffect(() => {
    localStorage.removeItem('sentence');
    dispatch(resetStates());
    dispatch(fetchSentenceChunks(sentenceId));

    return () => {
      dispatch(resetStates());
    };
  }, []);

  useEffect(() => {
    if (!isFetchingChunks && totalChunks === 0) return setShowAlert(true);
  }, [isFetchingChunks, totalChunks]);

  useEffect(() => {

    if(!userProficiency?.is_mastered) {
      const status = lockStatus(userProficiency?.updated_at);
      setShowModal(status.isLock);
      setLock({
        ...lock, 
        ...status, 
        ...{ showModal, setShowModal }
      });
    }

  }, [showModal, userProficiency]);

  const redirectNotFound = () => {
    history.push({
      pathname: '/404',
      state: {
        route: `/self-learning/reading/${localStorage.getItem('reading_level_id')}/list`,
        text: 'Go back to Reading List Page',
      },
    });
  };

  if (isFetchingChunks) {
    return <Loading height="h-screen" rootPosition="relative" />;
  } else if(lock.isLock) {
    return <ListItemModal {...lock} />
  } else if(sentence && Object.keys(sentence).length !== 0) {
    return (
      <div className="bg-background-200 flex flex-col flex-1 min-h-screen relative">
        {contentType !== 'checkpoint' && <Header contentType={contentType} /> }
        {showAlert ? (
          <Alert
            show={true}
            msg="チャンクのデータが見つかりません"
            callBack={() => {
              setShowAlert(false);
              history.push(`/self-learning/reading/${localStorage.getItem('reading_level_id')}/list`);
            }}
          />
        ) : (
          <Content {...contentProps} />
        )}
      </div>
    );
  } else {
    return (
      <Fragment>
        {redirectNotFound()}
      </Fragment>
    )
  }
};

export default Main;
