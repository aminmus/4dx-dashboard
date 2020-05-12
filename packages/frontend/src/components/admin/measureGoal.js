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
  NumberInput
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { DateInput } from './DateInput';
import DateField from './DateField';
import { validateGoalDate, validateRequired } from '../../utils/react-admin/adminValidation';
import COLORS from '../../style/COLORS';

const { dark } = COLORS;

const listStyles = {
  root: {
    backgroundColor: dark,
    justifyContent: 'center',
    borderRadius: '0.2em',
    textAlign: 'center'
  },
  head: {
    textAlign: 'center'
  },
  body: {
    textAlign: 'center'
  }
};

export const MeasureGoalList = withStyles(listStyles)(({ classes, ...props }) => (
  <List classes={classes} {...props} bulkActionButtons={false}>
    <Datagrid classes={classes} rowClick="edit" isRowSelectable={() => false}>
      <NumberField source="measures-amount" label="Measures (target amount)" />
      <DateField source="target-date" label="Target date" />
      <EditButton />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
));

export const MeasureGoalEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput
        source="measures-amount"
        label="Measures (target amount)"
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
        label="Measures (target amount)"
        validate={validateRequired}
      />
      <DateInput source="target-date" label="Target date" validate={validateGoalDate} />
    </SimpleForm>
  </Create>
);
