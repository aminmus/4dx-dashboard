import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';
import { validateNps, validateDate } from '../../../utils/inputValidation';
import {
  SET_DATE,
  SET_TARGET_DATE,
  SET_TARGET_NPS,
  SET_NPS,
  MISSING_FIELDS
} from '../../../actions/types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATE: {
      const { error: dateError, errorMessage: dateErrorMessage } = validateDate(action.payload);
      return {
        ...state,
        selectedDate: action.payload,
        dateErrorText: dateError ? dateErrorMessage : null,
        validationError: dateError
      };
    }
    case SET_TARGET_DATE: {
      const { error: targetDateError, errorMessage: targetDateErrorMessage } = validateDate(
        action.payload
      );
      return {
        ...state,
        selectedTargetDate: action.payload,
        targetDateErrorText: targetDateError ? targetDateErrorMessage : null,
        validationError: targetDateError
      };
    }
    case SET_TARGET_NPS: {
      const npsValidation = validateNps(action.payload);
      return {
        ...state,
        goalNps: action.payload,
        goalNpsErrorText: npsValidation.error ? npsValidation.errorMessage : null,
        validationError: npsValidation.error
      };
    }
    case SET_NPS: {
      const targetNpsValidation = validateNps(action.payload);
      return {
        ...state,
        currentNps: action.payload,
        currentNpsErrorText: targetNpsValidation.error ? targetNpsValidation.errorMessage : null,
        validationError: targetNpsValidation.error
      };
    }
    case MISSING_FIELDS:
      return {
        ...state,
        validationError: true
      };
    default:
      return state;
  }
};

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
  const initialState = {
    selectedDate: formatDate(),
    selectedTargetDate: targetDate,
    currentNps: current,
    goalNps: goal,
    currentNpsErrorText: null,
    goalNpsErrorText: null,
    dateErrorText: null,
    targetDateErrorText: null,
    validationError: false
  };
  const [
    {
      selectedDate,
      selectedTargetDate,
      currentNps,
      goalNps,
      currentNpsErrorText,
      goalNpsErrorText,
      dateErrorText,
      targetDateErrorText,
      validationError
    },
    dispatch
  ] = useReducer(reducer, initialState);

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

  useEffect(() => {
    if (!selectedDate || !currentNps) {
      dispatch({ type: MISSING_FIELDS });
    } else if ((selectedTargetDate && !goalNps) || (!selectedTargetDate && goalNps)) {
      dispatch({ type: MISSING_FIELDS });
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
          onChange={input => dispatch({ type: SET_NPS, payload: input.target.value })}
          error={!!currentNpsErrorText}
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
          onChange={input => dispatch({ type: SET_TARGET_NPS, payload: input.target.value })}
          error={!!goalNpsErrorText}
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
          onChange={(date, value) => dispatch({ type: SET_DATE, payload: date || value })}
          error={!!dateErrorText}
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
          onChange={(date, value) => dispatch({ type: SET_TARGET_DATE, payload: date || value })}
          error={!!targetDateErrorText}
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
