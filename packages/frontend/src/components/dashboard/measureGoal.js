/* eslint-disable react/jsx-props-no-spreading */
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
import { validateGoalDate, validateRequired } from '../utils/adminValidation';

export const MeasureGoalList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit" isRowSelectable={() => false}>
      <NumberField source="measures-amount" label="Measures goal amount" />
      <DateField source="target-date" label="Target date" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const MeasureGoalEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput
        source="measures-amount"
        label="Measures goal amount"
        validate={validateRequired}
      />
      <DateInput source="target-date" label="Target date" validate={validateGoalDate} />
    </SimpleForm>
  </Edit>
);

export const MeasureGoalCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput
        source="measures-amount"
        label="Measures goal amount"
        validate={validateRequired}
      />
      <DateInput source="target-date" label="Target date" validate={validateGoalDate} />
    </SimpleForm>
  </Create>
);
