import React from 'react';

const TalkingPersonIcon = ({ width, height, viewBox, color, className = '' }) => {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" 
        d="M36.4165 3.56283L39.8124 0.166992C47.9582 8.60449 47.9374 21.2295 
        39.8124 29.3337L36.4165 25.9378C42.1874 19.3128 42.1874 9.85449 
        36.4165 3.56283ZM25.0833 14.7503C25.0833 19.3527 21.3523 23.0837 
        16.7499 23.0837C12.1475 23.0837 8.41658 19.3527 8.41658 14.7503C8.41658 
        10.148 12.1475 6.41699 16.7499 6.41699C21.3523 6.41699 25.0833 10.148 
        25.0833 14.7503ZM0.083252 35.5837C0.083252 30.042 11.1874 27.2503 
        16.7499 27.2503C22.3124 27.2503 33.4166 30.042 33.4166 
        35.5837V39.7503H0.083252V35.5837ZM29.4167 10.6877C31.1667 13.146 
        31.1667 16.3335 29.4167 18.7918L32.9167 22.3127C37.125 18.1043 
        37.125 11.7502 32.9167 7.16684L29.4167 10.6877Z" 
        fill="#7A91A6"
      />
    </svg>
  );
};

TalkingPersonIcon.defaultProps = {
  width: 46,
  height: 40,
  viewBox: '0 0 46 40',
  color: '#7A91A6',
};

export default TalkingPersonIcon;
