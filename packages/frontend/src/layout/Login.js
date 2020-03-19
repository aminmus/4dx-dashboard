import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createMuiTheme } from '@material-ui/core/styles';
import jsonapiClient from 'ra-jsonapi-client';
import { ClientList, ClientEdit, ClientShow, ClientCreate } from '../components/dashboard/client';
import authProvider from '../authProvider';
import Dashboard from './Dashboard';
import { CsatEdit, CsatCreate } from '../components/dashboard/csat';
import { MeasureEdit, MeasureCreate } from '../components/dashboard/measure';
import UserList from '../components/UserList';
import { NpsList, NpsEdit, NpsCreate } from '../components/dashboard/nps';
import {
  MeasureGoalList,
  MeasureGoalEdit,
  MeasureGoalCreate
} from '../components/dashboard/measureGoal';
import CustomLayout from '../CustomLayout';

export default function Login() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  const settings = {
    updateMethod: 'PUT',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  };

  const baseUrl = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT}`;

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={jsonapiClient(`${baseUrl}/api`, settings)}
      dashboard={Dashboard}
      theme={theme}
      layout={CustomLayout}
    >
      <Resource
        name="clients"
        create={ClientCreate}
        list={ClientList}
        edit={ClientEdit}
        show={ClientShow}
      />
      <Resource name="csat" edit={CsatEdit} create={CsatCreate} />
      <Resource name="measures" edit={MeasureEdit} create={MeasureCreate} />
      <Resource name="users" list={UserList} />
      <Resource name="nps" list={NpsList} edit={NpsEdit} create={NpsCreate} />
      <Resource
        name="measureGoals"
        list={MeasureGoalList}
        edit={MeasureGoalEdit}
        create={MeasureGoalCreate}
      />
    </Admin>
  );
}
