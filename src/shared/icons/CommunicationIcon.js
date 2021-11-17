import React from 'react'

const CommunicationIcon = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.6667 0.666748C16.5834 0.666748 17.3251 1.41675 17.3251 2.33341L17.3334 17.3334L14.0001 14.0001H2.33341C1.41675 14.0001 0.666748 13.2501 0.666748 12.3334V2.33341C0.666748 1.41675 1.41675 0.666748 2.33341 0.666748H15.6667ZM4.00008 10.6667H14.0001V9.00008H4.00008V10.6667ZM14.0001 8.16675H4.00008V6.50008H14.0001V8.16675ZM4.00008 5.66675H14.0001V4.00008H4.00008V5.66675Z" fill={color} />
    </svg>
  );
};

export default CommunicationIcon;
