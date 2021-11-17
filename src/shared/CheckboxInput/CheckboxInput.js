import React from 'react';
import style from './CheckboxInput.module.css';

const CheckboxInput = ({
  type = 'mint-square',
  width = '1.5rem',
  height = '1.5rem',
  name = '',
  register = () => {},
  rules = {},
}) => {
  
  const checkboxTypes = {
    'mint-square': {
      uncheckColor: 'bg-primary-50',
      checkedBG: style.checkedBGMint,
      checkColor: style.checkColorWhite,
      shape: style.curvedSquare,
    },
  };

  return (
    <div
      className={style.checkboxContainer}
      style={{
        width,
        height,
      }}
    >
      <input 
        name={name}
        ref={register(rules.terms)}
        type="checkbox" 
        className={style.checkbox}
      />
      <span
        className={`
          ${style.checkboxSpan}
          ${checkboxTypes[type].uncheckColor} 
          ${checkboxTypes[type].checkedBG} 
          ${checkboxTypes[type].shape} 
          ${checkboxTypes[type].checkColor}
        `}
      ></span>
    </div>
  );
};

export default CheckboxInput;
