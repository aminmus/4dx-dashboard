/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';

const InputClientTitle = props => {
  const { clientName, setIsEditingTitle } = props;

  const handleCancelClick = e => {
    e.preventDefault();
    console.log('CANCEL');
    setIsEditingTitle(false);
  };

  const handleSaveClick = e => {
    e.preventDefault();
    console.log('SAVE');
    setIsEditingTitle(false);
  };

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
        InputLabelProps={{
          shrink: true
        }}
      />
      <div style={{ display: 'flex' }}>
        <OptionsButton text="Save" onClick={handleSaveClick} />
        <OptionsButton text="Cancel" onClick={handleCancelClick} />
      </div>
    </form>
  );
};

InputClientTitle.defaultProps = {
  clientName: ''
};

InputClientTitle.propTypes = {
  clientName: PropTypes.string,
  setIsEditingTitle: PropTypes.func.isRequired
};

export default InputClientTitle;
