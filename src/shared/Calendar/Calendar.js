import React from 'react';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';

import KeyboardArrowLeftIcon from '../icons/KeyboardArrowLeftIcon';
import KeyboardArrowRightIcon from '../icons/KeyboardArrowRightIcon';

import './Calendar.css';

const CustomCalendar = ({
  markExisting=[],
  markComplete=[],
  ...props}) => {
  return (
    <>
      <Calendar
        calendarType={'US'}
        prevLabel={<KeyboardArrowLeftIcon width="24" height="27"/>}
        prev2Label={null}
        nextLabel={<KeyboardArrowRightIcon width="24" height="27"/>}
        next2Label={null}
        defaultValue={new Date()}
        formatMonthYear={(local, date) => {
          return (DateTime.fromJSDate(date).toFormat('yyyy / MM'));
        }}
        formatShortWeekday={(local, date) => {
          return ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
        }}
        tileClassName={({activeStartDate, date, view}) => {
          if(markExisting.find(x=>x===DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'))) {
            return  'react-calendar__tile--existing';
          }

          if (markComplete.find(x=>x===DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'))) {
            return  'react-calendar__tile--complete';
          }
        }}
        {...props}
      />
    </>
  )
};

export default CustomCalendar;
