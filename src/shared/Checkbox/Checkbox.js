import React, { Fragment } from 'react';

const Checkbox = ({width ,height, isChecked, onClick, className}) => {

  return (
    <Fragment>
      { isChecked && (<svg width={width} height={height} onClick={onClick} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M2.16667 0.5H13.8333C14.7583 0.5 15.5 1.25 15.5 2.16667V13.8333C15.5 14.75 14.7583 15.5 13.8333 15.5H2.16667C1.24167 15.5 0.5 14.75 0.5 13.8333V2.16667C0.5 1.25 1.24167 0.5 2.16667 0.5ZM2.16667 7.99999L6.33333 12.1667L13.8333 4.66665L12.6583 3.48332L6.33333 9.80832L3.34167 6.82499L2.16667 7.99999Z" 
          fill="#7A91A6"
        />
      </svg>) }

      { !isChecked && (<svg width="16" height="16" viewBox="0 0 16 16" onClick={onClick} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M2.16667 0.5H13.8333C14.75 0.5 15.5 1.25 15.5 2.16667V13.8333C15.5 14.75 14.75 15.5 13.8333 15.5H2.16667C1.25 15.5 0.5 14.75 0.5 13.8333V2.16667C0.5 1.25 1.25 0.5 2.16667 0.5ZM13.8333 13.8333V2.16667H2.16667V13.8333H13.8333Z" 
          fill="#7A91A6"/>
      </svg>) }
    </Fragment>
  )
}

export default Checkbox;
