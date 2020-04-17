import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

const DeleteButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label="delete"
      style={{ marginLeft: '10px', padding: '5px' }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteButton;
