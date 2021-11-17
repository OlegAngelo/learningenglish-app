import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import Menu from '../../../../../../../shared/Menu';
import Tab from '../../../../../../../shared/Menu/components/Tab';

import style from './MenuTab.module.css';

const MenuTab = (props) => {
  const currentTab = useParams().tab;
  const id = useParams().id;
  const history = useHistory();
  const location = useLocation();

  let tabs = [
    {
      name: '概要',
      link: `/admin/lectures/on-demand/details/${id}/overview`,
      type: 'overview',
    },
    {
      name: '動画一覧',
      link: `/admin/lectures/on-demand/details/${id}/video-list`,
      type: 'video-list',
    },
    {
      name: '確認問題',
      link: `/admin/lectures/on-demand/details/${id}/exercises`,
      type: 'exercises',
    },
  ];
  
  return (
    <Menu spaceX="7" paddingX="0" paddingY="0" className="flex">
      {tabs.map((tab, index) => {
        return (
          <Link
            to={tab.link}
            key={index}
            className={`w-px-220 ${style.menu}`}
          >
            <Tab
              type="flat2"
              isActive={tab.type === currentTab}
              className={`${style.padding} text-background-300`}
            >
              {tab.name}
            </Tab>
          </Link>
        );
      })}
    </Menu>
  );
};

export default MenuTab;
