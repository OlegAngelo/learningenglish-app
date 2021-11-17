import React from 'react'

const SpellingIcon = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.2584 2.69155C15.5834 3.01655 15.5834 3.54155 15.2584 3.86655L13.7334 5.39155L10.6084 2.26655L12.1334 0.741553C12.4584 0.416553 12.9834 0.416553 13.3084 0.741553L15.2584 2.69155ZM0.5 15.4999V12.3749L9.71667 3.15824L12.8417 6.28324L3.625 15.4999H0.5Z" fill={color} />
    </svg>
  );
};

export default SpellingIcon;
