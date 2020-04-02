import React from 'react';
import { Admin as ReactAdmin, Resource } from 'react-admin';
import { createMuiTheme } from '@material-ui/core/styles';
import { ClientList, ClientEdit, ClientShow, ClientCreate } from '../components/admin/client';
import authProvider from '../utils/react-admin/authProvider';
import dataProvider from '../utils/react-admin/dataProvider';
import Dashboard from '../components/admin/Dashboard';
import { CsatEdit, CsatCreate } from '../components/admin/csat';
import { MeasureEdit, MeasureCreate } from '../components/admin/measure';
import UserList from '../components/admin/user';
import { NpsList, NpsEdit, NpsCreate } from '../components/admin/nps';
import {
  MeasureGoalList,
  MeasureGoalEdit,
  MeasureGoalCreate
} from '../components/admin/measureGoal';
import CustomLayout from '../components/admin/CustomLayout';

export default function Login() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  return (
    <ReactAdmin
      authProvider={authProvider}
      dataProvider={dataProvider}
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
        name="MeasureGoals"
        options={{ label: 'Measure Goals' }}
        list={MeasureGoalList}
        edit={MeasureGoalEdit}
        create={MeasureGoalCreate}
      />
    </ReactAdmin>
  );
}
