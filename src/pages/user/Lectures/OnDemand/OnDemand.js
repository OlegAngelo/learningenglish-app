import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import ContentSection from './components/ContentSection';
import Header from '../../../../shared/Header';
import Heart from '../../../../shared/Header';
import Loading from '../../../../shared/Loading';
import Video from '../components/Video';
import HeaderSection from './components/HeaderSection';
import PlaySpeedModal from './components/PlaySpeedModal';
import Modal from '../../../../shared/Modal';
import Button from '../../../../shared/Button';

import useModal from '../../../../hooks/useModal';

import { 
  fetchUserLectureDetails, 
  setVimeoId,
  saveOnDemandVideoLogs,
  updateOnDemandVideoLogs,
  resetVimeoPlayer,
  setVideoLogId,
  removeThumbnail,
  setHasCompletedVideo,
  togglePlay,
  setVideoCompleted,
  resetHasCompletedVideo,
} from '../../../../redux/userLectureDetails/slice';

import {
  saveOndemandLogs,
  resetUserDetails,
} from '../../../../redux/userLectures/slice';

import { convertTimeFormat } from '../../../../utils/videoPlayerHelper';

const OnDemand = () => {
  const TOKEN = Cookies.get('access_token');
  const history = useHistory();
  const dispatch = useDispatch();
  const lectureId = useParams().id;
  const {
    isFetchingUserLectureDetails,
  } = useSelector((state) => state.userLectures);
  const { 
    vimeoId, 
    videoId, 
    videoLogId, 
    firstPlayOfVideo,
    thumbnail,
    videoRealTime,
    videoCompleted,
    hasCompletedVideo,
    lecture,
  } = useSelector((state) => state.userLectureDetails);
  const [videoList, setVideoList] = useState([]);
  const [show, displayModal] = useModal();
  const [isBeaconSent, setIsBeaconSent] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState == 'hidden' && videoLogId && !isBeaconSent) {
      let url = `${process.env.REACT_APP_SERVER_API}/api/lectures/on-demand/video/${videoLogId}/update-logs-beacon`;
      let formData = new FormData();
      formData.append('videoDuration', parseInt(videoRealTime.duration));
      formData.append('viewingSeconds', parseInt(videoRealTime.seconds));
      formData.append('token', TOKEN);
      setIsBeaconSent(true);
      navigator.sendBeacon(url, formData);
    }
  });

  const handleSaveOndemandLogs = () => {
    dispatch(saveOndemandLogs(lectureId));
  };

  const setDefaultVideo = (videos) => {
    dispatch(setVimeoId({
      vimeoId: videos[0].url,
      isDefault: true,
      videoId: videos[0].id,
    }));
  };
  
  const convertToImage = (img) => {
    if (!img) return;
    let blob = new Blob([img], {
      type: 'image/jpg',
    });

    return URL.createObjectURL(blob);
  };

  const saveLogs = () => {
    const payload = {
      videoId,
      logId: videoLogId,
      videoDuration: parseInt(videoRealTime.duration),
      viewingSeconds: parseInt(videoRealTime.seconds),
    };
    dispatch(saveOnDemandVideoLogs(payload))
      .then((res) => {
        dispatch(setVideoLogId(res.payload.data.id));
      });
  };

  const updateLogs = () => {
    const payload = {
      videoId,
      logId: videoLogId,
      videoDuration: parseInt(videoRealTime.duration),
      viewingSeconds: parseInt(videoRealTime.seconds),
    };
    dispatch(updateOnDemandVideoLogs(payload));
  };

  const formattedTimeList = (videos) => {
    return videos.map((video) => {
      let time = convertTimeFormat(video.duration);
      let timeArr = time.split(':');

      time = timeArr.length == 2
        ? ['0', '00'].includes(timeArr[0])
          ? `${timeArr[1]}秒`
          : `${timeArr[0]}分${timeArr[1]}秒`
        : `${timeArr[0]}時間${timeArr[1]}分${timeArr[2]}秒`;

        return {
          ...video,
          duration: time,
        };
    });
  };

  useEffect(() => {
    // create OnDemand Video Logs intially
    if (firstPlayOfVideo) {
      saveLogs();
    }
  }, [firstPlayOfVideo]);

  let secondsInterval = [30, 25, 20, 15, 10, 5];
  useEffect(() => {
    if (videoRealTime && videoLogId) {
      //update logs if leftSeconds >= 30 with 5secs interval
      let leftSeconds = parseInt(videoRealTime.duration) - parseInt(videoRealTime.seconds);
      if (secondsInterval.includes(leftSeconds)) {
        secondsInterval.splice(secondsInterval.indexOf(leftSeconds), 1);
        updateLogs();
      }
    }
  }, [videoRealTime]);

  const replayVideo = () => {
    setIsShowModal(false);
    dispatch(togglePlay());
    dispatch(setVideoCompleted(false));
    saveLogs();
  };
  
  useEffect(() => {
    if (videoCompleted && (lecture.lecture_phrases.length > 0 || lecture.lecture_words.length )) setIsShowModal(true);
  }, [videoCompleted]);

  useEffect(async () => {
    setIsShowModal(false);
    dispatch(setHasCompletedVideo(false));
    dispatch(removeThumbnail());
    await dispatch(resetUserDetails());
    await dispatch(resetVimeoPlayer());
    dispatch(fetchUserLectureDetails(lectureId))
      .then((res) => {
        //handle 404 if lecture is live or lecture is not existing
        if (res.payload.data.is_live || res.payload.status !== 200) window.location = '/404';

        const { lecture_ondemand_videos, completed_videos } = res.payload.data;
        dispatch(setHasCompletedVideo(completed_videos > 0));
        setDefaultVideo(lecture_ondemand_videos);
        setVideoList(formattedTimeList(lecture_ondemand_videos));
        handleSaveOndemandLogs();
      });

    return () => {
      dispatch(removeThumbnail());
      dispatch(resetVimeoPlayer());
      setVideoList([]);
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(removeThumbnail());
      dispatch(resetVimeoPlayer());
    };
  }, [ContentSection]);

  return (
    <div className="h-screen">
      <div className="sticky bg-black top-0 z-10">
        <Header title="大教室" hasBack={true} >
          {/* #tmp - lecture bookmark */}
          {/* <div className="grid justify-items-center">
            <Heart link="/lectures/bookmarks" />
            <span className="text-basic-400 font-bold text-8 font-hiragino-kaku">
              Bookmarks
            </span>
          </div> */}
        </Header>
        {isFetchingUserLectureDetails
          ? (
            <Loading
              className="top-16 bg-background-200"
              iconClass="bg-primary-500 text-primary-500"
              zIndex="z-0"
            />
          ) : (
            <Fragment>
              <Video
                thumbnail={convertToImage(thumbnail)}
                moreOptionHandler={displayModal}
                displayModal={show}
              />
              <HeaderSection />
            </Fragment>
          )}
      </div>

      {!isFetchingUserLectureDetails && <ContentSection videoList={videoList}/>}

      {isShowModal && (
        <Modal 
          className="mx-px-16 px-px-16 pt-px-17 pb-px-24"
          closeModalFunc={() => setIsShowModal(false)}
        >
          <div className="py-px-24 text-basic-100">映像で学んだ内容を確認しましょう</div>
          <Button
            type="darkblue-square"
            innerClass="w-full"
            className="w-full pb-px-16"
            disabled={!hasCompletedVideo}
            onClick={() => {
              dispatch(resetHasCompletedVideo());
              history.push({
                pathname: `/learning-environment`,
                search: 'learningType=phrase&questionType=lecture-training',
                state: {
                  lectureId,
                }
              })
            }}
          >
            確認問題スタート
          </Button>
          <Button
            type="darkblue-square-outline"
            innerClass="w-full"
            className="w-full"
            onClick={replayVideo}
          >
            映像をもう一度視聴する
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default OnDemand;
