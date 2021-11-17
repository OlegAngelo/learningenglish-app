import React, { useEffect } from 'react';
import Chart from 'chart.js';

import stepLineChartConfig from './stepLineChartConfig';

const StepLineChart = ({ dataset, className = '', height = '118', width = '100%' }) => {
  const { options, plugins } = stepLineChartConfig;

  useEffect(() => {
    new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
        datasets: dataset,
      },
      options: options,
      plugins: plugins,
    });
  });

  return (
    <div>
      <canvas
        id="myChart"
        className={className}
        height={height}
        width={width}
      ></canvas>
    </div>
  );
};

export default StepLineChart;
