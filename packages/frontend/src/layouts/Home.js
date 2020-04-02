/* eslint-disable no-console, no-unused-vars, react/no-unused-prop-types */
import React, { useEffect } from 'react';
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
import isAuthenticated from '../utils/authentication';
import { TOGGLE_EDIT } from '../actions/types';

const Home = props => {
  const { isAuth, isAdmin, isLoggedIn } = props;

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn);
    console.log('isAdmin', isAdmin);
    console.log('isAuth', isAuthenticated());
  }, [isLoggedIn]);

  const handleEditClick = e => {
    e.preventDefault();
    props.toggleEdit();
  };

  return (
    <StateContext.Consumer>
      {context => (
        <div className="p-4">
          {isAuthenticated() && (
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
  isAuth: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode,
  isLoggedIn: state.isLoggedIn,
  isAdmin: state.isAdmin
});

const mapDispatchToProps = dispatch => {
  return {
    toggleEdit: () => dispatch({ type: TOGGLE_EDIT })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
