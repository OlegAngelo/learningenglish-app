import React from 'react';

const StarIconBorder = ({ color = '#C0C0C0', classname = '' }) => {
  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.8735 4.74683L13.6668 5.16016L10.0335 8.3135L11.1202 13.0002L7.00016 10.5135L2.88016 13.0002L3.9735 8.3135L0.333496 5.16016L5.12683 4.7535L7.00016 0.333496L8.8735 4.74683ZM4.49352 10.7801L7.00019 9.2668L9.51352 10.7868L8.84686 7.93346L11.0602 6.01346L8.14019 5.76013L7.00019 3.0668L5.86686 5.75346L2.94686 6.0068L5.16019 7.9268L4.49352 10.7801Z"
        fill={color}
      />
    </svg>
  );
};

export default StarIconBorder;
