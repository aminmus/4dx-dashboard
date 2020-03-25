/* eslint-disable  react/jsx-props-no-spreading, react/prop-types, react/destructuring-assignment, no-unused-vars */
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
  DeleteButton,
  Show,
  ShowButton,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  NumberField,
  DateField
} from 'react-admin';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import FalseIcon from '@material-ui/icons/Clear';
import TrueIcon from '@material-ui/icons/Done';

import { Link } from 'react-router-dom';
import { validateName } from '../../utils/adminValidation';

export const ClientList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="show" isRowSelectable={() => false}>
      <TextField source="name" />
      <EditButton />
      <DeleteButton undoable={false} />
      <ShowButton />
    </Datagrid>
  </List>
);

export const ClientEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="show">
      <TextInput disabled source="id" />
      <TextInput source="name" validate={validateName} />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="show">
      <TextInput source="name" validate={validateName} />
    </SimpleForm>
  </Create>
);

const AddNewClientScore = ({ record }) => (
  <Button
    component={Link}
    color="secondary"
    variant="contained"
    to={{
      pathname: '/csat/create',
      search: `?client_id=${record.id}`
    }}
  >
    Add client score
  </Button>
);

const AddNewClientMeasure = ({ record }) => (
  <Button
    component={Link}
    color="secondary"
    variant="contained"
    to={{
      pathname: '/measures/create',
      search: `?client_id=${record.id}`
    }}
  >
    Add client measure
  </Button>
);

const EditClientScore = ({ record, clientId }) => {
  /*
  Custom edit button exists to pass along the client id to
  the edit context. Otherwise it is lost and redirect won't
  work 
  */
  return (
    <Button
      component={Link}
      to={{
        pathname: `/csat/${record.id}`,
        search: `?client_id=${clientId}`
      }}
    >
      <EditIcon />
      <span className="px-1">EDIT</span>
    </Button>
  );
};

const EditClientMeasure = ({ record, clientId }) => {
  /*
  Custom edit button exists to pass along the client id to
  the edit context. Otherwise it is lost and redirect won't
  work 
  */
  return (
    <Button
      component={Link}
      to={{
        pathname: `/measures/${record.id}`,
        search: `?client_id=${clientId}`
      }}
    >
      <EditIcon />
      <span className="px-1">EDIT</span>
    </Button>
  );
};

const CustomBooleanField = ({ record }) => {
  if (record.success) {
    return <TrueIcon />;
  }
  return <FalseIcon />;
};

export const ClientShow = props => {
  const editCsatClick = (id, _basePath, _record) => {
    return `/csat/${id}?client_id=${props.id}`;
  };

  const editMeasuresClick = (id, _basePath, _record) => {
    return `/measures/${id}?client_id=${props.id}`;
  };

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
          <TextField source="name" />
        </Tab>
        <Tab label="Client Satisfaction" path="csat">
          <AddNewClientScore />
          <ReferenceManyField reference="csat" target="clientId" addLabel={false}>
            <Datagrid rowClick={editCsatClick}>
              <NumberField label="Score" source="score" />
              <DateField label="Date of Score" source="date" />
              <EditClientScore {...props} clientId={props.id} />
              <DeleteButton redirect={`/clients/${props.id}/show/csat`} />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Measures" path="measures">
          <AddNewClientMeasure />
          <ReferenceManyField reference="measures" target="clientId" addLabel={false}>
            <Datagrid rowClick={editMeasuresClick}>
              <TextField source="description" />
              <CustomBooleanField label="Success" {...props} />
              <EditClientMeasure {...props} clientId={props.id} />
              <DeleteButton redirect={`/clients/${props.id}/show/measures`} />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
