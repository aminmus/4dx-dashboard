import React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

const UserList = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default UserList;
