import React, { forwardRef } from 'react';
import Multiselect from 'multiselect-react-dropdown';

import style from './MultiSelectInput.module.css';

const MultiSelectInput = (
  {
    key,
    className = '',
    label = '',
    errorComponent = null,
    required = false,

    // Multiselect
    options = [],
    displayValue = '',
    selectionLimit = -1,
    selectedValues = [],
    disablePreSelectedValues=false,
    onSelect,
    onRemove,
    disabled = false,
  },
) => {
  const defaultMultiSelectStyle = {
    searchBox: {
      'border-width': '2px',
      'border-radius': '2px',
      'border-color': '#e5e7eb',
      'padding-left': '10px',
      'font-size': '12px',
    },
    chips: {
      'font-size': '12px',
      'marginBottom': '0px',
      'padding': '1px 6px',
    },
    optionContainer: {
      'font-size': '12px',
    },
    option: {
      'padding': '2px 0px 2px 10px',
      'font-size': '12px',
    },
  };

  return (
    <div className={className} key={key}>
      <p className="text-adminGray-400 text-12 font-bold mb-px-8">
        {label} {required && <span className="text-adminRed-400">*</span>}
      </p>
      <div class={`relative inline-flex ${style.container}`}>
        <Multiselect
          options={options}
          selectedValues={selectedValues}
          disablePreSelectedValues={disablePreSelectedValues}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue={displayValue}
          selectionLimit={selectionLimit}
          style={defaultMultiSelectStyle}
          placeholder="-"
          closeIcon="cancel"
          disabled={disabled}
        />
      </div>
      {errorComponent && errorComponent}
    </div>
  );
};
export default forwardRef(MultiSelectInput);
