import React from 'react';
import MicIcon from '../../../../../../../../../../shared/icons/MicIcon';
import StopIcon from '../../../../../../../../../../shared/icons/StopIcon';

import style from './Recorder.module.css';

const Recorder = ({ type = 'disabled', className = '', onClick }) => {
  const types = {
    disabled: { width: 13.36, height: 18.69, color: '#C0C0C0' },
    default: { width: 15.33, height: 21.84, color: '#0C5F8D' },
    recording: { width: 64, height: 64, color: '#E34E42' }
  };

  const displayIcon = () => {
    if(type === 'recording') {
      return <StopIcon width={types[type].width} height={types[type].height} color="#FFFFFF" onClick={onClick} />;
    } else {
      return <MicIcon width={types[type].width} height={types[type].height} color="#FFFFFF" onClick={onClick} />;
    }
  };

  return (
    <div className={`relative ${className} ${style.icon}`}>
      <div
        className={`justify-center items-center flex ${style.circle} border-px-2 border-red-500 ${style.recordingCircle} ${type === 'recording' ? '' : 'hidden'}`}
      ></div>
      <div
        style={{ backgroundColor: types[type].color }}
        className={`${style.recordingCircle} justify-center items-center flex w-px-44 h-px-44 ${type === 'recording' ? 'absolute top-px-5 left-px-5' : ''} ${type === 'default' ? 'shadow-btn-choice' : ''}`} >
        {displayIcon()}
      </div>
    </div>
  );
};

export default Recorder;
