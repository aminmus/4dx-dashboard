import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { connect } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { TextField } from '@material-ui/core';
import { inputMeasureValidation } from '../../utils/inputValidation';
import formatDate from '../../utils/formatDate';
import CardContainer from './CardContainer';

/**
 * Measure input component
 *
 * @component
 * @param {Object} props Component props
 * @param {string} props.id Unique identifier for NPS resource (if used for editing)
 * @param {string} props.clientId Unique identifier for NPS resource (if used for editing)
 * @param {string} props.success Date of measure completion
 * @param {string} props.description Measure description
 * @param {Function} props.setIsEditing Set whether or not user is editing a resource
 * @param {Object} props.handleResource Handling of form data from form
 */
const InputMeasure = ({ setIsEditing, handleResource, clientId, id, success, description }) => {
  const [measureDescription, setMeasureDescription] = useState(description);
  const [selectedDate, setSelectedDate] = useState(success);

  const [successErrorText, setSuccessErrorText] = useState();
  const [descriptionErrorText, setDescriptionErrorText] = useState();

  const [validationError, setValidationError] = useState(false);

  /**
   * Set input validation errors if present
   */
  useEffect(() => {
    const { errors } = inputMeasureValidation(selectedDate, measureDescription);
    setSuccessErrorText(errors.success);
    setDescriptionErrorText(errors.description);
  }, [selectedDate, measureDescription]);

  useEffect(() => {
    if (successErrorText || descriptionErrorText) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  }, [successErrorText, descriptionErrorText]);

  const formData = {
    id,
    clientId,
    description: measureDescription,
    success: selectedDate
  };

  // eslint-disable-next-line no-shadow
  const handleSubmit = ({ id, clientId, description, success }) => {
    const data = {
      id,
      type: 'measures',
      data: {
        description,
        success,
        clientId
      }
    };
    handleResource(data);
  };

  return (
    <CardContainer
      formData={formData}
      handleSubmit={handleSubmit}
      setIsEditing={setIsEditing}
      validationError={validationError}
    >
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TextField
          label="Measure description"
          value={measureDescription}
          default={measureDescription}
          variant="filled"
          margin="normal"
          fullWidth
          onChange={input => setMeasureDescription(input.target.value)}
          error={!!descriptionErrorText}
          helperText={descriptionErrorText}
          InputLabelProps={{
            shrink: true
          }}
          required
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
          error={!!successErrorText}
          helperText={successErrorText}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
    </CardContainer>
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
  handleResource: PropTypes.func.isRequired
};

export default connect(null, null)(InputMeasure);
