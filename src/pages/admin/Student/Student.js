import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import StudentPersonalInfo from './components/StudentPersonalInfo/StudentPersonalInfo';
import StudentInformation from './components/StudentInformation/StudentInformation';
import StudentGoals from './components/StudentGoals/StudentGoals';
import StudentPlanInfo from './components/StudentPlanInfo/StudentPlanInfo';
import Board from './components/Board';
import Breadcrumb from '../../../shared/Breadcrumb';
import ArrowBackIcon from '../../../shared/icons/ArrowBackIcon';
import Button from '../../../shared/Button/Button';
import style from './Student.module.css';

const Student = () => {
  const location = useLocation();
  const [ isBasicInfo, setBasicIsInfo ] = useState(true);
  
  const handleClickInfo = () => {
    setBasicIsInfo(true);
  };

  const handleClickLog = () => {
    setBasicIsInfo(false);
  };

  return (
    <div className={`flex-1 w-full bg-adminGray-100 ${style.studentContainer}`}>
      <div className="flex pb-px-16 pl-px-32 pt-px-24">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="学習者" to="/admin/users" />
        <Breadcrumb text="学習者詳細" to="#3" active last />
      </div>

      <Board className={style.board}>
        <div className="w-max h-px-59 flex items-center border-adminGray-200">
          <Link to={`/admin/users${location.state?.prevQuery ?? ''}`}>
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-background-300 font-bold leading-none text-20 pl-px-4">
            学習者情報
          </span>
        </div>
        <hr />

        <div className={`flex mt-px-16 mb-px-24 relative mb-30 ${style.topButtonContainer}`}>
          <Button
            innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${isBasicInfo? style.topButtonActive : style.topButtonInactive}`}
            type="gray-square-outline"
            withoutFocus
            onClick={() => handleClickInfo()}
          >基本情報</Button>
          <Button
            innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${!isBasicInfo? style.topButtonActive : style.topButtonInactive}`}
            type="gray-square-outline"
            withoutFocus
            onClick={() => handleClickLog()}
          >学習ログ</Button>
        </div>
        
        {isBasicInfo && (
          <div className={`flex mt-px-16 mb-px-24 relative mb-30 ${style.boardBody}`}>
            <div className={`w-full ${style.boardRowContent}`}>
              <StudentPersonalInfo />
              <StudentInformation />
              <StudentGoals />
              <StudentPlanInfo />
            </div>
          </div>
        )}
      </Board>
    </div>
  );
};

export default Student;
