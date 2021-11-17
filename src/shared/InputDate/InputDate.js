import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import style from './InputDate.module.css';
import './style.css';

const InputDate = ({
  className,
  onChange,
  value: defaultValue,
  minDate,
  showIcon = true,
  disabled
}) => {
  const [value, setValue] = useState(defaultValue ? new Date(defaultValue) : null);

  useEffect(() => {
    onChange('');
  }, []);

  const InputComponent = forwardRef(({ value, onClick }, ref) => (
    <div
      className={`bg-adminGray-50 border-px-2 border-adminGray-200 rounded-px-2 flex justify-between items-center 
        pr-px-14 pl-px-11 ${!disabled && 'cursor-pointer'} font-semibold ${style.defaultSize} ${style.divContainer} ${className}`}
      onClick={onClick}
      ref={ref}
    >
      {value
        ? <span className="text-12 text-adminGray-700">{moment(value).format('YYYY/MM/DD')}</span>
        : <span className="text-12 text-disabled-gray">-</span>
      }

      {showIcon && <ChevronDownIcon color="black" fillOpacity="0.54"/>}
      
    </div>
  ));

  const onChangeHandler = (newValue) => {
    setValue(newValue);
    onChange(moment(newValue).format('YYYY-MM-DD'));
  };

  return (
    <div>
      <DatePicker
        popperClassName="z-50"
        selected={value}
        onChange={onChangeHandler}
        customInput={<InputComponent />}
        showMonthDropdown
        showYearDropdown
        prevMonthButtonDisabled
        nextMonthButtonDisabled
        minDate={minDate}
        disabled={disabled}
      />
    </div>
  );
};

export default InputDate;
