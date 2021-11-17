import React from 'react';

const AlarmIcon = ({ colorName, width = 20, height = 20 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={`fill-${colorName}`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.61997 2.86772L5.55231 1.58789L1.71289 4.79089L2.78047 6.07072L6.61997 2.86772ZM14.4466 1.58841L18.2861 4.79141L17.2184 6.07124L13.3789 2.86824L14.4466 1.58841ZM10.4163 6.74592H9.16625V11.7459L13.1246 14.1209L13.7496 13.0959L10.4163 11.1209V6.74592ZM9.99958 3.41258C5.85792 3.41258 2.49958 6.77092 2.49958 10.9126C2.49958 15.0542 5.85792 18.4126 9.99958 18.4126C14.1412 18.4126 17.4996 15.0542 17.4996 10.9126C17.4996 6.77092 14.1412 3.41258 9.99958 3.41258ZM4.16625 10.9126C4.16625 14.1292 6.78292 16.7459 9.99958 16.7459C13.2162 16.7459 15.8329 14.1292 15.8329 10.9126C15.8329 7.69591 13.2162 5.07925 9.99958 5.07925C6.78292 5.07925 4.16625 7.69591 4.16625 10.9126Z"
    />
  </svg>
);

export default AlarmIcon;