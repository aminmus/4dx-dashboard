import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, TextField, TextInput } from 'react-admin';

export const ClientList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField style={{ color: 'black' }} source="id" />
      <TextField style={{ color: 'black' }} source="name" />
      <TextField style={{ color: 'black' }} source="progress" />
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

// TODO: IMPLEMENT- CREATE CLIENT ROUTE
// export const ClientCreate = props => (
//   <Create title="Create client entry" {...props}>
//     <SimpleForm>
//       <TextInput style={{ color: 'black' }} source="name" />
//       <TextInput style={{ color: 'black' }} source="progress" />
//     </SimpleForm>
//   </Create>
// );
