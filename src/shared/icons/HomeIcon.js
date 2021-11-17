import React from 'react'

const HomeIcon = ({ className, width = 26, height = 22, color = '#141414' }) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 22V14.5H15.5V22H21.75V12H25.5L13 0.75L0.5 12H4.25V22H10.5Z" 
      fill={color}/>
    </svg>
  );
};

export default HomeIcon;
