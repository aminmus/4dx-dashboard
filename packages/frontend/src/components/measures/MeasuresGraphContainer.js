/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import OptionsToggleButton from '../elements/OptionsToggleButton';
import IntervalSpanDialog from '../elements/IntervalSpanDialog';
import InputMeasuresGoal from '../elements/InputMeasuresGoal';
import { addResource } from '../../slices/resources';
import COLORS from '../../style/COLORS';
import AddNewResourceButton from '../elements/editMode/AddNewResourceButton';

const { primary, light, gray } = COLORS;

/**
 * Contains the Measure over time graph as well as the options header
 * @component
 * @param {Object} props Component props
 * @param {Object} props.measureGoals Measure goals object
 * @param {Object} props.measuresChartData Chart Data object used to determine NPS graph
 * @param {Object} props.measuresChartData.graphData Data used to render graph
 * @param {Object} props.measuresChartData.graphOptions Options for rendering graph
 * @param {String} props.measuresChartInterval Measure chart interval (weekly,biweekly or monthly)
 * @param {Function} props.setMeasuresChartInterval Set state function for measure chart interval
 * @param {Function} props.dispatch Redux store dispatch
 * @param {Boolean} props.editMode Determines if edit mode is enabled by user (from redux store)
 * @param {Object} props.handleSwitchGraphClick Handle event for switching graph
 */
const MeasuresGraphContainer = ({
  measureGoals,
  measuresChartData: { graphData, graphOptions },
  measuresChartInterval,
  setMeasuresChartInterval,
  dispatch,
  editMode,
  handleSwitchGraphClick
}) => {
  const match = useMediaQuery('(min-width:600px)');
  const [isEditing, setIsEditing] = useState(false);
  const [optionsShow, setOptionsShow] = useState(false);

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
      borderRadius: '0.3em',
      marginBottom: '1em'
    },
    mainContainer: {
      minWidth: 0,
      margin: '1em 0em'
    },
    optionsContainer: {
      display: 'flex',
      padding: '0.2em',
      border: `1px solid ${light}`,
      borderRadius: '0.2em',
      justifyContent: 'center',
      flexDirection: match ? 'row' : 'column'
    },
    addMeasureGoalContainer: {
      textAlign: 'center'
    },
    headerTitleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  const classes = useStyles();

  /**
   * Get the latest measure goal as a reference for adding a new
   * measure goal
   */
  const latestMeasureGoal =
    measureGoals?.length > 0
      ? measureGoals.reduce((currentEntry, nextEntry) => {
          return currentEntry.date > nextEntry.date ? currentEntry : nextEntry;
        })
      : [];

  const { targetDate, measuresAmount } = latestMeasureGoal;

  /**
   * Toggle Options handler
   * @param {Object} e - Event Input
   */
  const toggleOptions = e => {
    e.preventDefault();
    setOptionsShow(!optionsShow);
  };

  /**
   * Handle saving of measure goals by dispatching
   * an addResource action
   * @param {Object} data - Input Data for Added Measure
   */
  const addNewMeasureGoal = ({ targetDate, measuresAmount }) => {
    const data = {
      type: 'measureGoals',
      data: {
        targetDate,
        measuresAmount
      }
    };
    dispatch(addResource(data));
    setIsEditing(false);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <IconButton onClick={handleSwitchGraphClick}>
          <SkipPreviousIcon />
        </IconButton>
        <div className={classes.headerTitleContainer}>
          <Typography variant="h4">{`Measures (${measuresChartInterval})`}</Typography>
          <OptionsToggleButton onClick={toggleOptions} />
        </div>
        <IconButton onClick={handleSwitchGraphClick}>
          <SkipNextIcon />
        </IconButton>
      </div>
      {editMode && !isEditing && (
        <div className={classes.addMeasureGoalContainer}>
          <AddNewResourceButton buttonText="Add New Measure Goal" setIsEditing={setIsEditing} />
        </div>
      )}
      <div>
        {optionsShow && (
          <div className={classes.optionsContainer}>
            <IntervalSpanDialog
              setIntervalSpan={setMeasuresChartInterval}
              intervalSpan={measuresChartInterval}
            />
          </div>
        )}
        {isEditing && editMode ? (
          <InputMeasuresGoal
            handleSubmit={addNewMeasureGoal}
            measures={measuresAmount}
            date={targetDate}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Line data={graphData} options={graphOptions} />
        )}
      </div>
    </div>
  );
};

MeasuresGraphContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  measuresChartInterval: PropTypes.string.isRequired,
  setMeasuresChartInterval: PropTypes.func.isRequired,
  measuresChartData: PropTypes.objectOf(
    PropTypes.shape({
      graphData: PropTypes.arrayOf(PropTypes.any),
      graphOptions: PropTypes.objectOf(PropTypes.any)
    })
  ).isRequired,
  measureGoals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      measuresAmount: PropTypes.number.isRequired,
      targetDate: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    })
  ).isRequired,
  handleSwitchGraphClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(MeasuresGraphContainer);
