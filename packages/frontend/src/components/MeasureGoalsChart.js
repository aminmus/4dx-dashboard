/* eslint-disable no-unused-vars, react/prop-types, no-param-reassign */

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import formatMeasureProgress from './formatMeasureProgress';

const updateData = (graphInstance, newLabels, newData, newTargetData) => {
  graphInstance.data.datasets[0].data = newData;
  graphInstance.data.datasets[1].data = newTargetData;
  graphInstance.data.labels = newLabels;
  graphInstance.update();
};

export default function MeasureGoalsChart(props) {
  const { measures, measuresGoal } = props;
  const { targetDate, targetMeasures } = measuresGoal;
  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);

  const { labels, data } = formatMeasureProgress(measures, targetDate, targetMeasures);
  const { measuresData, targetData, highlightData } = data;

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

    if (!graph) {
      setGraph(
        new Chart(detailsChartRef, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                data: measuresData,
                borderColor: 'rgba(250, 191, 44, 1)',
                borderWidth: 3,
                pointRadius: 0,
                pointBorderWidth: 0,
                pointBackgroundColor: 'rgba(250, 191, 44, 1)',
                fill: false,
                steppedLine: true
              },
              {
                data: highlightData,
                borderColor: 'green',
                borderWidth: 3,
                pointRadius: 4,
                pointBorderWidth: 4,
                pointBackgroundColor: 'green',
                fill: false,
                steppedLine: true
              },
              {
                data: targetData,
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
            tooltips: {
              bodyFontSize: 18,
              titleFontSize: 20,
              callbacks: {
                /* TODO: GENERATE DATA POINTS FOR TARGET LINE USING SLOPE OF TARGET LINE
                ROUND THE VALUE UP/DOWN IN THE TOOLBOX AND LIST BELOW
                */
                label: tooltipItem => {
                  const { datasetIndex, value } = tooltipItem;
                  if (datasetIndex === 1) {
                    return `Completed: ${value}`;
                  }
                  if (datasetIndex === 2) {
                    return `Target: ${value}`;
                  }
                  return null;
                }
              }
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    maxTicksLimit: 9,
                    callback(value, index, values) {
                      if (index % 7 === 0 || index === values[index.length]) {
                        return value;
                      }
                      return null;
                    }
                  }
                }
              ],
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
                    suggestedMin: measuresData[0]
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
      updateData(graph, labels, measuresData, targetData);
    }
  }, []);

  return (
    <div className="chart__nps">
      <canvas id="chart__nps" ref={chartRef} />
    </div>
  );
}
