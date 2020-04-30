import React, { useEffect, useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
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
import reformatNps from '../utils/reformatNps';
import formatMeasureOverTimeData from '../utils/charts/formatMeasureOverTimeData';
import ChartContainer from '../components/graphs/MeasureOverTime/ChartContainer';
import NpsContainer from '../components/graphs/NPS/NpsContainer';

const getMeasuresFromClient = clients =>
  clients.reduce((accumulator, client) => {
    if (client?.measures) accumulator.push(...client.measures);
    return accumulator;
  }, []);

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
    months: [],
    values: [],
    target: null
  });
  const [measures, setMeasures] = useState();

  const [measuresChartData, setMeasuresChartData] = useState({
    graphData: [],
    graphOptions: {}
  });
  const [measuresChartInterval, setMeasuresChartInterval] = useState('weekly');

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
      setNpsChartData(reformatNps(nps));
    }
  }, [nps]);

  useEffect(() => {
    if (nps.length > 0) {
      setNpsChartData(reformatNps(nps));
    }
  }, [nps]);

  const handleEditClick = e => {
    e.preventDefault();
    dispatch(toggleEdit());
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="p-4">
        {isFetching ? (
          <CircularProgress />
        ) : (
          <div>
            {isLoggedIn && (
              <Button color="secondary" onClick={handleEditClick} startIcon={<EditIcon />}>
                Toggle Edit Mode
              </Button>
            )}
            <div className="row">
              <div className="col-sm">
                <Wig nps={nps} />
                <Lead
                  nps={nps}
                  clients={clients}
                  definedStatus={definedStatus}
                  leadStatus={leadStatus}
                />
              </div>
              <div className="col-sm">
                <Details />
                {npsChartData.values.length > 0 ? (
                  <NpsContainer chart={npsChartData} />
                ) : (
                  // <Nps chart={npsChartData} />
                  <div className="my-5 p-4 jumbotron text-light bg-dark">
                    No Measure Data Available For NPS graph
                  </div>
                )}
                {measures?.length > 0 ? (
                  <ChartContainer
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
        )}
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
