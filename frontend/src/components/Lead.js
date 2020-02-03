/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';

export default function Lead(props) {
  const { nps, clients } = props;
  const { defineClients, defineText, implementText } = nps;

  const setDefineLeadClassName = () => {
    if (defineClients < 7) {
      return 'text-danger';
    } else if (defineClients >= 8 && defineClients < 9) {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  };

  const calcLeads = () => {
    const leads = { status: 0, total: 0, ratio: 0 };
    for (const { progress } of clients) {
      leads.total += 10;
      leads.status += parseInt(progress);
      leads.ratio = leads.status + '/' + leads.total;
    }
    return leads;
  };

  const setImplementLeadClassName = () => {
    const leads = calcLeads();
    if (leads.status < leads.total * 0.7) {
      return 'text-danger';
    } else if (leads.status >= leads.total * 0.7 && leads.status <= leads.total * 0.8) {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  };

  const renderDefineSuccess = () => {
    return (
      <div>
        <h3 className="define">{defineText}</h3>
        <div className="define lead__number">
          <span className={setDefineLeadClassName()}>
            {defineClients}
            /10
          </span>
        </div>
      </div>
    );
  };

  const renderImplementSuccess = () => {
    const leads = calcLeads();
    return (
      <div>
        <h3 className="implement">{implementText}</h3>
        <div className="implement lead__number">
          <span className={setImplementLeadClassName()}>{leads.ratio}</span>
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
  clients: [],
  nps: {}
};

Lead.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object),
  nps: PropTypes.shape({
    description: PropTypes.string,
    current: PropTypes.string,
    goal: PropTypes.string,
    defineClients: PropTypes.string,
    defineText: PropTypes.string,
    implementText: PropTypes.string
  })
};
