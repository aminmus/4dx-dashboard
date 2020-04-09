import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';

const InputWig = props => {
  const { current, goal, targetDate, setIsEditingWig } = props;
  const [selectedDate, setSelectedDate] = useState(targetDate);
  const [currentNps, setCurrentNps] = useState(current);
  const [goalNps, setGoalNps] = useState(goal);

  const handleCancelClick = e => {
    e.preventDefault();
    setIsEditingWig(false);
  };

  const handleSaveClick = e => {
    e.preventDefault();
    setIsEditingWig(false);
  };

  const handleCurrentNpsChange = input => {
    setCurrentNps(parseInt(input.target.value, 10));
  };
  const handleGoalNpsChange = input => {
    setGoalNps(parseInt(input.target.value, 10));
  };

  const handleDateChange = date => {
    setSelectedDate(formatDate(date));
  };

  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '10px',
    width: '100%'
  };

  return (
    <form style={formStyle}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          id="standard-number"
          label="Current"
          type="number"
          style={{ color: '#ffff' }}
          placeholder={currentNps.toString(10)}
          default={currentNps.toString(10)}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={handleCurrentNpsChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="standard-number"
          label="Goal"
          type="number"
          style={{ color: '#ffff' }}
          placeholder={goalNps.toString(10)}
          default={goalNps.toString(10)}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={handleGoalNpsChange}
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
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
      <div style={{ display: 'flex' }}>
        <OptionsButton text="Save" onClick={handleSaveClick} />
        <OptionsButton text="Cancel" onClick={handleCancelClick} />
      </div>
    </form>
  );
};

InputWig.defaultProps = {
  current: 0,
  goal: 0,
  targetDate: null
};

InputWig.propTypes = {
  current: PropTypes.number,
  goal: PropTypes.number,
  targetDate: PropTypes.string,
  setIsEditingWig: PropTypes.func.isRequired
};

export default InputWig;
