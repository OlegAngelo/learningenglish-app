import React from 'react';

import style from './Input.module.css';

const Input = ({ value, checked, defaultChecked, type, label, placeholder, onChange, hint, className, innerClassName }) => {

  return (
    <div className={`${className} ${style.container}`}>
      {label && (
        <p key="label" className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8">
          {label}
        </p>
      )}

      <input
        type={type}
        className={`${innerClassName} ${style.input} tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14`}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
      />

      {hint && (
        <p key="hint" className="text-adminGray-500 text-px-12 leading-px-12 mt-px-8">
          {hint}
        </p>
      )}
    </div>
  );
};

Input.defaultProps = {
  value: '',
  style: '',
  label: '',
  placeholder: '',
  hint: '',
  className: 'h-px-51 w-px-350 ',
  innerClassName: 'bg-adminGray-50 h-px-36 w-px-350',
};

export default Input;
