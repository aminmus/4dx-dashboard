import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import COLORS from '../../../style/COLORS';
import { deleteResource } from '../../../slices/resources';

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

const DeleteDialog = ({ id, type, content, isDeleting, setIsDeleting, dispatch }) => {
  const handleConfirmDelete = e => {
    console.log(id);
    e.preventDefault();
    const data = {
      id,
      type
    };
    dispatch(deleteResource(data));
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
        <p>Are you sure you want to delete?</p>
        <p style={{ fontWeight: 'bold' }}>{content}</p>
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
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  setIsDeleting: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(DeleteDialog);
