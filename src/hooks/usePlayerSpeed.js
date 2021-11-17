import { useState, useEffect } from "react";

/**
 * This can be used in the news function audio.
 */
const usePlayerSpeed = () => {
  const [speed, setSpeed] = useState('標準');

  const speedHandler = ({name, value}) => {
    setSpeed(name);
  };

  return [
    speed,
    speedHandler
  ]
}

export default usePlayerSpeed
