import React from 'react';

import Button from '../../../../../../../shared/Button';
import styles from './AudioPlayer.module.css';

const AudioPlayer = ({ src, ontoggle, onClick }) => {

  return (
    <div className="flex flex-col h-auto">
      <Button
        onClick={onClick}
        className="flex h-40 items-center justify-center"
        innerClass={`${styles.btnPlayer} bg-primary-500 flex h-px-26 items-center justify-center px-4 rounded shadow-btn text-basic-400 w-24`}
        type="darkblue-square-icon"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.2776 14.1209L10.2776 16C13.842 15.1699 16.4998 11.9042 16.4998 8C16.4998 4.09578 13.842 0.830101 10.2776 -2.10513e-06L10.2776 1.87913C12.8465 2.66363 14.722 5.10832 14.722 8C14.722 10.8917 12.8465 13.3364 10.2776 14.1209ZM0.500001 10.7367L0.500002 5.26347L4.05556 5.26347L8.5 0.702467L8.5 15.2977L4.05556 10.7367L0.500001 10.7367ZM12.4998 8.00007C12.4998 9.61467 11.5931 11.0012 10.2776 11.6762L10.2776 4.33302C11.5931 4.99893 12.4998 6.38548 12.4998 8.00007Z"
            fill='#FFF'
          />
        </svg>
      </Button>
    </div>
  );
}

export default AudioPlayer;
