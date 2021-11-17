import React from 'react'

const InvitationIcon = ({ className, width = 24, height = 26 }) => {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17 0.25V2.75H7V0.25H4.5V2.75H3.25C1.8625 2.75 0.7625 3.875 0.7625 5.25L0.75 22.75C0.75 24.125 1.8625 25.25 3.25 25.25H20.75C22.125 25.25 23.25 24.125 23.25 22.75V5.25C23.25 3.875 22.125 2.75 20.75 2.75H19.5V0.25H17ZM18.25 14H12V20.25H18.25V14ZM3.25 22.75H20.75V9H3.25V22.75Z" 
      fill="#141414"/>
    </svg>
  );
};

export default InvitationIcon;
