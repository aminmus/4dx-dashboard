/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import OptionsButton from '../OptionsButton';

const InputClientTitle = props => {
  const { clientName } = props;

  const handleCancelClick = e => {
    e.preventDefault();
    console.log('CANCEL');
  };

  const handleSaveClick = e => {
    e.preventDefault();
    console.log('SAVE');
  };

  return (
    <form style={{ border: '1px dotted white', padding: '5px' }}>
      <TextField
        label="Label"
        style={{ margin: 8, color: '#ffff' }}
        value={clientName}
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
  clientName: PropTypes.string
};

export default InputClientTitle;
