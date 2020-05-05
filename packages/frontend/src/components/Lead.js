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
    leadNumber: {
      fontSize: '60px',
      fontWeight: 700,
      letterSpacing: '1px',
      marginBottom: '40px'
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
        <h3 className="define">Define the Success factors for listed clients</h3>
        <div className={classes.leadNumber}>
          <span className={setDefineLeadClassName(defineClients)}>
            {`${definedClients}/${totalClients}`}
          </span>
        </div>
      </div>
    );
  };

  const renderImplementSuccess = () => {
    return (
      <div>
        <h3 className="implement">Implement Client Success Program for listed clients</h3>
        <div className={classes.leadNumber}>
          <span className={setImplementLeadClassName(leads, leadsTotal)}>
            {`${leads}/${leadsTotal}`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-3">
      <Typography variant="h2">LEAD</Typography>
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
