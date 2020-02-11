import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  DeleteButton
} from 'react-admin';

export const ClientList = props => (
  <List style={{ backgroundColor: 'black' }} {...props}>
    <Datagrid style={{ backgroundColor: 'gray' }}>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="progress" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ClientEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm>
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} disabled source="id" />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} source="name" />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} source="progress" />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm style={{ backgroundColor: 'darkgrey' }}>
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} source="name" />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} source="progress" />
    </SimpleForm>
  </Create>
);
