import React from 'react'

const ChartIcon = ({ className, width = 24, height = 24 }) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.25 0.75H20.75C22.125 0.75 23.25 1.875 23.25 3.25V20.75C23.25 22.125 22.125 23.25 20.75 23.25H3.25C1.875 23.25 0.75 22.125 0.75 20.75V3.25C0.75 1.875 1.875 0.75 3.25 0.75ZM20.75 20.75H3.25V3.25H20.75V20.75ZM13.25 18.25H10.75V5.75H13.25V18.25ZM8.25 18.25H5.75V9.5H8.25V18.25ZM15.75 18.25H18.25V13.25H15.75V18.25Z" 
      fill="#141414"/>
    </svg>
  );
};

export default ChartIcon;
