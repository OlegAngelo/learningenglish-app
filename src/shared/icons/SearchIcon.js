import React from 'react';

const SearchIcon = ({ style, className, width = 16, height = 16, fill = '#9CA3AF', ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2583 9.66667H10.9167L15.075 13.8333L13.8333 15.075L9.66667 10.9167V10.2583L9.44167 10.025C8.49167 10.8417 7.25833 11.3333 5.91667 11.3333C2.925 11.3333 0.5 8.90833 0.5 5.91667C0.5 2.925 2.925 0.5 5.91667 0.5C8.90833 0.5 11.3333 2.925 11.3333 5.91667C11.3333 7.25833 10.8417 8.49167 10.025 9.44167L10.2583 9.66667ZM2.16667 5.91667C2.16667 7.99167 3.84167 9.66667 5.91667 9.66667C7.99167 9.66667 9.66667 7.99167 9.66667 5.91667C9.66667 3.84167 7.99167 2.16667 5.91667 2.16667C3.84167 2.16667 2.16667 3.84167 2.16667 5.91667Z"
        fill={fill}
      />
    </svg>
  );
};

export default SearchIcon;
