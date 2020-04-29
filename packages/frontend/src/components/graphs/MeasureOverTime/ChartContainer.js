import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import OptionsToggleButton from '../../elements/OptionsToggleButton';
import IntervalSpanDialog from '../../elements/IntervalSpanDialog';
import InputMeasuresGoal from '../../elements/editMode/InputMeasuresGoal';
import COLORS from '../../../style/COLORS';
import { addResource } from '../../../slices/resources';

const { primary, light } = COLORS;

const ChartContainer = ({
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
  const ChartHeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: primary
  };

  const ContainerStyle = {
    margin: '10px'
  };

  const OptionsContainerStyle = {
    display: 'flex',
    margin: '10px',
    border: `1px solid ${light}`,
    borderRadius: '10px',
    justifyContent: 'center',
    flexDirection: match ? 'row' : 'column'
  };

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
    <div style={ContainerStyle}>
      <div style={ChartHeaderStyle}>
        <div className="chart-title">{`Measures ${measuresChartInterval}`}</div>
        <OptionsToggleButton onClick={toggleOptions} />
      </div>
      {editMode && (
        <Button onClick={() => setIsEditing(true)} className="px-0 mx-auto">
          <AddCircleIcon className="mr-2 text-warning" />
          Add New Measure Goal
        </Button>
      )}
      <div>
        {optionsShow && (
          <div style={OptionsContainerStyle}>
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

ChartContainer.propTypes = {
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

export default connect(mapStateToProps, null)(ChartContainer);
