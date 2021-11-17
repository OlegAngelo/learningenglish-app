import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import diamondCanvas from '../../utils/diamondCanvas';

const DiamondChart = ({datasets, sizeInPercent, isEnglish}) => {
    const canvasRef = useRef(null);

    useEffect(()=> {
      let canvas = canvasRef.current;

      canvas.width = 2185;
      canvas.height = 1370;

      diamondCanvas.context = canvas.getContext("2d");
      diamondCanvas.context.scale(5,5);
      diamondCanvas.drawGraph();

      //loop through dataset
      datasets.map((dataset) => {
        diamondCanvas.drawResults(dataset.reading, dataset.writting, dataset.listening, dataset.speaking, dataset.fillColor, dataset.strokeColor)
      });

      {
        isEnglish ? diamondCanvas.loadEnLabels() : diamondCanvas.loadJpLabels()
      }
    }, []);

    return (
        <>
          <canvas
            id="canvas"
            ref={canvasRef}
            style={{
              width: `${sizeInPercent}%`,
              margin: '0',
              padding: '0',
            }}
            className="mb-3"
          >
          </canvas>
        </>
      );
}

DiamondChart.propTypes = {
    datasets: PropTypes.array,
    sizeInPercent: PropTypes.number,
    isEnglish: PropTypes.bool,
};

DiamondChart.defaultProps = {
  datasets: [
    {
      fillColor: "rgba(3,218,198,0.6)",
      strokeStyle: "rgba(3,218,198,0)",
      reading: 60,
      writting: 90,
      listening: 80,
      speaking: 90,
    },
  ],
  sizeInPercent: 100,
  isEnglish: true,
};

export default DiamondChart
