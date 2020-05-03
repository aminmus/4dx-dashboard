import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';
import { inputNpsValidation } from '../../../utils/inputValidation';

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
  const [currentNpsErrorText, setCurrentNpsErrorText] = useState();
  const [goalNpsErrorText, setGoalNpsErrorText] = useState();
  const [dateErrorText, setDateErrorText] = useState();
  const [targetDateErrorText, setTargetDateErrorText] = useState();
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
   * Set input validation errors if present
   */
  useEffect(() => {
    const { errors } = inputNpsValidation(currentNps, goalNps, selectedDate, selectedTargetDate);
    setCurrentNpsErrorText(errors.nps);
    setGoalNpsErrorText(errors.goalNps);
    setDateErrorText(errors.date);
    setTargetDateErrorText(errors.targetDate);
  }, [currentNps, goalNps, selectedDate, selectedTargetDate]);

  /**
   * Prevents user input if only one of the goal/target inputs are set
   */
  useEffect(() => {
    if (!selectedDate || !currentNps) {
      setValidationError(true);
    } else if (currentNpsErrorText || goalNpsErrorText || dateErrorText || targetDateErrorText) {
      setValidationError(true);
    } else if ((selectedTargetDate && !goalNps) || (!selectedTargetDate && goalNps)) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  }, [
    selectedDate,
    currentNps,
    currentNpsErrorText,
    goalNpsErrorText,
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
          error={currentNpsErrorText}
          helperText={currentNpsErrorText}
          InputLabelProps={{
            shrink: true
          }}
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
          error={goalNpsErrorText}
          helperText={goalNpsErrorText}
          InputLabelProps={{
            shrink: true
          }}
          required
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
          error={dateErrorText}
          helperText={dateErrorText}
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
          error={targetDateErrorText}
          helperText={targetDateErrorText}
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
