import React from 'react';
import { List, Datagrid, TextField, DeleteButton } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import DateField from './DateField';

import COLORS from '../../style/COLORS';

const { dark } = COLORS;

const listStyles = {
  root: {
    backgroundColor: dark,
    justifyContent: 'center',
    borderRadius: '0.2em',
    textAlign: 'center'
  }
};

const UserList = withStyles(listStyles)(({ classes, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <List classes={classes} {...props} bulkActionButtons={false}>
    <Datagrid classes={classes} isRowSelectable={() => false}>
      <TextField source="id" />
      <TextField source="email" />
      <DateField source="created-at" label="Created at" />
      <DateField source="updated-at" label="Updated at" />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
));

export default UserList;
