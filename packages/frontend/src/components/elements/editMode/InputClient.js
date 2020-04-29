import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import OptionsButton from '../OptionsButton';

const InputClient = ({ id, name, setIsEditing, handleSave }) => {
  const [clientName, setClientName] = useState(name);
  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '5px'
  };

  const handleSaveClick = e => {
    e.preventDefault();

    // Can be create or update, depending on passed in function
    handleSave({ id, type: 'clients', data: { name: clientName } });
  };

  return (
    <form style={formStyle}>
      <TextField
        label="Client Name"
        style={{ color: '#ffff' }}
        value={clientName}
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
        <OptionsButton text="Save" onClick={handleSaveClick} />
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
