/* eslint-disable  react/jsx-props-no-spreading, react/prop-types */
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

import { Link } from 'react-router-dom';

export const ClientList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
      <DeleteButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export const ClientEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm>
      <TextInput source="name" />
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

export const ClientShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField label="Id" source="id" />
        <TextField source="name" />
      </Tab>
      <Tab label="Client Satisfaction" path="csat">
        <AddNewClientScore />
        <ReferenceManyField reference="csat" target="Client_Id" addLabel={false}>
          <Datagrid>
            <NumberField label="Score" source="score" />
            <DateField label="Date of Score" source="date" />
            <TextField label="Client Id" source="ClientId" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="Measures" path="measures">
        <AddNewClientMeasure />
        <ReferenceManyField reference="measures" target="Client_Id" addLabel={false}>
          <Datagrid>
            <TextField source="description" />
            <TextField source="success" />
            <TextField label="Client Id" source="ClientId" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
