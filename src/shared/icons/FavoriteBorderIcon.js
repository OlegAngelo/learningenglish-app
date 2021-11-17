import React from 'react';

const FavoriteBorderIcon = ({
  className = '',
  height = '19',
  width = '20',
  color = '#C0C0C0',
  onClick,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.11637C11.09 0.836367 12.76 0.0263672 14.5 0.0263672C17.58 0.0263672 20 2.44637 20 5.52637C20 9.30327 16.6056 12.3813 11.4627 17.0449L11.45 17.0564L10 18.3764L8.55 17.0664L8.51052 17.0305C3.38263 12.3706 0 9.2967 0 5.52637C0 2.44637 2.42 0.0263672 5.5 0.0263672C7.24 0.0263672 8.91 0.836367 10 2.11637ZM10 15.6764L10.1 15.5764C14.86 11.2664 18 8.41637 18 5.52637C18 3.52637 16.5 2.02637 14.5 2.02637C12.96 2.02637 11.46 3.01637 10.94 4.38637H9.07C8.54 3.01637 7.04 2.02637 5.5 2.02637C3.5 2.02637 2 3.52637 2 5.52637C2 8.41637 5.14 11.2664 9.9 15.5764L10 15.6764Z"
        fill={color}
      />
    </svg>
  );
};

export default FavoriteBorderIcon;
