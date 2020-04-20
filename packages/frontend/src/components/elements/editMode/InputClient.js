/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import OptionsButton from '../OptionsButton';
import { updateResource } from '../../../slices/resources';

const InputClient = ({ id, name, setIsEditing, dispatch }) => {
  const [clientName, setClientName] = useState(name);
  const formStyle = {
    border: '2px dotted white',
    borderRadius: '10px',
    padding: '5px'
  };

  const handleSaveClick = e => {
    e.preventDefault();
    const data = {
      id,
      type: 'clients',
      data: {
        name: clientName
      }
    };
    dispatch(updateResource(data));
    setIsEditing(false);
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
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(InputClient);
