import React from 'react';

const PolygonIcon = ({ width = '23', height = '20', color = '#FFFFFF', className, style }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M13.2009 18.2504C12.4191 19.5142 10.5809 19.5142 9.79912 18.2504L0.397646 3.05214C-0.426563 1.71974 0.531803 -2.27021e-06 2.09853 -2.13324e-06L20.9015 -4.89438e-07C22.4682 -3.52471e-07 23.4266 1.71974 22.6024 3.05214L13.2009 18.2504Z"
        fill={color}
      />
    </svg>
  );
};

export default PolygonIcon;
