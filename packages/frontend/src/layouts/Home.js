/* eslint-disable no-console, no-unused-vars, react/no-unused-prop-types */
import React from 'react';
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

const Home = props => {
  const { isLoggedIn, dispatch } = props;

  const handleEditClick = e => {
    e.preventDefault();
    dispatch(toggleEdit());
  };

  return (
    <StateContext.Consumer>
      {context => (
        <div className="p-4">
          {isLoggedIn && (
            <Button color="secondary" onClick={handleEditClick} startIcon={<EditIcon />}>
              Toggle Edit Mode
            </Button>
          )}
          <div className="row">
            <div className="col-sm">
              <Wig nps={context.nps} />
              <Lead
                nps={context.nps}
                definedStatus={context.definedStatus}
                leadStatus={context.leadStatus}
              />
            </div>
            <div className="col-sm">
              <Details clients={context.clients} />
              {context.chart.values.length > 0 ? (
                <Nps chart={context.chart} />
              ) : (
                <div className="my-5 p-4 jumbotron text-light bg-dark">
                  No Measure Data Available For NPS graph
                </div>
              )}
              {context.measures.length > 0 ? (
                <MeasuresOverTime measures={context.measures} measuresGoal={context.measuresGoal} />
              ) : (
                <div className="my-5 p-4 jumbotron text-light bg-dark">
                  No Measure Data Available For Measure Over Time Graph
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </StateContext.Consumer>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ editMode, auth }) => ({
  editMode: editMode?.editModeEnabled,
  isLoggedIn: auth?.isLoggedIn
});

export default connect(mapStateToProps, null)(Home);
