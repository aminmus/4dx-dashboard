/* eslint-disable no-unused-vars, no-plusplus, no-console, react/prop-types, react/destructuring-assignment, no-shadow, no-param-reassign */

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import formatMeasureProgress from './formatMeasureProgress';

export default function MeasuresGoalChart(props) {
  const { measures } = props;
  const { targetDate, targetMeasures } = props.measuresGoal;

  const formattedMeasureData = formatMeasureProgress(measures, targetDate, targetMeasures);
  const currentChartLabels = formattedMeasureData.current.map(entry => entry.date);
  const currentChartValues = formattedMeasureData.current.map(entry => entry.measuresCompleted);
  const targetChartValues = formattedMeasureData.target.map(entry => {
    return entry !== null ? entry.measuresCompleted : null;
  });

  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

    if (graph === null) {
      setGraph(
        new Chart(detailsChartRef, {
          type: 'line',
          data: {
            labels: currentChartLabels,
            datasets: [
              {
                data: currentChartValues,
                borderColor: ['rgba(250, 191, 44, 1)'],
                borderWidth: 3,
                pointRadius: 5,
                pointBorderWidth: 3,
                pointBackgroundColor: 'rgba(250, 191, 44, 1)',
                fill: false
              },
              {
                data: targetChartValues,
                spanGaps: true,
                borderColor: ['red'],
                borderWidth: 3,
                pointRadius: 5,
                pointBorderWidth: 3,
                pointBackgroundColor: 'red',
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
                    suggestedMax: targetMeasures,
                    suggestedMin: currentChartValues[0]
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
    }
  });

  return (
    <div className="chart__nps">
      <canvas id="chart__nps" ref={chartRef} />
    </div>
  );
}
