/* eslint-disable radix */
import React from 'react';
import PropTypes from 'prop-types';
import LinearProgressBar from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function ProgressBar(props) {
  const { clientScore, clientName } = props;
  const [value, total] = clientScore.split('/');
  const progress = parseInt(value) ? (parseInt(value) / parseInt(total)) * 100 : 0;
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
    justifyContent: 'space-between'
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
  clientScore: ''
};

ProgressBar.propTypes = {
  clientName: PropTypes.string,
  clientScore: PropTypes.string
};
