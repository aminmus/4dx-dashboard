import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';
import { validateNps, validateDate } from '../../../utils/inputValidation';

/**
 * Nps input component
 *
 * @component
 * @param {Object} props Component props
 * @param {String} props.id Unique identifier for NPS resource (if used for editing)
 * @param {Number} props.current Current Nps
 * @param {Number} props.goal Goal Nps
 * @param {String} props.targetDate Target date for Nps goal
 * @param {Function} props.setIsAddingOrEditing Set whether or not user is editing a resource
 * @param {Object} props.handleSubmit Handling of input submission
 *
 */
const InputNps = ({ id, current, goal, targetDate, setIsAddingOrEditing, handleSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(formatDate());
  const [selectedTargetDate, setSelectedTargetDate] = useState(targetDate);
  const [currentNps, setCurrentNps] = useState(current);
  const [goalNps, setGoalNps] = useState(goal);
  const [currentNpsErrorHelper, setCurrentNpsErrorHelper] = useState();
  const [goalNpsErrorHelper, setGoalNpsErrorHelper] = useState();
  const [dateErrorHelper, setDateErrorHelper] = useState();
  const [targetDateErrorHelper, setTargetDateErrorHelper] = useState();
  const [validationError, setValidationError] = useState(false);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    form: {
      border: '2px dotted white',
      borderRadius: '10px',
      padding: '10px',
      width: '100%'
    },
    confirmContainer: {
      display: 'flex'
    }
  });

  const classes = useStyles();

  const formInput = {
    currentNps,
    goalNps,
    date: selectedDate,
    targetDate: selectedTargetDate
  };
  /**
   * Input Validation
   */
  useEffect(() => {
    const { error, errorMessage } = validateNps(currentNps);
    if (error) {
      setCurrentNpsErrorHelper(errorMessage);
    } else {
      setCurrentNpsErrorHelper(null);
    }
  }, [currentNps]);

  useEffect(() => {
    const { error, errorMessage } = validateNps(goalNps);
    if (error) {
      setGoalNpsErrorHelper(errorMessage);
    } else {
      setGoalNpsErrorHelper(null);
    }
  }, [goalNps]);

  useEffect(() => {
    const { error, errorMessage } = validateDate(selectedDate);
    if (error) {
      setDateErrorHelper(errorMessage);
    } else {
      setDateErrorHelper(null);
    }
  }, [selectedDate]);

  useEffect(() => {
    const { error, errorMessage } = validateDate(selectedTargetDate);
    if (error) {
      setTargetDateErrorHelper(errorMessage);
    } else {
      setTargetDateErrorHelper(null);
    }
  }, [selectedTargetDate]);

  useEffect(() => {
    if (!selectedDate || !currentNps) {
      setValidationError(true);
    } else if (
      currentNpsErrorHelper ||
      goalNpsErrorHelper ||
      dateErrorHelper ||
      targetDateErrorHelper
    ) {
      setValidationError(true);
    } else if ((selectedTargetDate && !goalNps) || (!selectedTargetDate && goalNps)) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  }, [
    selectedDate,
    currentNps,
    currentNpsErrorHelper,
    goalNpsErrorHelper,
    goalNps,
    selectedTargetDate
  ]);

  return (
    <form className={classes.form} onSubmit={e => handleSubmit(id, formInput, e)}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          id="standard-number"
          label="Current"
          type="number"
          value={currentNps}
          default={currentNps}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={input => setCurrentNps(input.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          error={!!currentNpsErrorHelper}
          helperText={currentNpsErrorHelper}
          required
        />
        <TextField
          id="standard-number"
          label="Goal"
          type="number"
          value={goalNps}
          default={goalNps}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={input => setGoalNps(input.target.value)}
          error={!!goalNpsErrorHelper}
          helperText={goalNpsErrorHelper}
          InputLabelProps={{
            shrink: true
          }}
        />

        <KeyboardDatePicker
          label="Date"
          format="YYYY-MM-DD"
          fullWidth
          margin="normal"
          id="date-picker-inline"
          variant="filled"
          value={selectedDate}
          onChange={(date, value) => setSelectedDate(formatDate(date, value))}
          error={!!dateErrorHelper}
          helperText={dateErrorHelper}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          required
        />
        <KeyboardDatePicker
          label="Target Date"
          format="YYYY-MM-DD"
          fullWidth
          margin="normal"
          id="date-picker-inline"
          variant="filled"
          value={selectedTargetDate}
          onChange={(date, value) => setSelectedTargetDate(formatDate(date || value))}
          error={!!targetDateErrorHelper}
          helperText={targetDateErrorHelper}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>

      <div className={classes.confirmContainer}>
        <OptionsButton disabled={validationError} type="submit" text="Save" />
        <OptionsButton type="reset" text="Cancel" onClick={() => setIsAddingOrEditing(false)} />
      </div>
    </form>
  );
};

InputNps.defaultProps = {
  id: null,
  current: '',
  goal: '',
  targetDate: null
};

InputNps.propTypes = {
  id: PropTypes.string,
  current: PropTypes.number,
  goal: PropTypes.number,
  targetDate: PropTypes.string,
  setIsAddingOrEditing: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default connect(null, null)(InputNps);
