import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  TextInput,
  EditButton
} from 'react-admin';

export const ClientList = props => (
  <List style={{ backgroundColor: 'black' }} {...props}>
    <Datagrid style={{ backgroundColor: 'darkgrey' }} rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="progress" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ClientEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm>
      <TextInput style={{ color: 'black' }} disabled source="id" />
      <TextInput style={{ color: 'black' }} source="name" />
      <TextInput style={{ color: 'black' }} source="progress" />
    </SimpleForm>
  </Edit>
);

//TODO: IMPLEMENT- CREATE CLIENT ROUTE
export const ClientCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm style={{ backgroundColor: 'darkgrey' }} >
      <TextInput style={{ color: 'black' }} source="name" />
      <TextInput style={{ color: 'black' }} source="progress" />
    </SimpleForm>
  </Create>
);
