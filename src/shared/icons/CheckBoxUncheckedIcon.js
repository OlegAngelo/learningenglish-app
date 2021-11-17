import React from 'react'

const CheckBoxUncheckedIcon = ({ width = 15, height = 16 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66667 0.5H13.3333C14.25 0.5 15 1.25 15 2.16667V13.8333C15 14.75 14.25 15.5 13.3333 15.5H1.66667C0.75 15.5 0 14.75 0 13.8333V2.16667C0 1.25 0.75 0.5 1.66667 0.5ZM13.3333 13.8333V2.16667H1.66667V13.8333H13.3333Z"
        fill="#7A91A6"
      />
    </svg>
  )
}

export default CheckBoxUncheckedIcon
