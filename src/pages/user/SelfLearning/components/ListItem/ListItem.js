
import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { PieChart } from 'react-minimal-pie-chart';

import Card from '../../../../../shared/Card';
import Tag from '../../../../../shared/Tag';
import ChevronRightIcon from '../../../../../shared/icons/ChevronRightIcon';

import style from './ListItem.module.css';

import  { DURATION_LOCK } from '../../../../../config/lockInPeriod.json'

const ListItem = ({ item, redirectTo, setMinutesLeft, setShowModal }) => {
  const history = useHistory();
  const location = useLocation();
  const type = location.pathname.includes('listening') ? 'listening' : 'reading';

  const statusStyle = {
    'not tried': {
      text: 'Not Tried',
      color: 'darkGray'
    },
    'in progress': {
      text: 'In Progress',
      color: 'darkGreen'
    },
    'mastered': {
      text: 'Mastered !',
      color: 'orange'
    }
  };

  const checkStatus = (proficiency) => {
    if (proficiency.is_mastered) {
      return 'mastered';
    } else {
      return 'in progress';
    }
  };

  const checkIfLock = (date) => {
    let status;
    const minute = moment().diff(moment(date), 'minutes');
    if (minute < DURATION_LOCK ) {
      status = {
        isLock: true,
        minutesAgo: minute,
        minutesLeft: DURATION_LOCK - minute,
      };
    } else {
      status = {isLock: false};
    }
    return status;
  };

  const status = item.user_proficiency ? checkStatus(item.user_proficiency) : 'not tried';
  const lockStatus = status === 'in progress' ? checkIfLock(item.user_proficiency.updated_at) : {isLock: false};
  const { text: labelText, color: labelColor} = statusStyle[status];

  const onClickRedirect = () => {
    if (lockStatus.isLock) {
      setMinutesLeft(lockStatus.minutesLeft);
      setShowModal(true);
    } else {
      localStorage.setItem('set_id', item.id);
      history.push(redirectTo);
    }
  }

  return (
    <div
      className="mx-px-8 mb-px-10 cursor-pointer"
      onClick={() => onClickRedirect()}
    >
      <Card
        className={`py-px-16 flex border border-primary-100 ${style.height}`}
      >
        <div className={`font-bold text-px-16 flex-1 px-px-16 flex items-center ${lockStatus.isLock && style.disable}`}>
          {type === 'reading' ? item.title : `Set.${item.order}`}
        </div>
        <div className="flex-1 flex items-center justify-between">
          <Tag
            size='m'
            width='115.61px'
            light='true'
            color={labelColor}
            className={lockStatus.isLock ? style.disable : ''}
          >
            {labelText}
          </Tag>
          <div 
            className="px-px-10 h-full flex items-center w-full flex flex-col justify-center"
          >
            {lockStatus.isLock ? (
              <div className="flex flex-col">
                <div className={style.circle} />
                <div className="w-px-24">
                  <PieChart
                    startAngle={-90}
                    totalValue={15}
                    data={[
                      {value: lockStatus.minutesAgo, color: '#044071', borderWidth: 0},
                    ]}
                  />
                </div>
                <div className="text-11 font-bold text-primary-500 text-center whitespace-nowrap">{lockStatus.minutesLeft}分</div>
              </div>
            ) : <ChevronRightIcon/>}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListItem;
