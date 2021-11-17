import React, { useEffect } from 'react';
import Chart from 'chart.js';
import barChartConfig from './barChartConfig';

const BarChart = ({ datas, labels }) => {
  const { options, plugins } = barChartConfig;

  useEffect(() => {
    let ctx = document.getElementById('myChart').getContext('2d');

    let data = {
      labels: labels,
      datasets: datas,
    };

    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    Chart.plugins.register(plugins);
  });

  return (
    <canvas
      id="myChart"
      style={{ height: '360px', maxWidth: '934px', marginLeft: '-2px' }}
    ></canvas>
  );
};

export default BarChart;
