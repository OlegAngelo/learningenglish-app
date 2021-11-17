import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Menu from '../../../../../../shared/Menu/Menu';
import Tab from '../../../../../../shared/Menu/components/Tab/Tab';

import style from './HeaderSection.module.css';

const HeaderSection = (props) => {
  const currentTab = useParams().tab;
  const lectureId = useParams().id;
  const history = useHistory();

  return (
    <Menu bgColor="primary-500" spaceX="1" isTabFlat forNews>
      <Tab
        onClick={() => history.replace(`/lectures/${lectureId}/on-demand/overview`)}
        type="flat"
        className={`pt-px-12 pb-px-12 ${style.tabs}`}
        size="sm"
        isActive={currentTab === 'overview' ? true : false}
      >
        概要
      </Tab>
      <Tab
        onClick={() => history.replace(`/lectures/${lectureId}/on-demand/video-list`)}
        type="flat"
        className={`pt-px-12 pb-px-12 ${style.tabs}`}
        size="sm"
        isActive={currentTab === 'video-list' ? true : false}
      >
        動画一覧
      </Tab>
      {/* #tmp - Lecture on-demand tabs */}
      {/* <Tab
        type="flat"
        className={`pt-px-12 pb-px-12 ${style.tabs}`}
        size="sm"
        isActive={currentTab === 'handouts' && true}
        disabled
      >
        配布物
      </Tab>
      <Tab
        type="flat"
        className={`pt-px-12 pb-px-12 ${style.tabs}`}
        size="sm"
        isActive={currentTab === 'comment' && true}
        disabled
      >
        コメント
      </Tab> */}
    </Menu>
  );
};

export default HeaderSection;
