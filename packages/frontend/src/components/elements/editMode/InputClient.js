/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';

const InputClient = ({ id, name, setIsEditing }) => {
  const [clientName, setClientName] = useState(name);
  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '5px'
  };

  return (
    <form style={formStyle}>
      <TextField
        label="Client Name"
        style={{ color: '#ffff' }}
        placeholder={clientName}
        default={clientName}
        fullWidth
        variant="filled"
        margin="normal"
        onChange={input => setClientName(input.target.value)}
        InputLabelProps={{
          shrink: true
        }}
      />
      <div style={{ display: 'flex' }}>
        <OptionsButton text="Save" onClick={() => setIsEditing(false)} />
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
  setIsEditing: PropTypes.func.isRequired
};

export default InputClient;
