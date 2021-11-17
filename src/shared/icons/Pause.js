import React from 'react';

const Pause = ({ width, height, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.99992 0.333496C3.31992 0.333496 0.333252 3.32016 0.333252 7.00016C0.333252 10.6802 3.31992 13.6668 6.99992 13.6668C10.6799 13.6668 13.6666 10.6802 13.6666 7.00016C13.6666 3.32016 10.6799 0.333496 6.99992 0.333496ZM6.33325 9.66683H4.99992V4.3335H6.33325V9.66683ZM7.66659 9.66683H8.99992V4.3335H7.66659V9.66683Z" fill="#0C5F8D"/>
    </svg>  
  );
};

export default Pause;
