import React from 'react'

const BrainIcon = ({ width, height, color, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0)">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.8652 17.097C8.57623 17.902 5.69324 16.562 5.11024 14.341C2.23224 14.336 0.024236 12.933 0.000235963 10.455C-0.037764 6.42401 4.51624 1.00701 12.0002 1.00001C19.4852 0.993007 23.9962 6.31201 24.0002 11.329C24.0042 16.346 19.8182 18.226 16.3932 17.592C16.0292 19.099 16.2222 21.17 16.6252 22.339L14.5162 23C13.7032 20.212 12.3162 18.033 10.8652 17.097ZM10.1732 7.82101C9.48224 7.50701 9.00024 6.80901 9.00024 6.00001C9.00024 4.89601 9.89624 4.00001 11.0002 4.00001C12.1042 4.00001 13.0002 4.89601 13.0002 6.00001C13.0002 6.26001 12.9502 6.50901 12.8602 6.73801C14.0742 7.64901 15.2652 8.59301 16.4592 9.53201C16.8842 9.19901 17.4192 9.00001 18.0002 9.00001C19.3802 9.00001 20.5002 10.12 20.5002 11.5C20.5002 12.88 19.3802 14 18.0002 14C16.8292 14 15.8452 13.193 15.5742 12.105C14.3732 12.203 13.1702 12.278 11.9682 12.359C11.7992 13.292 10.9812 14 10.0002 14C8.89624 14 8.00024 13.104 8.00024 12C8.00024 10.967 8.78524 10.116 9.79024 10.011C9.91124 9.28001 10.0422 8.55101 10.1732 7.82101ZM12.2332 7.57501C11.9362 7.80701 11.5722 7.95801 11.1752 7.99201L10.8122 10.172C11.3162 10.396 11.7102 10.823 11.8922 11.349L15.5392 11.06C15.5862 10.793 15.6762 10.541 15.8012 10.311L12.2332 7.57501Z" fill={color}/>
      </g>
      <defs>
      <clipPath id="clip0">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  );
};

export default BrainIcon;
