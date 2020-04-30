import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';
import { updateResource } from '../../../slices/resources';

const InputNps = ({ id, current, goal, targetDate, setIsEditing, dispatch }) => {
  const [selectedDate, setSelectedDate] = useState(targetDate);
  const [currentNps, setCurrentNps] = useState(current);
  const [goalNps, setGoalNps] = useState(goal);

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

  const handleSaveClick = e => {
    e.preventDefault();
    const data = {
      id,
      type: 'nps',
      data: {
        currentNps,
        goalNps,
        targetDate: selectedDate
      }
    };
    dispatch(updateResource(data));
    setIsEditing(false);
  };

  return (
    <form className={classes.form}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          id="standard-number"
          label="Current"
          type="number"
          value={currentNps.toString(10)}
          default={currentNps.toString(10)}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={input => setCurrentNps(parseInt(input.target.value, 10))}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="standard-number"
          label="Goal"
          type="number"
          value={goalNps.toString(10)}
          default={goalNps.toString(10)}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={input => setGoalNps(parseInt(input.target.value, 10))}
          InputLabelProps={{
            shrink: true
          }}
        />

        <KeyboardDatePicker
          label="Target Date"
          format="YYYY-MM-DD"
          fullWidth
          margin="normal"
          id="date-picker-inline"
          variant="filled"
          value={selectedDate}
          onChange={date => setSelectedDate(formatDate(date))}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
      <div className={classes.confirmContainer}>
        <OptionsButton text="Save" onClick={handleSaveClick} />
        <OptionsButton text="Cancel" onClick={() => setIsEditing(false)} />
      </div>
    </form>
  );
};

InputNps.defaultProps = {
  id: null,
  current: 0,
  goal: 0,
  targetDate: null
};

InputNps.propTypes = {
  id: PropTypes.string,
  current: PropTypes.number,
  goal: PropTypes.number,
  targetDate: PropTypes.string,
  setIsEditing: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(InputNps);
