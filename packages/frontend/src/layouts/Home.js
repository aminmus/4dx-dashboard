import React, { useEffect, useState } from 'react';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Wig from '../components/Wig';
import Lead from '../components/Lead';
import Details from '../components/Details';
import { toggleEdit } from '../actions/editMode';
import theme from '../style/muiTheme';
import { fetchResources } from '../slices/resources';
import calcDefineClients from '../utils/calcDefineClients';
import calcLeads from '../utils/calcLeads';
import formatMeasureOverTimeData from '../utils/charts/formatMeasureOverTimeData';
import formatNpsData from '../utils/charts/formatNpsData';
import MeasuresOverTimeContainer from '../components/MeasuresOverTimeContainer';
import NpsContainer from '../components/NpsContainer';
import COLORS from '../style/COLORS';

const { danger, dangerDark } = COLORS;

/**
 * Returns an array of measures extracted from the clients resource
 *
 * @function
 * @param {Object[]} clients A list of clients
 * @param {String} clients[].id Unique identifier for client reasource
 * @param {Object[]} clients[].measures Array of client measures
 * @param {Object[]} clients[].csats Array of client satisfaction scores
 * @param {String} clients[].name Client name
 * @param {String} clients[].createdAt createdAt timestamp for data resource
 * @param {String} clients[].updatedAt updatedAt timestamp for data resource
 */
const getMeasuresFromClient = clients => {
  return clients.reduce((accumulator, client) => {
    if (client?.measures) accumulator.push(...client.measures);
    return accumulator;
  }, []);
};

/**
 * Home component/layout
 *
 * @component
 * @param {Object} props Component props
 * @param {Boolean} props.isLoggedIn Is user logged in
 * @param {Function} props.dispatch Redux store dispatch
 * @param {Object} props.resources Resource object from API fetch
 * @param {Object} props.resources.data Data object containing resource data
 * @param {Boolean} props.resources.isFetching Are resources being fetched from the API
 */
const Home = ({
  isLoggedIn,
  dispatch,
  resources: {
    data: { clients, nps, measureGoals },
    isFetching
  }
}) => {
  const [definedStatus, setDefinedStatus] = useState({ totalClients: 0, definedClients: 0 });
  const [leadStatus, setLeadStatus] = useState({ leads: 0, leadsTotal: 0 });
  const [npsChartData, setNpsChartData] = useState({
    graphData: {},
    graphOptions: {}
  });
  const [measures, setMeasures] = useState();

  const [measuresChartData, setMeasuresChartData] = useState({
    graphData: {},
    graphOptions: {}
  });
  const [measuresChartInterval, setMeasuresChartInterval] = useState('weekly');

  const useStyles = makeStyles({
    editMode: {
      backgroundColor: danger,
      '&:hover': {
        backgroundColor: dangerDark
      }
    },
    toggleEditContainer: {
      textAlign: 'center',
      marginBottom: '10px'
    }
  });

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchResources());
  }, []);

  useEffect(() => {
    if (clients) {
      const measuresFromClients = getMeasuresFromClient(clients);
      setDefinedStatus(calcDefineClients(clients));
      setLeadStatus(calcLeads(clients));
      setMeasures(measuresFromClients);
      setMeasuresChartData(
        formatMeasureOverTimeData(measuresFromClients, measureGoals, measuresChartInterval)
      );
    }
  }, [clients]);

  useEffect(() => {
    const measuresFromClients = getMeasuresFromClient(clients);
    setMeasuresChartData(
      formatMeasureOverTimeData(measuresFromClients, measureGoals, measuresChartInterval)
    );
  }, [measuresChartInterval, measureGoals]);

  useEffect(() => {
    if (nps.length > 0) {
      setNpsChartData(formatNpsData(nps));
    }
  }, [nps]);

  const handleEditClick = e => {
    e.preventDefault();
    dispatch(toggleEdit());
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {isFetching && <CircularProgress />}
        <div className={classes.toggleEditContainer}>
          {isLoggedIn && (
            <Button className={classes.editMode} onClick={handleEditClick} startIcon={<EditIcon />}>
              Toggle Edit Mode
            </Button>
          )}
          <div className="row">
            <div className="col-sm">
              <Wig nps={nps} />
              <Lead clients={clients} definedStatus={definedStatus} leadStatus={leadStatus} />
            </div>
            <div className="col-sm">
              <Details />
              {nps?.length > 0 ? (
                <NpsContainer npsChartData={npsChartData} />
              ) : (
                <div className="my-5 p-4 jumbotron text-light bg-dark">
                  No Measure Data Available For NPS graph
                </div>
              )}
              {measures?.length > 0 ? (
                <MeasuresOverTimeContainer
                  measureGoals={measureGoals}
                  measuresChartData={measuresChartData}
                  measuresChartInterval={measuresChartInterval}
                  setMeasuresChartInterval={setMeasuresChartInterval}
                />
              ) : (
                <div className="my-5 p-4 jumbotron text-light bg-dark">
                  No Measure Data Available For Measure Over Time Graph
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  resources: PropTypes.shape({
    data: PropTypes.shape({
      clients: PropTypes.arrayOf(PropTypes.object).isRequired,
      nps: PropTypes.arrayOf(PropTypes.object).isRequired,
      measureGoals: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    isFetching: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = ({ auth, resources }) => ({
  isLoggedIn: auth?.isLoggedIn,
  resources
});

export default connect(mapStateToProps, null)(Home);
