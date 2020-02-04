// in src/users.js
import React from 'react';
import { List, Datagrid, TextField, NumberField } from 'react-admin';

export default function ClientList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField style={{ color: 'black' }} source="name" />
        <TextField style={{ color: 'black' }} source="progress" />
      </Datagrid>
    </List>
  );
}
