const barChartConfig = {
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
    layout: {
      padding: {
        top: -25,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    type: 'bar',
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMax: 400,
            stepSize: 50,
            mirror: true,
            padding: -7,
            labelOffset: -5,
            fontSize: 9,
            fontColor: '#C0C0C0',
            callback: function (value, index, values) {
              if (
                value % 100 === 0 &&
                index !== 0 &&
                index !== values.length - 1
              ) {
                return value;
              }
              return '';
            },
          },
          gridLines: {
            drawBorder: false,
            drawTicks: false,
            zeroLineWidth: 1,
            zeroLineColor: '#6b7280',
          },
        },
      ],
      xAxes: [
        {
          maxBarThickness: 20,
          categoryPercentage: 0.4,
          ticks: {
            fontSize: 14,
            fontColor: '#162750',
            padding: 13,
          },
          gridLines: {
            drawBorder: false,
            drawTicks: false,
            zeroLineWidth: 1,
            zeroLineColor: '#6b7280',
            color: 'transparent',
          },
        },
      ],
    },
  },
};

export default barChartConfig;
