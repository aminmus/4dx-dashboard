import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import OptionsToggleButton from './elements/OptionsToggleButton';
import IntervalSpanDialog from './elements/IntervalSpanDialog';
import InputMeasuresGoal from './elements/editMode/InputMeasuresGoal';
import COLORS from '../style/COLORS';
import { addResource } from '../slices/resources';

const { primary, light, lightGray } = COLORS;

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
 */
const MeasuresOverTimeContainer = ({
  measureGoals,
  measuresChartData: { graphData, graphOptions },
  measuresChartInterval,
  setMeasuresChartInterval,
  dispatch,
  editMode
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
    },
    addMeasuresGoalBtn: {
      padding: '0',
      margin: 'auto',
      opacity: 0.5,
      '&:hover': {
        backgroundColor: lightGray,
        opacity: 1
      }
    },
    addMeasuresGoalIcon: {
      padding: '0',
      marginRight: '5px',
      color: primary
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
  const handleSaveMeasureGoal = data => {
    dispatch(addResource(data));
    setIsEditing(false);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <div className="chart-title">{`Measures ${measuresChartInterval}`}</div>
        <OptionsToggleButton onClick={toggleOptions} />
      </div>
      {editMode && !isEditing && (
        <Button onClick={() => setIsEditing(true)} className={classes.addMeasuresGoalBtn}>
          <AddCircleIcon className={classes.addMeasuresGoalIcon} />
          Add New Measure Goal
        </Button>
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
            handleSaveMeasureGoal={handleSaveMeasureGoal}
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

MeasuresOverTimeContainer.propTypes = {
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
  ).isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(MeasuresOverTimeContainer);
