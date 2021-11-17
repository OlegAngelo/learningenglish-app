import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '../../../../../../../../../shared/Menu';
import Tab from '../../../../../../../../../shared/Menu/components/Tab';

import { setIsClickTab, setTabLink } from '../../../../../../../../../redux/lectures/slice';

import style from './MenuTab.module.css';

const MenuTab = ({isFirstTabValid}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: liveId, tab: currentTab } = useParams();
  let tabs = [
    {
      name: '概要',
      link: `/admin/lectures/register/on-demand/${liveId ? `${liveId}/` : ''}overview`,
      type: 'overview',
    },
    {
      name: '動画一覧',
      link: `/admin/lectures/register/on-demand/${liveId ? `${liveId}/` : ''}video-list`,
      type: 'video-list',
    },
    {
      name: '確認問題',
      link: `/admin/lectures/register/on-demand/${liveId ? `${liveId}/` : ''}exercises`,
      type: 'exercises',
    },
  ];

  const isClickableTab = (param) => isFirstTabValid && currentTab !== param;

  const handleRedirectOnClick = (link) => {
    if (currentTab === 'overview') {
      dispatch(setTabLink(link));
      dispatch(setIsClickTab(true));

    } else {
      history.push(link);
    }
  };

  return (
    <Menu spaceX="7" paddingX="0" paddingY="3" className="flex">
      {tabs.map((tab, index) => {
        return (
          <div
            onClick={() => handleRedirectOnClick(tab.link)}
            key={index}
            className={
              `w-px-220 ${!isClickableTab(tab.type)
                ? 'pointer-events-none'
                : ''} ${style.menu}`
            }
          >            
            <Tab
              type="flat2"
              isActive={tab.type === currentTab}
              disabled={isClickableTab(tab.type) ? false : true}
              className="text-background-300"
            >
              {tab.name}
            </Tab>
          </div>
        );
      })}
    </Menu>
  );
};

export default MenuTab;
