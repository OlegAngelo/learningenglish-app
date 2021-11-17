import React from 'react';

const ErrorMessage = ({ errors, serverErrors, show = true }) => {
  if (!show) return null;

  if (serverErrors) return <p className="text-red-500 mt-px-2">{serverErrors[0]}</p>;

  return <p className="text-red-500 mt-px-2">{errors && errors.message}</p>;
};

export default ErrorMessage;
