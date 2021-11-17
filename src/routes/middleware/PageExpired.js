import React from 'react';
import { Route } from 'react-router-dom';

import style from './notFound.module.css';

const PageExpired = () => {
  return (
    <div
      className={`h-full grid justify-items-center place-content-center ${style.container}`}
    >
      <h1>419</h1>
      <p>Session has expired. The page is no longer available.</p>
      <a href="/">Go to home page</a>
    </div>
  );
};

export default PageExpired;
