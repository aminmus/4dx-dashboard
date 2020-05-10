import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import COLORS from '../../style/COLORS';

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
        <p>Are you sure you want to delete?</p>
        <p className={classes.itemName}>{content}</p>
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
