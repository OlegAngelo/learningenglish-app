import React, { useState, useEffect } from 'react';
import Wave from 'react-waveview';

const Bubble = ({ percent = 0 }) => {
  const [isAnimate, setAnimate] = useState(true);
  const [height, setHeight] = useState(0);
  const waveItems = [
    { A: 10, T: 80, fill: '#C9EBE8' },
    { A: 20, T: 85, fill: '#03DAC6' },
  ];

  const getHeight = (num) => {
    if (num === 0) {
      return -10;
    } else if (num < 10) {
      return num + 10;
    } else if (num < 20) {
      return num + 7;
    } else if (num < 30) {
      return num + 5;
    } else if (num < 40) {
      return num + 2;
    } else if (num === 100) {
      return num + 10;
    } else {
      return num;
    }
  };

  useEffect(() => {
    let interval;
    if (height != percent) {
      interval = setInterval(() => {
        setHeight(height + 1);
      }, 50);
    } else {
      setAnimate(false);
    }

    return () => clearInterval(interval);
  }, [height]);

  return (
    <div
      style={{ width: '120px', height: '120px' }}
      className="flex justify-center items-center rounded-full mx-px-20 border-px-2 p-px-2 z-5"
    >
      <Wave
        speed={1000}
        H={getHeight(height)}
        waveParams={waveItems}
        className={`w-full bg-basic-400 rounded-full z-0`}
        animated={isAnimate}
      />
      <div className="absolute font-hiragino text-center font-bold text-12 text-primary-500">
        <div>目標達成度</div>
        <div className="leading-none font-sans">
          <span className="text-40">{height}</span>
          <span className="text-30">%</span>
        </div>
      </div>
    </div>
  );
};

export default Bubble;
