import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import OptionsButton from '../OptionsButton';
import { inputClientValidation } from '../../../utils/inputValidation';

/**
 * Client input component
 *
 * @component
 * @param {Object} props Component props
 * @param {String} props.id Unique identifier for Client resource (if used for editing)
 * @param {String} props.name Client name
 * @param {Function} props.setIsEditing Set whether or not user is editing a resource
 * @param {Object} props.handleSave Handling of input submission
 *
 */
const InputClient = ({ id, name, setIsEditing, handleSave }) => {
  const [clientName, setClientName] = useState(name);
  const [clientNameErrorText, setClientNameErrorText] = useState();
  const [validationError, setValidationError] = useState(false);
  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    form: {
      border: '2px dotted white',
      borderRadius: '10px',
      padding: '5px'
    },
    confirmContainer: {
      display: 'flex'
    }
  });

  const classes = useStyles();

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

  const handleSaveClick = e => {
    e.preventDefault();
    // Can be create or update, depending on passed in function
    handleSave({ id, type: 'clients', data: { name: clientName } });
  };

  return (
    <form className={classes.form}>
      <TextField
        label="Client Name"
        value={clientName || ''}
        default={clientName}
        fullWidth
        variant="filled"
        margin="normal"
        onChange={input => setClientName(input.target.value)}
        error={validationError}
        helperText={clientNameErrorText}
        InputLabelProps={{
          shrink: true
        }}
      />
      <div className={classes.confirmContainer}>
        <OptionsButton disabled={validationError} text="Save" onClick={handleSaveClick} />
        <OptionsButton text="Cancel" onClick={() => setIsEditing(false)} />
      </div>
    </form>
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
  handleSave: PropTypes.func.isRequired
};

export default connect(null, null)(InputClient);
