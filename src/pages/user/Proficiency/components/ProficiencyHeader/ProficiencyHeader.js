import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../../../../shared/Menu';
import Header from '../../../../../shared/Header';
import Tab from '../../../../../shared/Menu/components/Tab';

import styles from './ProficiencyHeader.module.css';

const ProficiencyHeader = ({ isLoading, title }) => {
  const linkItems = [
    {
      title: '知識',
      to: '/proficiency/knowledge/words',
    },
    {
      title: '技能',
      to: '/proficiency/skill/2',
    },
    {
      title: '非言語・異文化',
      to: '/proficiency/non-verbal/2',
    },
  ];

  return (
    <div className={isLoading ? 'fixed z-10 w-full' : ''}>
      <Header
        hasBack={false}
        title={`${title} 習熟度`}
        rootClass={styles.header}
      />

      <div className={styles.menu}>
        <Menu
          bgColor="primary-500"
          spaceX="2"
          paddingx=""
          isTabFlat
        >
          {linkItems.map((item, index) => (
            <Link
              to={item.to}
              key={index}
            >
              <Tab
                type="flat"
                size="sm"
                isActive={item.title === title}
              >
                {item.title}
              </Tab>
            </Link>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default ProficiencyHeader;
