import React from 'react';

const ReceiptIcon = ({
  color = 'white',
  width = '20',
  height = '20',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg "
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 17.0827L2.5 18.3327V1.66602L3.75 2.91602L5 1.66602L6.25 2.91602L7.5 1.66602L8.75 2.91602L10 1.66602L11.25 2.91602L12.5 1.66602L13.75 2.91602L15 1.66602L16.25 2.91602L17.5 1.66602V18.3327L16.25 17.0827L15 18.3327L13.75 17.0827L12.5 18.3327L11.25 17.0827L10 18.3327L8.75 17.0827L7.5 18.3327L6.25 17.0827L5 18.3327L3.75 17.0827ZM15 5.83268V7.49935H5V5.83268H15ZM5 9.16602V10.8327H15V9.16602H5ZM5 12.4993V14.166H15V12.4993H5Z"
        fill={color}
      />
    </svg>
  );
};

export default ReceiptIcon;
