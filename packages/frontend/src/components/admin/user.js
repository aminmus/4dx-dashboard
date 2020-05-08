import React from 'react';
import { List, Datagrid, TextField, DeleteButton } from 'react-admin';
import DateField from './DateField';

const UserList = props => (
  // Disabling bulk actions as jsonapi data provider does not work with delete_many request of react-admin
  // eslint-disable-next-line react/jsx-props-no-spreading
  <List {...props} bulkActionButtons={false}>
    <Datagrid isRowSelectable={() => false}>
      <TextField source="id" />
      <TextField source="email" />
      <DateField source="created-at" label="Created at" />
      <DateField source="updated-at" label="Updated at" />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
);

export default UserList;
