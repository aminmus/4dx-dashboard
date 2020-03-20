/* eslint-disable no-param-reassign */

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

export default function Monitor(props) {
  const { chart } = props;
  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);

  const updateData = (graphData, newLabels, newData, newTarget) => {
    graphData.data.datasets[0].data = newData;
    graphData.data.datasets[1].data = newTarget;
    graphData.data.labels = newLabels;
    graphData.update();
  };

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

    let targetValues = [];
    if (chart.target) {
      targetValues = chart.values.map(() => null);
      targetValues[0] = chart.target;
      targetValues[chart.values.length - 1] = chart.target;
    }

    if (graph === null) {
      setGraph(
        new Chart(detailsChartRef, {
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
              },
              {
                data: targetValues,
                spanGaps: true,
                borderWidth: 2,
                borderColor: 'lightgreen',
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'NPS Over Time (monthly)',
              fontColor: 'rgba(250, 191, 44, 1)'
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Measures Completed',
                    fontColor: 'rgba(250, 191, 44, 1)'
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
        })
      );
    } else {
      updateData(graph, chart.months, chart.values, targetValues);
    }
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
    values: PropTypes.array,
    target: PropTypes.number
  })
};
