import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button
} from '@material-ui/core';

export default function DemoAlert() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('isDemoAlertSeen', true);
  };
  useEffect(() => {
    if (localStorage.getItem('isDemoAlertSeen')) setOpen(false);
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>This is a demo site</DialogTitle>
      <DialogContent>
        <DialogContentText>
          All data, statistics and clients on this site is fake sample data for the purpose of
          showcasing this application. The data on this site is NOT representative of Vaimo or their
          actual data.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          I understand
        </Button>
      </DialogActions>
    </Dialog>
  );
}
