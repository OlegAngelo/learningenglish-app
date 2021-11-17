import React from 'react';

import style from './UploadLoading.module.css';

const UploadLoading = ({ percentage }) => {
  return (
    <div>
      <div className="fixed z-30 top-0 right-0 h-full w-full bg-background-modal"></div>

      <div
        className={`${style.loading} text-white fixed z-30 top-0 right-0 h-full w-full flex items-center pointer-events-none justify-center`}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default UploadLoading;
