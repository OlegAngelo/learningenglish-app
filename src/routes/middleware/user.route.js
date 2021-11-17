import React, {Fragment, useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthApi from '../../services/AuthApi';
import TrainingApi from '../../api/TrainingApi';
import newsApi from '../../api/NewsApi';
import { updateOnDemandVideoLogs } from '../../redux/userLectureDetails/slice';

// Shared
import Alert from '../../shared/Alert';

// Utils
import breadcrumb from '../../utils/breadcrumb';
import { handleInterruptedVideo } from '../../utils/lectureHelper';

// Hooks
import useCheckNetwork from '../../hooks/useCheckNetwork';

const UserRoute = ({ component: Component, name, ...rest }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const newsId = location.pathname.split('/')[2];

  const [isLoading, setIsLoading] = useState(true);
  const isOnline = useCheckNetwork();

  const handleInterrrupt = () => {
    const tempIsExamInterrupted = localStorage.getItem('is_exam_interrupted');
    const examInterruptedPrevPath = localStorage.getItem('exam_interrupted_prev_path');
    const isExamInterrupted = (tempIsExamInterrupted === 'true') ? true : false;
    const examInterruptRoutes = [
      /^\/training\/muscle-exam$/,
      /^\/training\/muscle-exam\/.*\/end$/,
      /^\/training\/muscle-exam\/.*\/survey$/,
    ];
    const isEqualWithPrevPath = examInterruptRoutes.some(regex => regex.test(examInterruptedPrevPath));

    if (isExamInterrupted && isEqualWithPrevPath) {
      TrainingApi.setLogSessionFinishedAt()
        .then(() => {
          localStorage.removeItem('is_exam_interrupted', false);
          localStorage.removeItem('exam_interrupted_prev_path', null);
        })
        .catch(err => console.error(err));
    }

    let videoViewingData = handleInterruptedVideo();
    if (videoViewingData) {
      dispatch(updateOnDemandVideoLogs(videoViewingData))
        .then(() => {
          localStorage.removeItem('is_video_interrupted');
          localStorage.removeItem('video_left_seconds_data');
        });
    }
  };

  const goToNotFound = (redirect) => {
    history.push({
      pathname: '/404',
      state: redirect,
    });
  };

  // To Be Improved
  useEffect(() => {
    if (name === 'news-details') {
      setIsLoading(true);
      newsApi
        .verifyNewsIfExist(newsId, 'user')
        .then(() => setIsLoading(false))
        .catch(() => {
          goToNotFound({
            route: '/news',
            text: 'Go back to News List Page',
          });
        });
    } else {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    breadcrumb.push(location.pathname)
  }, [Component])

  if (isLoading) return <div className="bg-basic-400 h-full text-transparent">vvv</div>;

  return (
    <Fragment>
      <Alert
        show={!isOnline}
        msg={'エラーが発生しました。後ほど再度お試しください'}
        callBack={() => window.location.reload()}
      />

      <Route
        {...rest}
        render={(props) => {
          if (AuthApi.isAuthenticated()) {
            handleInterrrupt()
            return <Component {...props} />;
          } else {
            return <Redirect to={
              {
                pathname: '/login',
                state: {
                  from: props.location
                }
              }
            } />;
          }
        }}
      />
    </Fragment>
  );
};

export default UserRoute;
