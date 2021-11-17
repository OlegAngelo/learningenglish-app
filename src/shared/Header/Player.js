import React from 'react';
import PauseIcon from '../../shared/icons/PauseIcon';
import PlayIcon from '../../shared/icons/PlayIcon';

const Player = ({ action, onClick, isPlaying}) => {
  const renderIcon = () => isPlaying ? <PauseIcon /> : <PlayIcon />;

  return (
    <div>
      {(() => {
        switch (action) {
          case "PLAY":
            return <span className="play-icon no-shadow -mr-1" onClick={onClick}>
              { renderIcon() }
            </span>;
          default:
            return;
        }
      })()}
    </div>
  );
};

export default Player;
