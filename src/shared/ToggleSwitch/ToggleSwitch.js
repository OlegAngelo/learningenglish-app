import React, { useEffect, useState } from 'react';

import style from './ToggleSwitch.module.css';

const ToggleSwitch = ({ on, labels = null, setIsToggledOn = () => {}, page = null }) => {
  const [state, setState] = useState(true);

  const updateState = (value) => {
    let localStorageKey = page == 'news'? 'user_enable_wpm_calculation' : 'user_enable_speaking'
    localStorage.setItem(localStorageKey, value ? 1 : 0)
    setState(value);
    setIsToggledOn(value);
  };

  const getStateStyle = () => {
    return `${state ? 'bg-secondary-500' : 'bg-primary-100'} ${style.container}`;
  };

  useEffect(() => {
    updateState(on);
  }, []);

  return (
    <div
      className={`p-px-2 px-px-3 rounded-full flex items-center justify-between cursor-pointer w-12 ${getStateStyle()}`}
      onClick={() => updateState(!state)}
    >
      {state ? (
        <span className="text-11 ml-px-3 font-bold text-primary-500">
          {labels ? labels.on : 'ON'}
        </span>
      ) : (
        ''
      )}
      <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow"></span>
      {!state ? (
        <span className="text-11 font-bold text-primary-500">
          {labels ? labels.off : 'OFF'}
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default ToggleSwitch;
