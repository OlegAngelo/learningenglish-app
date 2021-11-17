import React from 'react';

import OptionIcon from '../../shared/icons/OptionIcon';

const Option = ({className = '', onClick}) => {
  return (
    <div className={className} onClick={onClick}>
      <button>
        <span>
          <OptionIcon />
        </span>
      </button>
    </div>
  );
};

export default Option;
