import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

const DeleteButton = ({ onClick }) => {
  const useStyles = makeStyles({
    iconBtn: { marginLeft: '10px', padding: '5px' }
  });

  const classes = useStyles();

  return (
    <IconButton onClick={onClick} aria-label="delete" className={classes.iconBtn}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteButton;
