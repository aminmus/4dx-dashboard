/* eslint-disable no-console */
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import moment from 'moment';
import OptionsButton from '../OptionsButton';

const InputMeasure = props => {
  const { setIsEditingMeasure, measure } = props;
  const { description, success } = measure;
  const [selectedDate, setSelectedDate] = useState(success);

  const handleCancelClick = e => {
    e.preventDefault();
    console.log('CANCEL');
    setIsEditingMeasure(false);
  };

  const handleSaveClick = e => {
    e.preventDefault();
    console.log('SAVE');
    setIsEditingMeasure(false);
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
          placeholder={description}
          default={description}
          variant="filled"
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
        />
        <KeyboardDatePicker
          label="Date of successs"
          //   disableToolbar
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
  measure: {
    description: null,
    success: null
  }
};

InputMeasure.propTypes = {
  setIsEditingMeasure: PropTypes.func.isRequired,
  measure: PropTypes.shape({
    description: PropTypes.string,
    success: PropTypes.instanceOf(Date)
  })
};

export default InputMeasure;
