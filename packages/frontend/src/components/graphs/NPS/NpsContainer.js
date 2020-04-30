import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OptionsToggleButton from '../../elements/OptionsToggleButton';
import COLORS from '../../../style/COLORS';

const { primary, light } = COLORS;

const NpsContainer = ({ npsChartData: { graphData, graphOptions } }) => {
  const match = useMediaQuery('(min-width:600px)');
  const [optionsShow, setOptionsShow] = useState(false);

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

  /**
   * Toggle Options handler
   * @param {Object} e - Event Input
   */
  const toggleOptions = e => {
    e.preventDefault();
    setOptionsShow(!optionsShow);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <div className="chart-title">Nps (Monthly)</div>
        <OptionsToggleButton onClick={toggleOptions} />
      </div>

      <div>
        {optionsShow && (
          <div className={classes.optionsContainer}>
            <div>No options present</div>
          </div>
        )}
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
