import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';

import Header from '../../../../../shared/Header/Header';
import Heart from '../../../../../shared/Header/Heart';
import Menu from '../../../../../shared/Menu/Menu';
import NewsTab from '../../../../../shared/Menu/components/NewsTab/NewsTab';

const HeaderSection = (props) => {
  const tab = useParams().tab;
  const location = useLocation();

  const linkItems = [
    {
      title: 'ALL',
      to: '/news',
      tab: undefined,
    },
    {
      title: 'World',
      to: '/news/world',
      tab: 'world',
    },
    {
      title: 'National',
      to: '/news/national',
      tab: 'national',
    },
    {
      title: 'Business\n& Tech',
      to: '/news/business-tech',
      tab: 'business-tech',
    },
    {
      title: 'Science\n& Health',
      to: '/news/science-health',
      tab: 'science-health',
    },
  ];

  const hasNormalPadding = (title) => {
    return title !== 'Business\n& Tech' && title !== 'Science\n& Health';
  };

  return (
    <div className="fixed w-full z-20 top-0">
      <Header title="News" hasBack={true} forcedUrl='/training'>
        <div className="grid justify-items-center">
          <Heart />
          <span className="text-basic-400 font-bold text-8 font-hiragino-kaku">
            Bookmarks
          </span>
        </div>
      </Header>
      <Menu bgColor="primary-500" forNews={true}>
        {linkItems.map((item, index) => (
          <Link to={{pathname: item.to, search: location.search}} key={index}>
            <NewsTab
              isActive={item.tab === tab}
              isNormalPadding={hasNormalPadding(item.title)}
            >
              {item.title}
            </NewsTab>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

export default HeaderSection;
