import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';

const InputMeasure = props => {
  const { setIsEditingMeasure, description, success } = props;
  const [measureDescription, setMeasureDescription] = useState(description);
  const [selectedDate, setSelectedDate] = useState(success);

  const handleCancelClick = e => {
    e.preventDefault();
    setIsEditingMeasure(false);
  };

  const handleSaveClick = e => {
    e.preventDefault();
    setIsEditingMeasure(false);
  };

  const handleDescriptionChange = input => {
    setMeasureDescription(input.target.value);
  };

  const handleDateChange = date => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
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
          label="Measure description"
          style={{ color: '#ffff', marign: '10px' }}
          placeholder={measureDescription}
          default={measureDescription}
          variant="filled"
          margin="normal"
          fullWidth
          onChange={handleDescriptionChange}
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
