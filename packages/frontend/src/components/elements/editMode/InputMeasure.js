import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';

const InputMeasure = props => {
  const { setIsEditingMeasure, description, success } = props;
  const [measureDescription, setMeasureDescription] = useState(description);
  const [selectedDate, setSelectedDate] = useState(success);

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
          label="Measure description"
          style={{ color: '#ffff', marign: '10px' }}
          placeholder={measureDescription}
          default={measureDescription}
          variant="filled"
          margin="normal"
          fullWidth
          onChange={input => setMeasureDescription(input.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        <KeyboardDatePicker
          label="Date of successs"
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

      <div style={{ display: 'flex' }}>
        <OptionsButton text="Save" onClick={() => setIsEditingMeasure(false)} />
        <OptionsButton text="Cancel" onClick={() => setIsEditingMeasure(false)} />
      </div>
    </form>
  );
};

InputMeasure.defaultProps = {
  description: null,
  success: null
};

InputMeasure.propTypes = {
  setIsEditingMeasure: PropTypes.func.isRequired,

  description: PropTypes.string,
  success: PropTypes.string
};

export default InputMeasure;
