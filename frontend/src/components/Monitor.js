import React, { useEffect } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

export default function Monitor(props) {
  const { chart } = props;
  const chartRef = React.createRef();

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

    Chart = new Chart(detailsChartRef, {
      type: 'line',
      data: {
        labels: chart.months,
        datasets: [
          {
            data: chart.values,
            borderColor: ['rgba(250, 191, 44, 1)'],
            borderWidth: 3,
            pointRadius: 5,
            pointBorderWidth: 3,
            pointBackgroundColor: 'rgba(250, 191, 44, 1)',
            fill: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                fontColor: 'pink'
              },
              ticks: {
                beginAtZero: false,
                suggestedMax: 30,
                suggestedMin: -60
              }
            }
          ]
        },
        legend: {
          display: false
        },
        fill: false
      }
    });
  });
  return (
    <div className="chart__nps">
      <canvas id="chart__nps" ref={chartRef} />
    </div>
  );
}

Monitor.defaultProps = {
  chart: {}
};

Monitor.propTypes = {
  chart: PropTypes.shape({
    months: PropTypes.array,
    values: PropTypes.array
  })
};
