import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { useMediaQuery, Typography, IconButton } from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from '../style/COLORS';

const { primary, light, gray } = COLORS;

/**
 * Contains the NPS graph as well as the options header
 * @component
 * @param {Object} props Component props
 * @param {Object} props.npsChartData Chart Data object used to determine NPS graph
 * @param {Object} props.npsChartData.graphData Data used to render graph
 * @param {Object} props.npsChartData.graphOptions Options for rendering graph
 * @param {Object} props.handleSwitchGraphClick Handle event for switching graph
 */
const NpsContainer = ({ npsChartData: { graphData, graphOptions }, handleSwitchGraphClick }) => {
  const match = useMediaQuery('(min-width:600px)');

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: primary,
      border: `1px solid ${gray}`,
      borderRadius: '0.1em'
    },
    mainContainer: {
      minWidth: 0,
      margin: '2em 0em'
    },
    optionsContainer: {
      display: 'flex',
      padding: '0.2em',
      border: `1px solid ${light}`,
      borderRadius: '0.2em',
      justifyContent: 'center',
      flexDirection: match ? 'row' : 'column'
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <IconButton onClick={handleSwitchGraphClick}>
          <SkipPreviousIcon />
        </IconButton>
        <Typography variant="h4">Nps (Monthly)</Typography>
        <IconButton onClick={handleSwitchGraphClick}>
          <SkipNextIcon />
        </IconButton>
      </div>
      <Line data={graphData} options={graphOptions} />
    </div>
  );
};

NpsContainer.propTypes = {
  npsChartData: PropTypes.objectOf(
    PropTypes.shape({
      graphData: PropTypes.arrayOf(PropTypes.any),
      graphOptions: PropTypes.objectOf(PropTypes.any)
    })
  ).isRequired,
  handleSwitchGraphClick: PropTypes.func.isRequired
};

export default NpsContainer;
