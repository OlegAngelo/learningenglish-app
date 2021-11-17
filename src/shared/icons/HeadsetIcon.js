import React from 'react';

const HeadsetIcon = ({ width = '12', height = '14', color = '#044071',className= '', opacity='' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 0.666504C2.68667 0.666504 0 3.35317 0 6.6665V11.3332C0 12.4398 0.893333 13.3332 2 13.3332H4V7.99984H1.33333V6.6665C1.33333 4.0865 3.42 1.99984 6 1.99984C8.58 1.99984 10.6667 4.0865 10.6667 6.6665V7.99984H8V13.3332H10C11.1067 13.3332 12 12.4398 12 11.3332V6.6665C12 3.35317 9.31333 0.666504 6 0.666504Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default HeadsetIcon;
