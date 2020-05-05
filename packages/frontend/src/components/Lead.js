import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import calcDefineClients from '../utils/calcDefineClients';

const Lead = ({ clients, leadStatus, definedStatus }) => {
  const { leads, leadsTotal } = leadStatus;
  const { definedClients, totalClients } = definedStatus;

  const defineClients = calcDefineClients(clients);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    leadNumberContainer: {
      marginBottom: '10px'
    }
  });

  const classes = useStyles();

  const setDefineLeadClassName = defined => {
    if (defined < 7) {
      return 'text-danger';
    }
    if (defined >= 8 && defined < 9) {
      return 'text-warning';
    }
    return 'text-success';
  };

  const setImplementLeadClassName = (leadValue, leadTotalValue) => {
    if (leadValue < leadTotalValue * 0.7) {
      return 'text-danger';
    }
    if (leadValue >= leadTotalValue * 0.7 && leadValue <= leadTotalValue * 0.8) {
      return 'text-warning';
    }
    return 'text-success';
  };

  const renderDefineSuccess = () => {
    return (
      <div>
        <Typography variant="h5" className="define">
          Define the Success factors for listed clients
        </Typography>
        <div className={classes.leadNumberContainer}>
          <Typography variant="h3" className={setDefineLeadClassName(defineClients)}>
            {`${definedClients}/${totalClients}`}
          </Typography>
        </div>
      </div>
    );
  };

  const renderImplementSuccess = () => {
    return (
      <div>
        <Typography variant="h5" className="implement">
          Implement Client Success Program for listed clients
        </Typography>
        <div className={classes.leadNumberContainer}>
          <Typography variant="h3" className={setImplementLeadClassName(leads, leadsTotal)}>
            {`${leads}/${leadsTotal}`}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Typography variant="h3">LEAD</Typography>
      {renderDefineSuccess()}
      {renderImplementSuccess()}
    </div>
  );
};

Lead.defaultProps = {
  leadStatus: {},
  definedStatus: {},
  clients: []
};

Lead.propTypes = {
  leadStatus: PropTypes.shape({ leads: PropTypes.number, leadsTotal: PropTypes.number }),
  definedStatus: PropTypes.shape({
    definedClients: PropTypes.number,
    totalClients: PropTypes.number
  }),
  clients: PropTypes.arrayOf(PropTypes.object)
};

export default Lead;
