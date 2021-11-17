import React from 'react';

const StrikedLetter = ({
  color= '#FFFFFF',
  width = '20',
  height = '20',
  onClick,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      {...props}
    >
      <path d="M15.6661 13.2184C15.4421 12.8024 15.2501 12.3544 14.8501 11.3304L11.2981 2.09837C10.9301 1.12237 10.8341 0.866366 10.7541 0.482367H7.97006C7.89006 0.898367 7.76206 1.29837 7.45806 2.09837L3.93806 11.3304C3.65006 12.0664 3.33006 12.7864 3.09006 13.2184H5.71406C5.84206 12.5464 5.90606 12.3064 6.19406 11.5384L6.83406 9.79437H11.9541L12.5941 11.5384C12.7701 12.0024 12.9461 12.6904 13.0421 13.2184H15.6661ZM11.3781 7.95437H7.41006L9.07406 3.21837C9.12206 3.07437 9.12206 3.07437 9.37806 2.32237C9.55406 2.85037 9.60206 3.04237 9.66606 3.21837L11.3781 7.95437Z" fill={color}/>
      <path d="M1.25 2.02637L18.75 12.0264" stroke={color}/>
    </svg>
    
  );
};

export default StrikedLetter;