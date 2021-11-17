import React from 'react'

const ListIcon = ({ className, width = 24, height = 16 }) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.75 3.25H3.25V0.75H0.75V3.25ZM3.25 9.25H0.75V6.75H3.25V9.25ZM3.25 15.25H0.75V12.75H3.25V15.25ZM23.25 9.25H5.75V6.75H23.25V9.25ZM5.75 15.25H23.25V12.75H5.75V15.25ZM5.75 3.25V0.75H23.25V3.25H5.75Z" 
      fill="#141414"/>
    </svg>
  );
};

export default ListIcon;
