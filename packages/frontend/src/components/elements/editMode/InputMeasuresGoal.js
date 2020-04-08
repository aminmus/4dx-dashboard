import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';

const InputMeasuresGoal = props => {
  const { setIsEditingMeasuresGoal, measures, date } = props;
  const [targetMeasures, setTargetMeasures] = useState(measures);
  const [selectedDate, setSelectedDate] = useState(date);

  const handleCancelClick = e => {
    e.preventDefault();
    setIsEditingMeasuresGoal(false);
  };

  const handleSaveClick = e => {
    e.preventDefault();
    setIsEditingMeasuresGoal(false);
  };

  const handleTargetMeasuresChange = input => {
    setTargetMeasures(parseInt(input.target.value, 10));
  };

  const handleDateChange = input => {
    setSelectedDate(moment(input).format('YYYY-MM-DD'));
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
          label="Target Measures"
          style={{ color: '#ffff', marign: '10px' }}
          placeholder={targetMeasures.toString(10)}
          default={targetMeasures.toString(10)}
          variant="filled"
          margin="normal"
          type="number"
          fullWidth
          onChange={handleTargetMeasuresChange}
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

InputMeasuresGoal.defaultProps = {
  measures: 0,
  date: null
};

InputMeasuresGoal.propTypes = {
  setIsEditingMeasuresGoal: PropTypes.func.isRequired,
  measures: PropTypes.number,
  date: PropTypes.string
};

export default InputMeasuresGoal;
