import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';
import { addResource } from '../../../slices/resources';

const AddNps = ({ setIsEditing, dispatch }) => {
  const [selectedTargetDate, setSelectedTargetDate] = useState(formatDate());
  const [selectedDate, setSelectedDate] = useState(formatDate());
  const [currentNps, setCurrentNps] = useState();
  const [goalNps, setGoalNps] = useState();

  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '10px',
    width: '100%'
  };

  const handleSaveClick = e => {
    e.preventDefault();
    const data = {
      type: 'nps',
      data: {
        currentNps,
        goalNps,
        date: selectedDate,
        targetDate: selectedTargetDate
      }
    };
    dispatch(addResource(data));
    setIsEditing(false);
  };

  return (
    <form style={formStyle}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          id="standard-number"
          label="Current"
          type="number"
          style={{ color: '#ffff' }}
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
          style={{ color: '#ffff' }}
          fullWidth
          variant="filled"
          margin="normal"
          onChange={input => setGoalNps(parseInt(input.target.value, 10))}
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
          onChange={date => setSelectedDate(formatDate(date))}
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
          onChange={date => setSelectedTargetDate(formatDate(date))}
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

AddNps.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(AddNps);
