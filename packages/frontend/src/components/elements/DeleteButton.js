import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import COLORS from '../../style/COLORS';

const { danger } = COLORS;

/**
 * Delete Button component
 *
 * @component
 * @param {Object} props Component props
 * @param {Function} props.onClick On click event handler
 */
const DeleteButton = ({ onClick }) => {
  const useStyles = makeStyles({
    iconBtn: {
      marginLeft: '0.2em',
      padding: '0.1em',
      opacity: 0.5,
      '&:hover': {
        opacity: 1,
        backgroundColor: danger
      }
    }
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
