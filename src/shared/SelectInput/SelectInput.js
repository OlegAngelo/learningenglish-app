import React, { forwardRef } from 'react';

import style from './SelectInput.module.css';

const SelectInput = (
  {
    className = '',
    innerClass = '',
    label = '',
    name = '',
    options = [],
    required = false,
    value,
    key,
    onChange,
    errorComponent = null,
    disabled = false,
    defaultLabel = '-',
    hideDefaultOption,
    changeCursor = '',
  },
  ref
) => {
  return (
    <div className={className} key={key}>
      <p className="text-adminGray-400 text-12 font-bold mb-px-8">
        {label} {required && <span className="text-adminRed-400">*</span>}
      </p>
      <div
        class={`relative inline-flex ${
          changeCursor === 'default' ? '' : `${style.container}`
        }`}
      >        
      <select
          class={`border border-gray-300 rounded-px-2 py-px-2 bg-adminGray-50 text-14 font-normal focus:outline-none items-center justify-between
            h-px-36 pl-5 pr-10 appearance-none ${innerClass} 
            ${changeCursor === 'default' ? 'cursor-default' : 'cursor-pointer'}
            ${value ? 'text-gray-900' : 'text-disabled-gray'}
          `}
          onChange={onChange}
          ref={ref}
          value={value}
          name={name}
          disabled={disabled}
        >
          <option
            value={hideDefaultOption && null}
            disabled={required == true}
            hidden={hideDefaultOption}
          >
            {defaultLabel}
          </option>
          {options.map((option) => {
            return (
              <option className="text-adminGray-900" value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      {errorComponent && errorComponent}
    </div>
  );
};
export default forwardRef(SelectInput);
