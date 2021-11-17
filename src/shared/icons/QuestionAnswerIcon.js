import React from 'react';

const QuestionAnswerIcon = ({ color = '#044071' }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3335 0.999674V6.99967C10.3335 7.36634 10.0335 7.66634 9.66683 7.66634H3.00016L0.333496 10.333V0.999674C0.333496 0.633008 0.633496 0.333008 1.00016 0.333008H9.66683C10.0335 0.333008 10.3335 0.633008 10.3335 0.999674ZM11.6668 2.99967H13.0002C13.3668 2.99967 13.6668 3.29967 13.6668 3.66634V13.6663L11.0002 10.9997H3.66683C3.30016 10.9997 3.00016 10.6997 3.00016 10.333V8.99967H11.6668V2.99967Z"
        fill={color}
      />
    </svg>
  );
};

export default QuestionAnswerIcon;
