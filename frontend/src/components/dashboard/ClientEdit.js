import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export default function ClientList(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput source="name" />
        <TextInput multiline source="progress" />
      </SimpleForm>
    </Edit>
  );
}
