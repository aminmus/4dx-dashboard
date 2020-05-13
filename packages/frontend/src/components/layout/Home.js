import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import OptionsButton from '../elements/OptionsButton';
import Wig from '../nps/Wig';
import Lead from '../clients/Lead';
import Details from '../clients/Details';
import { fetchResources } from '../../slices/resources';
import calcDefineClients from '../../utils/calcDefineClients';
import calcLeads from '../../utils/calcLeads';
import formatMeasureOverTimeData from '../../utils/charts/formatMeasureOverTimeData';
import formatNpsData from '../../utils/charts/formatNpsData';
import MeasuresGraphContainer from '../measures/MeasuresGraphContainer';
import NpsGraphContainer from '../nps/NpsGraphContainer';
import COLORS from '../../style/COLORS';

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
  const [graphType, setGraphType] = useState('nps');

  const useStyles = makeStyles({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    },
    editMode: {
      backgroundColor: danger,
      '&:hover': {
        backgroundColor: dangerDark
      }
    },
    toggleEditContainer: {
      textAlign: 'center',
      marginBottom: '0.2em'
    },
    cardActions: {
      justifyContent: 'center'
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

  const handleSwitchGraphClick = e => {
    e.preventDefault();
    if (graphType === 'nps') {
      setGraphType('measures');
    } else {
      setGraphType('nps');
    }
  };

  return (
    <div className={classes.mainContainer}>
      {isFetching && <CircularProgress />}
      <div className="row">
        <div className="col-md">
          <Wig nps={nps} />
          <Lead clients={clients} definedStatus={definedStatus} leadStatus={leadStatus} />
        </div>
        <div className="col-md" style={{ minWidth: 0 }}>
          <Details />
          {graphType === 'nps' ? (
            <>
              {nps?.length > 0 ? (
                <NpsGraphContainer
                  handleSwitchGraphClick={handleSwitchGraphClick}
                  npsChartData={npsChartData}
                />
              ) : (
                <Card>
                  <CardContent>
                    <Typography variant="h5">Not Enough Data Available For NPS graph</Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <OptionsButton text="Switch Graph" onClick={handleSwitchGraphClick} />
                  </CardActions>
                </Card>
              )}
            </>
          ) : (
            <>
              {measures?.length > 0 ? (
                <MeasuresGraphContainer
                  handleSwitchGraphClick={handleSwitchGraphClick}
                  measureGoals={measureGoals}
                  measuresChartData={measuresChartData}
                  measuresChartInterval={measuresChartInterval}
                  setMeasuresChartInterval={setMeasuresChartInterval}
                />
              ) : (
                <Card alignItems="center">
                  <CardContent>
                    <Typography variant="h5">
                      Not Enough Data Available For Measures graph
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <OptionsButton text="Switch Graph" onClick={handleSwitchGraphClick} />
                  </CardActions>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
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

const mapStateToProps = ({ resources }) => ({
  resources
});

export default connect(mapStateToProps, null)(Home);
