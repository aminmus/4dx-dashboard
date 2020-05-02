import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  FormControl,
  Select
} from '@material-ui/core';
import OptionsButton from './OptionsButton';

export default function IntervalSpanDialog({ setIntervalSpan, intervalSpan }) {
  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  }));

  const classes = useStyles();

  const handleChange = e => {
    e.preventDefault();
    setIntervalSpan(e.target.value);
  };

  const handleClickOpen = e => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = e => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div>
      <OptionsButton text="Set Interval" onClick={handleClickOpen} />
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Set Interval Span</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="interval-dialog">Interval</InputLabel>
              <Select
                native
                value={intervalSpan}
                onChange={handleChange}
                input={<Input id="interval-dialog" />}
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <OptionsButton text="ok" onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

IntervalSpanDialog.propTypes = {
  setIntervalSpan: PropTypes.func.isRequired,
  intervalSpan: PropTypes.string.isRequired
};
