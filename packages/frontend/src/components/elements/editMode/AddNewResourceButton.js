import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import COLORS from '../../../style/COLORS';

const { primary, lightGray } = COLORS;

/**
 *  Button for adding new resouce
 *
 * @param {Object} props Component props
 * @param {String} props.buttonText Button text
 * @param {Boolean} props.setIsEditing Is user editing resource
 */
const AddNewResourceButton = ({ buttonText, setIsEditing }) => {
  const useStyles = makeStyles({
    button: {
      padding: '0',
      margin: '10px 0',
      opacity: 0.5,
      '&:hover': {
        backgroundColor: lightGray,
        opacity: 1
      }
    },
    icon: {
      padding: '0',
      marginRight: '5px',
      color: primary
    }
  });

  const classes = useStyles();

  return (
    <Button onClick={() => setIsEditing(true)} className={classes.button}>
      <AddCircleIcon className={classes.icon} />
      <Typography variant="body1">{buttonText}</Typography>
    </Button>
  );
};

AddNewResourceButton.defaultProps = {
  buttonText: ''
};

AddNewResourceButton.propTypes = {
  buttonText: PropTypes.string,
  setIsEditing: PropTypes.func.isRequired
};

export default AddNewResourceButton;
