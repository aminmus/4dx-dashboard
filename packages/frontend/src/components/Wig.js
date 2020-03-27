import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

export default function Wig(props) {
  const { nps } = props;
  const { current, description, goal } = nps;
  const currentInt = parseInt(current, 10);
  const goalInt = parseInt(goal, 10);
  const progress = currentInt && goalInt ? (currentInt / goalInt) * 100 : 0;

  const setColorBasedOnProgress = score => {
    if (score > 70) {
      return '#28a745';
    }
    if (score > 50) {
      return '#ffc107';
    }
    return '#dc3545';
  };

  const ChartLabelContainerStyle = {
    position: 'absolute',
    top: 40,
    left: 50,
    right: 50,
    bottom: 50,
    padding: '0px'
  };

  const LabelText = {
    display: 'block',
    fontSize: '1em'
  };
  const LabelValue = {
    display: 'block',
    fontSize: '2em',
    color: setColorBasedOnProgress(progress)
  };

  const CircularProgressBar = withStyles({
    root: {
      position: 'relative',
      color: setColorBasedOnProgress(progress),
      border: '2px solid black',
      borderRadius: '50%',
      borderColor: 'gray',
      padding: '5px'
    }
  })(CircularProgress);

  return (
    <div className="mt-3">
      <h2>WIG</h2>
      <h3 className="wig__statement">{description}</h3>
      <div style={{ position: 'relative' }}>
        <CircularProgressBar size={150} thickness={5} variant="static" value={progress} />
        <div style={ChartLabelContainerStyle}>
          <span style={LabelText}>NPS</span>
          <span style={LabelValue}>{current}</span>
        </div>
      </div>
    </div>
  );
}

Wig.defaultProps = {
  nps: {}
};

Wig.propTypes = {
  nps: PropTypes.shape({
    description: PropTypes.string,
    current: PropTypes.number,
    goal: PropTypes.number,
    defineClients: PropTypes.string,
    defineText: PropTypes.string,
    implementText: PropTypes.string
  })
};
