import React from 'react';

const FeedbackMessage = ({ flag, message }) => {
  const styleConfig = {
    failed:
      'bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-5 rounded relative',
    success:
      'bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-5 rounded relative',
  };

  return (
    <div className={styleConfig[flag]} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default FeedbackMessage;
