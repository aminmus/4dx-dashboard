/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';

const InputClient = ({ id, name, setIsEditingTitle }) => {
  const [clientName, setClientName] = useState(name);
  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '5px'
  };

  return (
    <form style={formStyle}>
      <TextField
        label="Label"
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
        <OptionsButton text="Save" onClick={() => setIsEditingTitle(false)} />
        <OptionsButton text="Cancel" onClick={() => setIsEditingTitle(false)} />
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
  setIsEditingTitle: PropTypes.func.isRequired
};

export default InputClient;
