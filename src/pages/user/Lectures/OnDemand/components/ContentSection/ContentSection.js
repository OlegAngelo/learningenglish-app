import React from 'react';
import { useParams } from 'react-router-dom';

import Overview from '../Overview';
import VideoList from '../VideoList';

const ContentSection = ({
  videoList,
}) => {
  const currentTab = useParams().tab;

  return (
    <div>
      { currentTab === 'overview' && <Overview />}
      { currentTab === 'video-list' && <VideoList videoList={videoList}/>}
    </div>
  );
};

export default ContentSection;
