import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';

const InputMeasuresGoal = ({ handleSaveMeasureGoal, setIsEditing, measures, date, id }) => {
  const [targetMeasures, setTargetMeasures] = useState(measures);
  const [selectedDate, setSelectedDate] = useState(date);

  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '10px',
    width: '100%'
  };

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
        <OptionsButton text="Save" onClick={handleSaveClick} />
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
