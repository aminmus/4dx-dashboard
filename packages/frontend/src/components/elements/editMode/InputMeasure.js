/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { connect } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';
import formatDate from '../../../utils/formatDate';

const InputMeasure = ({ setIsEditing, handleSave, clientId, id, success, description }) => {
  const [measureDescription, setMeasureDescription] = useState(description);
  const [selectedDate, setSelectedDate] = useState(success);

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
    // Can be create or update, depending on passed in function
    handleSave({
      id,
      type: 'measures',
      data: {
        description: measureDescription,
        success: selectedDate,
        clientId
      }
    });
  };

  return (
    <form className={classes.form}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          label="Measure description"
          value={measureDescription}
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
          label="Date of success"
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

InputMeasure.defaultProps = {
  id: null,
  clientId: null,
  description: null,
  success: null
};

InputMeasure.propTypes = {
  id: PropTypes.string,
  clientId: PropTypes.string,
  description: PropTypes.string,
  success: PropTypes.string,
  setIsEditing: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default connect(null, null)(InputMeasure);
