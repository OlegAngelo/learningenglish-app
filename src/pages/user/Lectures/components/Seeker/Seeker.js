import React, { useState } from 'react';

const Seeker = ({ currentPositionPercentual = 0, duration, onSeek }) => {
  const handleOnChange = (e) => {
    onSeek(e.target.value)
  }

  return (
    <div
      className="seeker"
    >
      <input 
        type="range" 
        className="slider"
        onChange={handleOnChange}
        value={currentPositionPercentual * 100}
        style={{ background: `linear-gradient(to right, #03DAC6 0%, #03DAC6 ${currentPositionPercentual * 100}%, #e3faf8 ${currentPositionPercentual * 100}%, white 100%)` }}
      />
    </div>
  );
};

export default Seeker;
