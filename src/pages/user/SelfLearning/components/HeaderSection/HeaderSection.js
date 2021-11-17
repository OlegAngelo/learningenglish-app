import React, { useState, useEffect } from 'react';
import Header from '../../../../../shared/Header';

const HeaderSection = ({ parentComponent }) => {
  return (
    <div className="fixed w-full top-0 z-10">
      <Header title={parentComponent} hasBack={true} forcedUrl="/training">
      </Header>
    </div>
  );
};

export default HeaderSection;
