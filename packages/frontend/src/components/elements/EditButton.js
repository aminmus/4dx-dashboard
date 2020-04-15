import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

const EditButton = props => {
  const { onClick } = props;

  return (
    <IconButton onClick={onClick} aria-label="edit" style={{ marginLeft: '10px', padding: '5px' }}>
      <EditIcon fontSize="small" />
    </IconButton>
  );
};

EditButton.defaultProps = {};

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default EditButton;
