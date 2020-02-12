/* eslint-disable radix */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar(props) {
  const { clientScore, clientName } = props;

  useEffect(() => {
    const [progress, total] = clientScore.split('/');

    const canvas = document.getElementById(clientName);
    const ctx = canvas.getContext('2d');
    const x = parseInt(progress) / parseInt(total);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#E5000A';
    switch (true) {
      case x >= 0.2 && x < 0.4:
        ctx.fillStyle = '#DB6200';
        break;
      case x >= 0.4 && x < 0.6:
        ctx.fillStyle = '#D2C500';
        break;
      case x >= 0.6 && x < 0.8:
        ctx.fillStyle = '#70C800';
        break;
      default:
        ctx.fillStyle = '#0CBF00';
    }
    ctx.fillRect(0, 0, canvas.width * x, canvas.height);
  });

  return (
    <div className="justify-content-center py-1">
      <span>{clientName}</span>
      <canvas id={clientName} style={{ backgroundColor: 'black', width: '100%', height: '10px' }} />
    </div>
  );
}

ProgressBar.defaultProps = {
  clientName: '',
  clientScore: ''
};

ProgressBar.propTypes = {
  clientName: PropTypes.string,
  clientScore: PropTypes.string
};
