import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../shared/Header';
import Heart from '../../../../shared/Header/Heart';
import Loading from '../../../../shared/Loading';
import ContentSection from '../LiveDetail/components/Content';

import { resetUserDetails, saveLiveLogs } from '../../../../redux/userLectures/slice';
import { fetchLectureDetails, removeThumbnail } from '../../../../redux/userLectureDetails/slice';
import { useParams } from 'react-router';


const LiveDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [lectureLiveId,setLectureLiveId] = useState();

  const {
    isFetchingUserLectureDetails,
    selectedLectureLiveId,
  } = useSelector((state) => state.userLectures);
  
  useEffect(() => {
    dispatch(saveLiveLogs(selectedLectureLiveId));
    dispatch(fetchLectureDetails({lectureId: id}));
    setLectureLiveId(selectedLectureLiveId);

    return () => {
      dispatch(resetUserDetails());
      dispatch(removeThumbnail());
    }
  }, []);

  return (
    <div className="w-full pb-px-50">
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
          <ContentSection lectureLiveId={lectureLiveId}/>
        )}
    </div>
  )
};

export default LiveDetail;
