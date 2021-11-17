import React from 'react';

import TripOriginIcon from '../../../../../shared/icons/TripOriginIcon';

const DataBox = ({ upperText = '', bottomText = '', iconColor = 'black' }) => {
  return (
    <div className="h-px-68 bg-white border-px-1 border-adminGray-200 shadow-databox rounded-px-4 w-px-220 mr-px-16">
      <div className="flex items-center m-px-16">
        <TripOriginIcon
          width="24"
          height="24"
          color={iconColor}
          className="mr-px-8"
        />
        <div>
          <p className="font-12 leading-px-12 font-bold text-adminGray-400 mb-px-8">
            {upperText}
          </p>
          <p className="text-16 leading-px-16 text-adminGray-800">
            {bottomText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataBox;
