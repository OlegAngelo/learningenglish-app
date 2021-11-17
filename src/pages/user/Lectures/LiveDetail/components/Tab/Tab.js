import React from 'react';

export default function Tab({ children, isActive, onClick }) {
  const className = `text-center border-basic-400 text-14 focus:outline-none pt-px-9 pb-px-10
   ${isActive ? 'border-b-px-3 font-semibold text-basic-400' : 'text-primary-200'}`;

  return (
    <li className="flex-grow">
      <div
        className={className}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        {children}
      </div>
    </li>
  );
};
