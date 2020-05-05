import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgressBar from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ProgressBar = ({ clientName, clientMeasures }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const [progress, setProgress] = useState(0);

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

  const useStyles = makeStyles({
    mainContainer: {
      display: 'flex',
      flexDirection: matches ? 'row' : 'column',
      justifyContent: 'space-between',
      padding: '10px'
    },
    innerContainer: {
      flex: 2
    },
    clientName: {
      flex: 1,
      color: progress ? 'white' : 'darkGray'
    }
  });

  const classes = useStyles();

  useEffect(() => {
    const successfulMeasures = clientMeasures.reduce(
      (successTotal, measure) => (measure.success ? successTotal + 1 : successTotal),
      0
    );
    setProgress(
      parseInt(successfulMeasures, 10)
        ? (parseInt(successfulMeasures, 10) / parseInt(clientMeasures.length, 10)) * 100
        : 0
    );
  }, [clientMeasures]);

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h6" className={classes.clientName}>
        {clientName}
      </Typography>
      <div className={classes.innerContainer}>
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  clientName: PropTypes.string.isRequired,
  clientMeasures: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
};

export default ProgressBar;
