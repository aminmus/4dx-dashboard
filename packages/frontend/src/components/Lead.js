import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import calcDefineClients from '../utils/calcDefineClients';
import COLORS from '../style/COLORS';

const { danger, warning, success } = COLORS;

const Lead = ({ clients, leadStatus, definedStatus }) => {
  const { leads, leadsTotal } = leadStatus;
  const { definedClients, totalClients } = definedStatus;

  const defineClients = calcDefineClients(clients);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    mainContainer: {
      margin: '20px'
    },
    leadNumberContainer: {
      marginBottom: '10px'
    },
    definedLow: {
      color: danger,
      fontWeight: 'bolder'
    },
    definedMid: {
      color: warning,
      fontWeight: 'bolder'
    },
    definedHigh: {
      color: success,
      fontWeight: 'bolder'
    },
    innerContainer: {
      padding: '10px'
    }
  });

  const classes = useStyles();

  const setDefineLeadClassName = defined => {
    if (defined < 7) {
      return classes.definedLow;
    }
    if (defined >= 8 && defined < 9) {
      return classes.definedMid;
    }
    return classes.definedHigh;
  };

  const setImplementLeadClassName = (leadValue, leadTotalValue) => {
    if (leadValue < leadTotalValue * 0.7) {
      return classes.definedLow;
    }
    if (leadValue >= leadTotalValue * 0.7 && leadValue <= leadTotalValue * 0.8) {
      return classes.definedMid;
    }
    return classes.definedHigh;
  };

  const renderDefineSuccess = () => {
    return (
      <div className={classes.innerContainer}>
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
      <div className={classes.innerContainer}>
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
    <div className={classes.mainContainer}>
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
