// Disabling prop types errors for now as the structure might change soon
/* eslint-disable radix */ /* eslint-disable no-restricted-syntax */

import React from 'react';
import PropTypes from 'prop-types';
import calcDefineClients from '../utils/calcDefineClients';

export default function Lead(props) {
  const { clients, leadStatus, definedStatus } = props;
  const { leads, leadsTotal } = leadStatus;
  const { definedClients, totalClients } = definedStatus;

  const defineClients = calcDefineClients(clients);

  const LeadNumberStyle = {
    fontSize: '60px',
    fontWeight: 700,
    letterSpacing: '1px',
    marginBottom: '40px'
  };

  const setDefineLeadClassName = () => {
    if (defineClients < 7) {
      return 'text-danger';
    }
    if (defineClients >= 8 && defineClients < 9) {
      return 'text-warning';
    }
    return 'text-success';
  };

  const setImplementLeadClassName = () => {
    if (leads < leadsTotal * 0.7) {
      return 'text-danger';
    }
    if (leads >= leadsTotal * 0.7 && leads <= leadsTotal * 0.8) {
      return 'text-warning';
    }
    return 'text-success';
  };

  const renderDefineSuccess = () => {
    return (
      <div>
        <h3 className="define">Define the Success factors for listed clients</h3>
        <div style={LeadNumberStyle}>
          <span className={setDefineLeadClassName()}>{`${definedClients}/${totalClients}`}</span>
        </div>
      </div>
    );
  };

  const renderImplementSuccess = () => {
    return (
      <div>
        <h3 className="implement">Implement Client Success Program for listed clients</h3>
        <div style={LeadNumberStyle}>
          <span className={setImplementLeadClassName()}>{`${leads}/${leadsTotal}`}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-3">
      <h2>LEAD</h2>
      {renderDefineSuccess()}
      {renderImplementSuccess()}
    </div>
  );
}

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
