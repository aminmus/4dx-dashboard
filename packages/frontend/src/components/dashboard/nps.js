import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  EditButton,
  DeleteButton,
  NumberField,
  DateField,
  NumberInput,
  DateInput
} from 'react-admin';

export const NpsList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid isRowSelectable={() => false}>
      <NumberField source="current-nps" />
      <NumberField source="goal-nps" />
      <DateField source="date" />
      <DateField source="target-date" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const NpsEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" />
      <NumberInput source="goal-nps" />
      <DateInput source="date" />
      <DateInput source="target-date" />
    </SimpleForm>
  </Edit>
);

export const NpsCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" />
      <NumberInput source="goal-nps" />
      <DateInput source="date" />
      <DateInput source="target-date" />
    </SimpleForm>
  </Create>
);
