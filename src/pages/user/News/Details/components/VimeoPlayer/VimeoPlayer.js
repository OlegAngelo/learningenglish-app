import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPlayerId } from '../../../../../../redux/vimeoPlayer/slice';

const VimeoPlayer = ({
  playerId,
  vimeoId,
  width='640',
  height='360',
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (playerId) dispatch(setPlayerId(playerId));
  }, [playerId]);

  return (
    <iframe
      id={playerId}
      src={`https://player.vimeo.com/video/${vimeoId}`}
      width={width}
      height={height}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; encrypted-media"
    ></iframe>
  )
};

export default VimeoPlayer;
