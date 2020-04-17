import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import COLORS from '../../../style/COLORS';

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

const DeleteDialog = ({ _id, type, content, isDeleting, setIsDeleting }) => {
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
        <p>Are you sure you want to delete?</p>
        <p style={{ fontWeight: 'bold' }}>{content}</p>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setIsDeleting(false)} color="primary">
          Cancel
        </Button>
        <ConfirmDelete onClick={() => setIsDeleting(false)}>Delete</ConfirmDelete>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  setIsDeleting: PropTypes.func.isRequired
};

export default DeleteDialog;
