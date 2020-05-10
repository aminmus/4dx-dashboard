import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import COLORS from '../../style/COLORS';

const { primary, light } = COLORS;

/**
 * Contains the NPS graph as well as the options header
 * @component
 * @param {Object} props Component props
 * @param {Object} props.npsChartData Chart Data object used to determine NPS graph
 * @param {Object} props.npsChartData.graphData Data used to render graph
 * @param {Object} props.npsChartData.graphOptions Options for rendering graph
 */
const NpsContainer = ({ npsChartData: { graphData, graphOptions } }) => {
  const match = useMediaQuery('(min-width:600px)');

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: primary
    },
    mainContainer: {
      margin: '10px'
    },
    optionsContainer: {
      display: 'flex',
      margin: '10px',
      border: `1px solid ${light}`,
      borderRadius: '10px',
      justifyContent: 'center',
      flexDirection: match ? 'row' : 'column'
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <div className="chart-title">Nps (Monthly)</div>
      </div>
      <div>
        <Line data={graphData} options={graphOptions} />
      </div>
    </div>
  );
};

NpsContainer.propTypes = {
  npsChartData: PropTypes.objectOf(
    PropTypes.shape({
      graphData: PropTypes.arrayOf(PropTypes.any),
      graphOptions: PropTypes.objectOf(PropTypes.any)
    })
  ).isRequired
};

export default NpsContainer;
