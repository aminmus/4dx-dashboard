import React from 'react';
import { Admin as ReactAdmin, Resource } from 'react-admin';
import PropTypes from 'prop-types';

import { ClientList, ClientEdit, ClientShow, ClientCreate } from '../components/admin/client';
// eslint-disable-next-line import/no-cycle
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
// eslint-disable-next-line import/no-cycle
import Login from './Login';
import theme from '../style/muiTheme';

export default function Admin({ history, customRoutes }) {
  return (
    <ReactAdmin
      history={history}
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      theme={theme}
      layout={CustomLayout}
      loginPage={Login}
      customRoutes={customRoutes}
    >
      <Resource
        name="clients"
        create={ClientCreate}
        list={ClientList}
        edit={ClientEdit}
        show={ClientShow}
        options={{ label: 'Clients' }}
      />
      <Resource name="csat" edit={CsatEdit} create={CsatCreate} options={{ label: 'CSAT' }} />
      <Resource
        name="measures"
        edit={MeasureEdit}
        create={MeasureCreate}
        options={{ label: 'Measures' }}
      />
      <Resource name="users" list={UserList} options={{ label: 'Users' }} />
      <Resource
        name="nps"
        list={NpsList}
        edit={NpsEdit}
        create={NpsCreate}
        options={{ label: 'NPS' }}
      />
      <Resource
        name="measureGoals"
        options={{ label: 'Measure Goals' }}
        list={MeasureGoalList}
        edit={MeasureGoalEdit}
        create={MeasureGoalCreate}
      />
    </ReactAdmin>
  );
}

Admin.defaultProps = {
  customRoutes: []
};

Admin.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  customRoutes: PropTypes.arrayOf(PropTypes.element)
};
