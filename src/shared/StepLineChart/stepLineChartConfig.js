const stepLineChartConfig = {
  plugins: {
    beforeDraw: function (chartInstance, easing) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = '#FFFFFF';

      var chartArea = chartInstance.chartArea;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top
      );
    },
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,
    steppedLine: true,
    elements: {
      line: {
        tension: 0,
      },
      point: {
        radius: 0,
      },
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: 'linear',
          display: true,
          ticks: {
            display: false,
          },
          gridLines: {
            drawTicks: false,
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            display: false,
            min: -60,
            max: 60,
          },
          gridLines: {
            drawTicks: false,
            color: 'transparent',
            zeroLineColor: '#E7EFF4',
            zeroLineWidth: 1.5,
          },
        },
      ],
    },
  },
};

export default stepLineChartConfig;
