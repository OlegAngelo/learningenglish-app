import React, { Fragment } from 'react';

const GreenCheckbox = ({ width,height, isChecked, onClick }) => {

  return (
    <Fragment>
      {isChecked && (
        <svg width={width} height={height} onClick={onClick} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="2" fill="#03DAC6"/>
          <path d="M6 11.9375L9.83806 17L17.5 8.5" stroke="white" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round" fill="#03DAC6"/>
        </svg>
      )}

      {!isChecked && (
        <svg width={width} height={height} viewBox="0 0 24 24" onClick={onClick} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="23" height="23" rx="1.5" fill="white" stroke="#C0C0C0"/>
        </svg>
      )}
    </Fragment>
  )
}

export default GreenCheckbox;
