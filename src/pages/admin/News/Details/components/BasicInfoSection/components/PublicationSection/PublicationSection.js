import React, { useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import 'rc-time-picker/assets/index.css';
import '../../../../../NewsDetailsEdit/components/BasicInfoEditSection/TimePicker.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import Button from '../../../../../../../../shared/Button';
import ChevronDownIcon from '../../../../../../../../shared/icons/ChevronDownIcon';
import AlertModal from '../../../../../../../../shared/AlertModal/AlertModal';

import styles from './PublicationSection.module.css';

import { updatePublication, fetchNewsDetails } from '../../../../../../../../redux/news/slice';


const PublicationSection = () => {
  const dispatch = useDispatch();
  const { newsDetails } = useSelector(state => state.news);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [date, setDate] = useState({
    publish : null,
    unpublish : null,
  });
  const [time, setTime] = useState({
    publish : null,
    unpublish : null,
  });
  const [dateTime, setDateTime] = useState({
    scheduled_published_at : null,
    unpublish_at : null,
  });
  const msgSuccessRequest = 'ニュース編集をしました。';
  const msgFailRequest = 'エラーが発生しました。後ほど再度お試しください。';
  const newsId = useParams().id;
  const {
    scheduled_published_at,
    status,
    unpublish_at
  } = newsDetails || {};

  useEffect(() => {
    if (newsDetails) {
      setDate({
        publish: new Date(scheduled_published_at),
        unpublish: unpublish_at ? new Date(unpublish_at) : null,
      });
      setTime({
        publish: moment(moment(scheduled_published_at).format('HH:mm'),'HH:mm'),
        unpublish: unpublish_at ? moment(moment(unpublish_at).format('HH:mm'),'HH:mm') : null,
      });
    }
  }, [newsDetails]);

  useEffect(() => {
    setDateTime({
      scheduled_published_at: moment(moment(date.publish).format('YYYY-MM-DD')+' '+ moment(time.publish).format('HH:mm:ss')).format('YYYY-MM-DD HH:mm:ss'),
      unpublish_at: moment(moment(date.unpublish).format('YYYY-MM-DD')+' '+ moment(time.unpublish).format('HH:mm')).format('YYYY-MM-DD HH:mm:ss'),
    });
  }, [date, time]);

  const CalendarContainer = forwardRef(({ value, onClick, showDropDownIcon = true}, ref) => (
    <div 
      style={{ width: '255px' }}
      className={`${styles.datePicker} ${showDropDownIcon && 'cursor-pointer'}`} 
      onClick={onClick} 
      ref={ref}
    >
      {value || <span className="text-disabled-gray">-</span>}

      {showDropDownIcon && <ChevronDownIcon color="black" fillOpacity="0.54"/>}

    </div>
  ));

  const savePublication = () => {

    const payload = {
      newsId,
      scheduled_published_at : dateTime.scheduled_published_at,
      unpublish_at : (date.unpublish === null && time.unpublish === null) ? null : dateTime.unpublish_at
    };
    dispatch(updatePublication(payload))
      .then(({payload}) => {
        let { status, data } = payload;
        if (status === 200) {
          setAlertMsg(msgSuccessRequest);
          setIsSuccessRequest(true);
          dispatch(fetchNewsDetails(newsId));
        } else {
          let errorMSg = data.errors.unpublish_at[0] ?? msgFailRequest;
          setAlertMsg(errorMSg);
          setIsSuccessRequest(false);
        }
        setIsShowAlertModal(true);
      })
      .catch((err) => {
        setIsSuccessRequest(false);
        setIsShowAlertModal(true);
      });
  };

  return (
    <div>
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMsg}
      />
      <p
        className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8"
      >
        公開日時<i className="text-adminRed-400">*</i>
      </p>

      <div className="flex mt-px-8">
        <DatePicker 
          selected={date.publish}
          minDate={new Date()}
          className={`${styles.datePicker}`}
          onChange={(value) => setDate((prevState) => ({
            ...prevState,
            publish: value,
          }))} 
          customInput={<CalendarContainer showDropDownIcon={status === 'not published'}/>}
          disabled={status === 'not published' ? false : true}
        />
        
        <div 
          style={{ width: '255px' }}
          className="flex bg-gray-50 p-px-4 ml-px-8 border-px-2 border-gray-200 rounded-px-2 text-gray-900 focus:outline-none items-center justify-between" 
        >
          <TimePicker
            placeholder="-"
            value={time.publish}
            className={`w-full ${styles.timePicker}`}
            onChange={(value) => setTime((prevState) => ({
              ...prevState,
              publish: value,
            }))} 
            format="HH:mm"
            showSecond={false}
            inputReadOnly
            minuteStep={15}
            allowEmpty={false}
            inputIcon={status === 'not published' && <ChevronDownIcon color="black" fillOpacity="0.54" className="absolute -ml-4 mt-px-10"/>}
            disabled={status === 'not published' ? false : true}
          />
        </div>
      </div>
      <p
        className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8 mt-px-16"
      >
        公開終了日時
      </p>
      <div className="flex mt-px-8 cursor-pointer">
        <DatePicker 
          selected={date.unpublish}
          minDate={new Date()}
          onChange={(value) => setDate((prevState) => ({
            ...prevState,
            unpublish: value,
          }))} 
          customInput={<CalendarContainer />}
        />
        
        <div 
          style={{ width: '255px' }}
          className="flex bg-gray-50 p-px-4 ml-px-8 border-px-2 border-gray-200 rounded-px-2 text-gray-900 focus:outline-none items-center justify-between cursor-pointer" 
        >
          <TimePicker
            placeholder="-"
            value={time.unpublish}
            className={`w-full bg-gray-50 ${styles.timePicker}`}
            onChange={(value) => setTime((prevState) => ({
              ...prevState,
              unpublish: value,
            }))} 
            format="HH:mm"
            showSecond={false}
            inputReadOnly
            minuteStep={15}
            allowEmpty={false}
            inputIcon={<ChevronDownIcon color="black" fillOpacity="0.54" className="absolute -ml-4 mt-px-10"/>}
          />
        </div>
      </div>
      <Button
        innerClass="cursor-pointer px-px-34"
        className="pt-px-16"
        type="blue-square"
        onClick={savePublication}
        disabled={ status === 'expired' || status === 'deleted' ? true : false }
      >
        更新
      </Button>
    </div>
  );
};

export default PublicationSection;
