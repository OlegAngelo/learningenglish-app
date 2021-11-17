import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../../../../../shared/Loading';
import PlayArrowNonCircleIcon from '../../../../../../shared/icons/PlayArrowNonCircleIcon';
import {
  setVimeoId,
  resetVimeoPlayer,
  updateOnDemandVideoLogs,
} from '../../../../../../redux/userLectureDetails/slice';
import { handleInterruptedVideo } from '../../../../../../utils/lectureHelper';

import style from './VideoList.module.css';

const VideoList = ({
  videoList,
}) => {
  const dispatch = useDispatch();
  const { vimeoId } = useSelector(state => state.userLectureDetails);

  const handleSwitchVideo = (video) => {
    if ( vimeoId === video.url ) return;
    dispatch(resetVimeoPlayer());
    dispatch(setVimeoId({ vimeoId: video.url, videoId: video.id}))
    
    let videoViewingData = handleInterruptedVideo(true);
    if (videoViewingData) {
      dispatch(updateOnDemandVideoLogs(videoViewingData))
        .then(() => {
          localStorage.removeItem('is_video_interrupted');
          localStorage.removeItem('video_left_seconds_data');
        });
    }
  };

  const isVideoPlaying = (url) => { return url === vimeoId };

  return (
    <div >
      { videoList.length ? (
        <div className={`bg-background-200 py-px-8 ${style.container}`}>
          {
            videoList.map((video) => {
              return (
                <div 
                  key={video.id} 
                  className={`mb-px-8 mx-px-8 p-px-16 cursor-pointer
                    ${style.lectureItemCard} ${isVideoPlaying(video.url) && style.playingVideo}`}
                  onClick={() => handleSwitchVideo(video)}
                >
                  <div className="font-bold text-16 break-words text-basic-100">
                    {video.title}
                  </div>
                  <div className="mt-px-26 text-12 text-basic-200 flex justify-between">
                    <div>
                      {isVideoPlaying(video.url) && (
                        <PlayArrowNonCircleIcon
                          color="#044071"
                          width="10"
                          height="13"
                          className="mr-px-8 mt-px-3"
                        />
                      )}
                      <span>{video.total_views}回視聴</span>
                    </div>
                    <div className="text-12 text-basic-200">{video.duration}</div>
                  </div>
                </div>
              );
            })
          }
        </div>
      ) : (
        <Loading
          className="top-20"
          iconClass="bg-primary-500 text-primary-500"
          zIndex="z-0"
        />
      )}
    </div>
  );
};

export default VideoList;
