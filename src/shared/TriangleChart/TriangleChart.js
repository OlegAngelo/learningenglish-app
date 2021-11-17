import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import triangleCanvas from '../../utils/triangleCanvas';

const TriangleChart = ({ reading, speaking, sizeInPercent, classes }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let readingScore = canvas.getAttribute("data-reading");
    let speakingScore = canvas.getAttribute("data-speaking");

    canvas.width = 1400;
    canvas.height = 820;    

    triangleCanvas.context = canvas.getContext("2d");
    triangleCanvas.context.scale(5,5);
    triangleCanvas.drawGraph();
    triangleCanvas.drawResults(readingScore, speakingScore);
    triangleCanvas.loadLabels(readingScore, speakingScore);
  }, []);

  return (
    <>
      <canvas 
        id="canvas"
        data-reading={reading} 
        data-speaking={speaking}
        ref={canvasRef}
        style={{
          width: `${sizeInPercent}%`,
        }}
        className={`${classes}`}
      >  
      </canvas>
    </>
  );
};

TriangleChart.propTypes = {
  reading: PropTypes.number,
  speaking: PropTypes.number,
  sizeInPercent: PropTypes.number,
};

export default TriangleChart;
