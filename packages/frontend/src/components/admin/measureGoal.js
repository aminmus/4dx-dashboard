/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  List,
  SimpleList,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  EditButton,
  DeleteButton,
  NumberField,
  NumberInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import DateInput from './DateInput';
import DateField from './DateField';
import { validateGoalDate, validateRequired } from '../../utils/react-admin/adminValidation';
import COLORS from '../../style/COLORS';
import formatDate from '../../utils/formatDate';

const { dark } = COLORS;

const useStyles = makeStyles({
  root: {
    backgroundColor: dark,
    border: '1px solid black',
    justifyContent: 'center',
    borderRadius: '0.2em',
    textAlign: 'center'
  }
});

export const MeasureGoalList = props => {
  const classes = useStyles();
  const isSmall = useMediaQuery('(max-width:600px)');
  return (
    <List classes={classes} {...props} bulkActionButtons={false}>
      {isSmall ? (
        <SimpleList
          primaryText={record => `Target: ${record['measures-amount']} Measures`}
          secondaryText={record => `To reach by: ${record['target-date']}`}
          tertiaryText={record => `Created: ${formatDate(record['created-at'])}`}
        />
      ) : (
        <Datagrid rowClick="edit" isRowSelectable={() => false}>
          <NumberField source="measures-amount" label="Measures (target amount)" />
          <DateField source="target-date" label="Target date" />
          <EditButton />
          <DeleteButton undoable={false} />
        </Datagrid>
      )}
    </List>
  );
};

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
