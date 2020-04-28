import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';

const InputMeasuresGoal = props => {
  const { setIsEditing, measures, date } = props;
  const [targetMeasures, setTargetMeasures] = useState(measures);
  const [selectedDate, setSelectedDate] = useState(date);

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
          value={targetMeasures.toString(10)}
          default={targetMeasures.toString(10)}
          variant="filled"
          margin="normal"
          type="number"
          fullWidth
          onChange={input => setTargetMeasures(parseInt(input.target.value, 10))}
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
          onChange={inputDate => setSelectedDate(formatDate(inputDate))}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>

      <div style={{ display: 'flex' }}>
        <OptionsButton text="Save" onClick={() => setIsEditing(false)} />
        <OptionsButton text="Cancel" onClick={() => setIsEditing(false)} />
      </div>
    </form>
  );
};

InputMeasuresGoal.defaultProps = {
  measures: 0,
  date: null
};

InputMeasuresGoal.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  measures: PropTypes.number,
  date: PropTypes.string
};

export default InputMeasuresGoal;
