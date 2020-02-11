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

export const NpsList = props => (
  <List style={{ backgroundColor: 'black' }} {...props}>
    <Datagrid style={{ backgroundColor: 'gray' }}>
      <TextField style={{ color: 'white' }} source="id" />
      <TextField style={{ color: 'white' }} source="type" />
      <EditButton />
    </Datagrid>
  </List>
);

export const NpsEdit = props => (
  <Edit title="Edit NPS data" {...props}>
    <SimpleForm formClassName="text-warning">
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} disabled source="id" />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} source="type" />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="description"
      />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} multiline source="current" />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} multiline source="goal" />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="defineClients"
      />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="defineText"
      />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="implementText"
      />
    </SimpleForm>
  </Edit>
);

export const NpsCreate = props => (
  <Create title="Create NPS option entry" {...props}>
    <SimpleForm style={{ backgroundColor: 'grayrey' }}>
      <TextInput source="type" />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="description"
      />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} multiline source="current" />
      <TextInput style={{ backgroundColor: 'gray', color: 'white' }} multiline source="goal" />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="defineClients"
      />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="defineText"
      />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="defineText"
      />
      <TextInput
        style={{ backgroundColor: 'gray', color: 'white' }}
        multiline
        source="implementText"
      />
    </SimpleForm>
  </Create>
);
