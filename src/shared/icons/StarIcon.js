import React from 'react';

const StarIcon = ({ color = '#03DAC6', classname = '', width = '14', height = '13' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path
        d="M7.00016 10.5135L11.1202 13.0002L10.0268 8.3135L13.6668 5.16016L8.8735 4.7535L7.00016 0.333496L5.12683 4.7535L0.333496 5.16016L3.9735 8.3135L2.88016 13.0002L7.00016 10.5135Z"
        fill={color}
      />
    </svg>
  );
};

export default StarIcon;
