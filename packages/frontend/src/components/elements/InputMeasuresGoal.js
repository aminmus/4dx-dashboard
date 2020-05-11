import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from './OptionsButton';
import formatDate from '../../utils/formatDate';
import { inputMeasuresGoalValidation } from '../../utils/inputValidation';

/**
 * Measures Goal input component
 *
 * @component
 * @param {Object} props Component props
 * @param {String} props.id Unique identifier for Measures Goal resource (if used for editing)
 * @param {Number} props.measures Current Nps
 * @param {String} props.date Goal Nps
 * @param {Function} props.handleSaveMeasureGoal Set whether or not user is editing a resource
 * @param {Boolean} props.setIsEditing Set whether or not user is editing a resource
 */
const InputMeasuresGoal = ({ handleSaveMeasureGoal, setIsEditing, measures, date, id }) => {
  const [targetMeasures, setTargetMeasures] = useState(measures);
  const [selectedDate, setSelectedDate] = useState(date);

  const [targetMeasuresErrorText, setTargetMeasuresErrorText] = useState();
  const [targetDateErrorText, setTargetDateErrorText] = useState();

  const [validationError, setValidationError] = useState(false);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    form: {
      border: '2px dotted white',
      borderRadius: '0.2em',
      padding: '0.2em',
      width: '100%'
    },
    confirmContainer: {
      display: 'flex'
    }
  });

  const classes = useStyles();

  const handleSaveClick = e => {
    e.preventDefault();
    // Can be create or update, depending on passed in function
    handleSaveMeasureGoal({
      id,
      type: 'measureGoals',
      data: {
        targetDate: selectedDate,
        measuresAmount: targetMeasures
      }
    });
  };

  useEffect(() => {
    const { errors } = inputMeasuresGoalValidation(targetMeasures, selectedDate);
    setTargetMeasuresErrorText(errors.targetMeasures);
    setTargetDateErrorText(errors.targetDate);
  }, [targetMeasures, selectedDate]);

  /**
   * Prevents user input if only one of the goal/target inputs are set
   */
  useEffect(() => {
    if (targetDateErrorText || targetMeasuresErrorText) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  }, [targetDateErrorText, targetMeasuresErrorText]);

  return (
    <form className={classes.form}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          label="Target Measures"
          variant="filled"
          margin="normal"
          type="number"
          fullWidth
          value={targetMeasures}
          default={targetMeasures}
          onChange={input => setTargetMeasures(parseInt(input.target.value, 10))}
          error={!!targetMeasuresErrorText}
          helperText={targetMeasuresErrorText}
          InputLabelProps={{
            shrink: true
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
          value={selectedDate}
          onChange={inputDate => setSelectedDate(formatDate(inputDate))}
          error={!!targetDateErrorText}
          helperText={targetDateErrorText}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          required
        />
      </MuiPickersUtilsProvider>

      <div className={classes.confirmContainer}>
        <OptionsButton disabled={validationError} text="Save" onClick={handleSaveClick} />
        <OptionsButton text="Cancel" onClick={() => setIsEditing(false)} />
      </div>
    </form>
  );
};

InputMeasuresGoal.defaultProps = {
  id: null,
  measures: 0,
  date: null
};

InputMeasuresGoal.propTypes = {
  id: PropTypes.string,
  handleSaveMeasureGoal: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  measures: PropTypes.number,
  date: PropTypes.string
};

export default InputMeasuresGoal;
