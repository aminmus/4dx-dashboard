/* eslint-disable radix */ /* eslint-disable no-restricted-syntax */

import React from 'react';
import PropTypes from 'prop-types';

export default function Lead(props) {
  const { nps, leadStatus, definedStatus } = props;
  const { leads, leadsTotal } = leadStatus;
  const { definedClients, totalClients } = definedStatus;
  const { defineClients, defineText, implementText } = nps;

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
        <h3 className="define">{defineText}</h3>
        <div className="define lead__number">
          <span className={setDefineLeadClassName()}>{`${definedClients}/${totalClients}`}</span>
        </div>
      </div>
    );
  };

  const renderImplementSuccess = () => {
    return (
      <div>
        <h3 className="implement">{implementText}</h3>
        <div className="implement lead__number">
          <span className={setImplementLeadClassName()}>{`${leads}/${leadsTotal}`}</span>
        </div>
      </div>
    );
  };
  return (
    <div className="lead__measures bg-container">
      <h2>LEAD</h2>
      {renderDefineSuccess()}
      {renderImplementSuccess()}
    </div>
  );
}

Lead.defaultProps = {
  nps: {},
  leadStatus: {},
  definedStatus: {}
};

Lead.propTypes = {
  leadStatus: PropTypes.shape({ leads: PropTypes.number, leadsTotal: PropTypes.number }),
  definedStatus: PropTypes.shape({
    definedClients: PropTypes.number,
    totalClients: PropTypes.number
  }),
  nps: PropTypes.shape({
    description: PropTypes.string,
    current: PropTypes.string,
    goal: PropTypes.string,
    defineClients: PropTypes.string,
    defineText: PropTypes.string,
    implementText: PropTypes.string
  })
};
