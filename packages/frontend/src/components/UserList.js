import React from 'react';
import { List, Datagrid, TextField, DateField, DeleteButton } from 'react-admin';

const UserList = props => (
  // Disabling bulk actions as jsonapi data provider does not work with delete_many request of react-admin
  // eslint-disable-next-line react/jsx-props-no-spreading
  <List {...props} bulkActionButtons={false}>
    <Datagrid isRowSelectable={() => false}>
      <DeleteButton undoable={false} />
      <TextField source="id" />
      <TextField source="email" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default UserList;
