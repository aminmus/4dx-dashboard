import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OptionsButton from './OptionsButton';

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

export default function IntervalSpanDialog(props) {
  const { setIntervalSpan, intervalSpan } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setIntervalSpan(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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

IntervalSpanDialog.defaultProps = {};

IntervalSpanDialog.propTypes = {
  setIntervalSpan: PropTypes.func.isRequired,
  intervalSpan: PropTypes.string.isRequired
};
