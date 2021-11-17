import React, { useState, forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import 'rc-time-picker/assets/index.css';
import './TimePicker.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import BoardComponent from '../../../Details/components/BoardComponent';
import BasicInfoEditSectionHeader from './BasicInfoEditSectionHeader';
import ChevronDownIcon from '../../../../../../shared/icons/ChevronDownIcon';

import styles from './BasicInfoEditSection.module.css';

const BasicInfoEditSection = ({ children }) => {
  const [publishDate, setPublishDate] = useState();
  const [publishTime, setPublishTime] = useState();
  const { register, handleSubmit, errors } = useForm();
  const { newsDetails } = useSelector(state => state.news);
  const {
    scheduled_published_at,
    status,
    genre_id,
    genre,
    level,
    title,
    title_translation,
  } = newsDetails || {};

  const rules = {
    general: {
      required: true,
      pattern: {
        value: /^\S*$/, // Only non-white-space characters are allowed
        message: 'この項目は必須です。',
      },
    },
  };

  const _handleChangeEvent = (val) => {
    return val;
  };

  useEffect(() => {
    newsDetails && setPublishDate(new Date(scheduled_published_at));
    newsDetails && setPublishTime(moment(moment(scheduled_published_at).format('HH:mm:ss'),'HH:mm:ss'));
  }, [newsDetails]);

  const CalendarContainer = forwardRef(({ value, onClick }, ref) => (
    <div 
      style={{ width: '255px' }}
      className={`flex bg-gray-50 p-px-8 mt-px-8 border border-gray-300 rounded-px-2 text-gray-900 focus:outline-none items-center justify-between ${status === 'not published' && 'cursor-pointer'}`} 
      onClick={onClick} 
      ref={ref}
    >
      {value}
      <input name="date" hidden defaultValue={moment(value).format('YYYY-MM-DD')}/>
      <ChevronDownIcon color="black" fillOpacity="0.54"/>
    </div>
  ));

  return (
    <>
      <BasicInfoEditSectionHeader />
      <BoardComponent>
        <p className="text-left font-bold text-18 text-background-300 leading-none">
          情報
        </p>
        <div>
          <p
            key="label"
            className="font-bold text-px-12 leading-px-12 text-adminGray-400 mt-px-16"
          >
            ジャンル<i className="text-adminRed-400">*</i>
          </p>
          <select
            style={{ width: '255px' }}
            name="genre"
            id="genre"
            className="bg-gray-50 p-px-11 mt-px-8 border border-gray-300 rounded-px-2 text-gray-900 focus:outline-none"
            defaultValue={genre_id}
            readOnly
            disabled
          >
            <option value={genre?.id}>{genre?.title}</option>
          </select>
        </div>
        <div className="pt-px-16">
          <p
            key="label"
            className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8"
          >
            難易度<i className="text-adminRed-400">*</i>
          </p>
          <select
            style={{ width: '255px' }}
            name="level"
            id="level"
            className="bg-gray-50 p-px-11 mt-px-8 border border-gray-300 rounded-px-2 text-gray-900 focus:outline-none"
            defaultValue={level}
            readOnly
            disabled
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="pt-px-16">
          <p
            key="label"
            className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8"
          >
            タイトル<i className="text-adminRed-400">*</i>
          </p>
          <input
            type="text"
            name="title"
            id="title"
            className="w-3/4 bg-gray-50 p-px-11 mt-px-8 border border-gray-300 rounded-px-2 text-gray-900"
            defaultValue={title}
            readOnly
            ref={register(rules.general)}
            onChange={(e) => {
              _handleChangeEvent(e.target.value);
            }}
          />
        </div>
        <div className="pt-px-16">
          <p
            key="label"
            className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8"
          >
            タイトル（訳）<i className="text-adminRed-400">*</i>
          </p>
          <input
            type="text"
            name="title"
            id="title"
            className="w-3/4 bg-gray-50 p-px-11 mt-px-8 border border-gray-300 rounded-px-2 text-gray-900"
            defaultValue={title_translation}
            readOnly
            ref={register(rules.general)}
            onChange={(e) => {
              _handleChangeEvent(e.target.value);
            }}
          />
        </div>
        <div className="pt-px-16">
          <p
            key="label"
            className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8"
          >
            公開日時<i className="text-adminRed-400">*</i>
          </p>

          <DatePicker 
            selected={publishDate}
            minDate={new Date()}
            onChange={(date) => setPublishDate(date)} 
            customInput={<CalendarContainer />}
            disabled={status === 'not published' ? false : true}
          />
          
          <div 
            style={{ width: '255px' }}
            className="flex bg-gray-50 p-px-4 mt-px-8 border border-gray-300 rounded-px-2 text-gray-900 focus:outline-none items-center justify-between" 
          >
            <TimePicker
              name="time"
              placeholder="-"
              value={publishTime}
              className={`w-full ${styles.timePicker}`}
              onChange={(value) => setPublishTime(value)}
              format="HH:mm"
              showSecond={false}
              inputReadOnly
              minuteStep={15}
              allowEmpty={false}
              inputIcon={<ChevronDownIcon color="black" fillOpacity="0.54" className={`absolute -ml-4 mt-px-10 ${status === 'not published' && 'cursor-pointer'}`}/>}
              disabled={status === 'not published' ? false : true}
            />
          </div>
        </div>
      </BoardComponent>
    </>
  );
};

export default BasicInfoEditSection;
