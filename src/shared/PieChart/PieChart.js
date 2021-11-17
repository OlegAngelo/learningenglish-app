import React, { useEffect, useRef } from 'react';

import pieChartCanvas from '../../utils/pieChart';

const PieChart = ({
  dataset,
  width,
  height,
}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    let canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    pieChartCanvas.pieRadius = Math.round(canvas.height / 3);
    pieChartCanvas.context = canvas.getContext("2d");
    pieChartCanvas.drawPieGraph(dataset, canvas.width, canvas.height);
  }, [dataset]);

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} className="w-full"></canvas>
    </div>
  );
};

PieChart.defaultProps = {
  dataset: [
    {
      name: 'In Progress',
      score: 70,
      color: '#03DAC6',
      spacing: 42
    },
    {
      name: 'Not Tried',
      score: 20,
      color: '#7A91A6',
      spacing: 40
    },
    {
      name: 'Mastered',
      score: 10,
      color: '#F5B160',
      spacing: 31
    },
  ],
  width: 500,
  height: 400,
};

export default PieChart;
