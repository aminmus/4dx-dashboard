/* eslint-disable no-unused-vars, react/prop-types, no-param-reassign */

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import formatMeasureProgress from './formatMeasureProgress';

export default function MeasureGoalsChart(props) {
  const { measures, measuresGoal } = props;
  const { targetDate, targetMeasures } = measuresGoal;
  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);

  const formattedMeasureData = formatMeasureProgress(measures, targetDate, targetMeasures);
  const currentChartLabels = formattedMeasureData.current.map(entry => entry.date);
  const currentChartValues = formattedMeasureData.current.map(entry => entry.measuresCompleted);
  const targetChartValues = formattedMeasureData.target.map(entry => {
    return entry ? entry.measuresCompleted : null;
  });

  const updateData = (graphInstance, newLabels, newData, newTargetData) => {
    graphInstance.data.datasets[0].data = newData;
    graphInstance.data.datasets[1].data = newTargetData;
    graphInstance.data.labels = newLabels;
    graphInstance.update();
  };

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

    if (!graph) {
      setGraph(
        new Chart(detailsChartRef, {
          type: 'line',
          data: {
            labels: currentChartLabels,
            datasets: [
              {
                data: currentChartValues,
                borderColor: 'rgba(250, 191, 44, 1)',
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
            responsive: true,
            title: {
              display: true,
              text: 'Measures Completed Over Time (weekly)',
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
    } else {
      updateData(graph, currentChartLabels, currentChartValues, targetChartValues);
    }
  }, []);

  return (
    <div className="chart__nps">
      <canvas id="chart__nps" ref={chartRef} />
    </div>
  );
}
