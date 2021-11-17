import React from 'react';
import MicIcon from '../icons/MicIcon';
import Equalizer from '../icons/Equalizer';
import StopIcon from '../icons/StopIcon';

import style from './Recorder.module.css';

const Recorder = ({ type = 'disabled', className = '', blink = false, onClick }) => {
  const types = {
    disabled: { width: 13.36, height: 18.69, color: '#C0C0C0' },
    default: { width: 16.33, height: 22.84, color: '#0C5F8D' },
    recording: { width: 64, height: 64, color: '#E34E42' }
  };
  const displayIcon = () => {
    if(type === 'recording') {
      return <StopIcon width={types[type].width} height={types[type].height} color="#FFFFFF" onClick={onClick} />;
    } else{
      return <MicIcon width={types[type].width} height={types[type].height} color="#FFFFFF" onClick={onClick} />;
    }
  };

  const getRecorderTypeStyle = (type) => {
    let blinkStyle = blink ? style.blink : '';

    if (type === 'recording') {
      return `${blinkStyle} absolute top-px-5 left-px-5`;
    } else if (type === 'default') {
      return `${blinkStyle} shadow-btn-choice`;
    }
  };

  const recorderContainerStyle = `justify-center items-center flex w-16 h-16 border-px-2 border-red-500 ${
    style.recordingCircle
  } ${type === 'recording' ? '' : 'hidden'} ${blink ? style.blink : ''}`;

  return (
    <div className={`relative ${className} ${style.icon}`}>
      <div className={recorderContainerStyle} />
      <div
        style={{ backgroundColor: types[type].color }}
        className={`${style.recordingCircle} justify-center items-center flex w-px-54 h-px-54 ${getRecorderTypeStyle(type)}`} >
        {displayIcon()}
      </div>
    </div>
  );
};

export default Recorder;
