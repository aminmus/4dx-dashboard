import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import OptionsButton from '../OptionsButton';

const InputClient = ({ id, name, setIsEditing, handleSave }) => {
  const [clientName, setClientName] = useState(name);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    form: {
      border: '2px dotted white',
      borderRadius: '10px',
      padding: '5px'
    },
    confirmContainer: {
      display: 'flex'
    }
  });

  const classes = useStyles();

  const handleSaveClick = e => {
    e.preventDefault();
    // Can be create or update, depending on passed in function
    handleSave({ id, type: 'clients', data: { name: clientName } });
  };

  return (
    <form className={classes.form}>
      <TextField
        label="Client Name"
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
      <div className={classes.confirmContainer}>
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
