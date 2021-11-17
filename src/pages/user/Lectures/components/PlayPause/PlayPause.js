import React, { Fragment } from 'react';

import PauseNonBorderIcon from '../../../../../shared/icons/PauseNonBorderIcon';
import PlayArrowNonCircleIcon from '../../../../../shared/icons/PlayArrowNonCircleIcon';
import ForwardTenIcon from '../../../../../shared/icons/ForwardTenIcon';
import ReplayTenIcon from '../../../../../shared/icons/ReplayTenIcon';

const PlayPause = ({ 
  playing, 
  onClick, 
  skipButtonBy, 
  toggleVideoControls, 
  showVideoControls,
}) => {

  return (
    <div
      className={`${
        showVideoControls ? 'opacity-important' : ''
      } play-pause`}
      
      onClick={() =>{
        toggleVideoControls('toggler');
      }}
    >
      {playing ? (
        <Fragment>
          <PauseNonBorderIcon
            height="54"
            width="54"
            onClick={(e) => onClick(e)}
            className="cursor-pointer button"
          />
        </Fragment>
      ) : (
        <PlayArrowNonCircleIcon
          height="54"
          width="54"
          onClick={(e) => onClick(e)}
          className="cursor-pointer button"
        />
      )}

      <button className="replay" onClick={(e) => skipButtonBy(e, 'replay', 10)}>
        <ReplayTenIcon color="#FEFEFE" />
      </button>

      <button className="forward" onClick={(e) => skipButtonBy(e, 'forward', 10)}>
        <ForwardTenIcon color="#FEFEFE" />
      </button>
    </div>
  );
};

export default PlayPause;
