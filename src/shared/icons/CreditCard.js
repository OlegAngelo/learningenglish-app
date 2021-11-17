import React from 'react';

const CreditCard = ({
  color = 'white',
  width = '18',
  height = '18',
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
        d="M15 3H3C2.1675 3 1.5075 3.6675 1.5075 4.5L1.5 13.5C1.5 14.3325 2.1675 15 3 15H15C15.8325 15 16.5 14.3325 16.5 13.5V4.5C16.5 3.6675 15.8325 3 15 3ZM15 13.5H3V9H15V13.5ZM3 6H15V4.5H3V6Z"
        fill={color}
      />
    </svg>
  );
};

export default CreditCard;
