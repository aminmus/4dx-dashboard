import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const MeasuresOverTime = ({ graphData, graphOptions }) => {
  const ContainerStyle = {
    margin: '10px',
    color: 'white'
  };

  return (
    <div style={ContainerStyle}>
      <Line data={graphData} options={graphOptions} />
    </div>
  );
};

MeasuresOverTime.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.object).isRequired,
  graphOptions: PropTypes.objectOf(PropTypes.any).isRequired
};

export default MeasuresOverTime;
