import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import COLORS from '../../style/COLORS';

const { danger } = COLORS;

/**
 * Edit Button component
 *
 * @component
 * @param {Object} props Component props
 * @param {Function} props.onClick On click event handler
 */
const EditButton = ({ onClick }) => {
  const useStyles = makeStyles({
    iconBtn: {
      marginLeft: '10px',
      padding: '5px',
      opacity: 0.5,
      '&:hover': {
        opacity: 1,
        backgroundColor: danger
      }
    }
  });

  const classes = useStyles();

  return (
    <IconButton onClick={onClick} aria-label="edit" className={classes.iconBtn}>
      <EditIcon fontSize="small" />
    </IconButton>
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default EditButton;
