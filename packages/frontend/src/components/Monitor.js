import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

export default function Monitor(props) {
  const { chart } = props;
  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);

  const updateData = (graph, newLabels, newData) => {
    graph.data.datasets[0].data = newData;
    graph.data.labels = newLabels;
    graph.update();
  };

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

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
        })
      );
    } else {
      updateData(graph, chart.months, chart.values);
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
    values: PropTypes.array
  })
};
