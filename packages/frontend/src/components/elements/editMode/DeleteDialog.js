import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import COLORS from '../../../style/COLORS';

const DeleteDialog = ({ type, content, isDeleting, setIsDeleting, handleDelete }) => {
  /**
   * Component Styles
   */
  const ConfirmDelete = withStyles({
    label: {
      color: COLORS.light
    },
    root: {
      backgroundColor: COLORS.danger,
      margin: '10px',
      '&:hover': {
        backgroundColor: COLORS.dangerDark,
        boxShadow: 'none'
      }
    }
  })(Button);

  const useStyles = makeStyles({
    form: {
      border: '2px dotted white',
      borderRadius: '10px',
      padding: '10px',
      width: '100%'
    },
    confirmContainer: {
      display: 'flex'
    },
    itemName: {
      fontWeight: 'bold',
      color: COLORS.danger
    }
  });

  const classes = useStyles();

  const handleConfirmDelete = e => {
    e.preventDefault();
    handleDelete();
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-delete-dialog"
      open={isDeleting}
    >
      <DialogTitle id="confirmation-delete-title">{`Delete ${type}`}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">Are you sure you want to delete?</Typography>
        <Typography variant="body1" className={classes.itemName}>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setIsDeleting(false)} color="primary">
          Cancel
        </Button>
        <ConfirmDelete onClick={handleConfirmDelete}>Delete</ConfirmDelete>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  setIsDeleting: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default connect(null, null)(DeleteDialog);
