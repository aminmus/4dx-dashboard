// Disabling prop types errors for now as the structure might change soon
/* eslint-disable react/prop-types */
/* eslint-disable no-console, no-unused-vars, react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StateContext from '../context/state-context';
import Wig from '../components/Wig';
import Lead from '../components/Lead';
import Details from '../components/Details';
import Nps from '../components/Nps';
import MeasuresOverTime from '../components/MeasuresOverTime';
import { toggleEdit } from '../actions/editMode';
import fetchResourcesAction from '../actions/resources';
import calcDefineClients from '../utils/calcDefineClients';
import calcLeads from '../utils/calcLeads';
import reformatChart from '../utils/reformatChart';

const Home = ({ isLoggedIn, dispatch, resources: { clients, nps, measures, measuresGoal } }) => {
  const [definedStatus, setDefinedStatus] = useState({ totalClients: 0, definedClients: 0 });
  const [leadStatus, setLeadStatus] = useState({ leads: 0, leadsTotal: 0 });
  const [chart, setChart] = useState({
    months: [],
    values: [],
    target: null
  });

  useEffect(() => {
    dispatch(fetchResourcesAction());
  }, []);

  useEffect(() => {
    if (clients) {
      setDefinedStatus(calcDefineClients(clients));
      setLeadStatus(calcLeads(clients));
    }
  }, [clients]);

  useEffect(() => {
    if (nps.length > 0) {
      setChart(reformatChart(nps));
    }
  }, [nps]);

  const handleEditClick = e => {
    e.preventDefault();
    dispatch(toggleEdit());
  };

  return (
    <div className="p-4">
      {isLoggedIn && (
        <Button color="secondary" onClick={handleEditClick} startIcon={<EditIcon />}>
          Toggle Edit Mode
        </Button>
      )}
      <div className="row">
        <div className="col-sm">
          <Wig nps={nps} />
          <Lead nps={nps} clients={clients} definedStatus={definedStatus} leadStatus={leadStatus} />
        </div>
        <div className="col-sm">
          <Details clients={clients} />
          {chart.values.length > 0 ? (
            <Nps chart={chart} />
          ) : (
            <div className="my-5 p-4 jumbotron text-light bg-dark">
              No Measure Data Available For NPS graph
            </div>
          )}
          {measures.length > 0 ? (
            <MeasuresOverTime measures={measures} measuresGoal={measuresGoal} />
          ) : (
            <div className="my-5 p-4 jumbotron text-light bg-dark">
              No Measure Data Available For Measure Over Time Graph
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ editMode, auth, resources }) => ({
  editMode: editMode?.editModeEnabled,
  isLoggedIn: auth?.isLoggedIn,
  resources
});

export default connect(mapStateToProps, null)(Home);
