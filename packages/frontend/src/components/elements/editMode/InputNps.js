import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';

const InputNps = ({ id, current, goal, targetDate, setIsAddingOrEditing, handleSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(formatDate());
  const [selectedTargetDate, setSelectedTargetDate] = useState(targetDate);
  const [currentNps, setCurrentNps] = useState(current);
  const [goalNps, setGoalNps] = useState(goal);

  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '10px',
    width: '100%'
  };

  const formInput = {
    currentNps,
    goalNps,
    date: selectedDate,
    targetDate: selectedTargetDate
  };

  return (
    <form style={formStyle} onSubmit={e => handleSubmit(id, formInput, e)}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          id="standard-number"
          label="Current"
          type="number"
          style={{ color: '#ffff' }}
          value={currentNps}
          default={currentNps}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={input => setCurrentNps(input.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="standard-number"
          label="Goal"
          type="number"
          style={{ color: '#ffff' }}
          value={goalNps}
          default={goalNps}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={input => setGoalNps(input.target.value)}
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
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
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
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
      <div style={{ display: 'flex' }}>
        <OptionsButton type="submit" text="Save" />
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
