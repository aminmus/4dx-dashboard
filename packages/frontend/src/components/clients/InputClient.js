import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { inputClientValidation } from '../../utils/inputValidation';
import CardContainer from '../elements/CardContainer';

/**
 * Client input component
 *
 * @component
 * @param {Object} props Component props
 * @param {String} props.id Unique identifier for Client resource (if used for editing)
 * @param {String} props.name Client name
 * @param {Function} props.setIsEditing Set whether or not user is editing a resource
 * @param {Object} props.handleResource Handling of form data from form
 */
const InputClient = ({ id, name, setIsEditing, handleResource }) => {
  const [clientName, setClientName] = useState(name);
  const [clientNameErrorText, setClientNameErrorText] = useState();
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    const { errors } = inputClientValidation(clientName);
    setClientNameErrorText(errors.clientName);
  }, [clientName]);

  useEffect(() => {
    if (clientNameErrorText) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  }, [clientNameErrorText]);

  const formData = {
    id,
    name: clientName
  };

  // eslint-disable-next-line no-shadow
  const handleSubmit = ({ id, name }) => {
    const data = {
      id,
      type: 'clients',
      data: {
        name
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
      <TextField
        label="Client Name"
        value={clientName || ''}
        default={clientName}
        fullWidth
        variant="filled"
        margin="normal"
        onChange={input => setClientName(input.target.value)}
        error={!!clientNameErrorText}
        helperText={clientNameErrorText}
        InputLabelProps={{
          shrink: true
        }}
        required
      />
    </CardContainer>
  );
};

InputClient.defaultProps = {
  id: null,
  name: null
};

InputClient.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  setIsEditing: PropTypes.func.isRequired,
  handleResource: PropTypes.func.isRequired
};

export default connect(null, null)(InputClient);
