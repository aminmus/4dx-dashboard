/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgressBar from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function ProgressBar({ clientName, clientMeasures }) {
  const [progress, setProgress] = useState(0);

  // Set client measures success progress
  useEffect(() => {
    const successfulMeasures = clientMeasures.reduce(
      (successTotal, measure) => (measure.success ? successTotal + 1 : successTotal),
      0
    );
    setProgress(
      parseInt(successfulMeasures)
        ? (parseInt(successfulMeasures) / parseInt(clientMeasures.length)) * 100
        : 0
    );
  }, [clientMeasures]);

  const matches = useMediaQuery('(min-width:600px)');

  const LinearProgress = withStyles({
    barColorPrimary: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    root: {
      flexBasis: '60%',
      height: '10px',
      margin: '10px',
      borderRadius: '10px',
      fill: 'red',
      background: 'black'
    }
  })(LinearProgressBar);

  const ContainerStyle = {
    display: 'flex',
    flexDirection: matches ? 'row' : 'column',
    justifyContent: 'space-between',
    padding: '10px'
  };

  const InnerContainerStyle = {
    flex: 2
  };

  const clientNameStyle = {
    flex: 1,
    color: progress ? 'white' : 'darkGray'
  };

  return (
    <div style={ContainerStyle}>
      <span style={clientNameStyle}>{clientName}</span>
      <div style={InnerContainerStyle}>
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
}

ProgressBar.defaultProps = {
  clientName: '',
  clientMeasures: [{ success: null }]
};

ProgressBar.propTypes = {
  clientName: PropTypes.string,
  clientMeasures: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};
