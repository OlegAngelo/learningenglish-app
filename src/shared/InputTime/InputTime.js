import React from 'react';
import TimePicker from 'rc-time-picker';

import style from './InputTime.module.css';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const App = ({
  onChange,
  value,
  className = '',
  placeholder = '-',
  showIcon = true,
  disabled
}) => {
  return (
    <div
      style={{ width: '255px', height: '36px' }}
      className={`flex bg-gray-50 p-px-4 mb-px-8 pr-px-11 border-px-2 border-gray-200
        rounded-px-2 text-gray-900 focus:outline-none items-center justify-between ${className}`}
    >
      <TimePicker
        placeholder={placeholder}
        showSecond={true}
        className={`w-full bg-adminGray-50 text-12 font-semibold text-adminGray-700 border-none ${style.timePicker}`}
        onChange={onChange}
        format="HH:mm"
        showSecond={false}
        inputReadOnly
        allowEmpty={false}
        defaultValue={value}
        minuteStep={15}
        disabled={disabled}
        inputIcon={ showIcon && <ChevronDownIcon color="black" fillOpacity="0.54" className="absolute cursor-pointer -ml-px-15 mt-px-10"/> }
      />
    </div>
  );
};

export default App;
