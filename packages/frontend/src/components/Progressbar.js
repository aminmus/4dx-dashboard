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
    ctx.fillStyle = 'green';
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
