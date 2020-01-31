/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';

export default function Lead(props) {
  const { nps, clients } = props;
  const { defineClients, defineText, implementText } = nps;

  const renderDefineSuccess = () => {
    let leadClassName = '';
    if (defineClients < 7) {
      leadClassName = 'text-danger';
    } else if (defineClients >= 8 && defineClients < 9) {
      leadClassName = 'text-warning';
    } else {
      leadClassName = 'text-success';
    }
    return (
      <div>
        <h3 className="define">{defineText}</h3>
        <div className="define lead__number">
          <span className={leadClassName}>
            {defineClients}
            /10
          </span>
        </div>
      </div>
    );
  };

  const renderImplementSuccess = () => {
    let leadStatus = 0;
    let leadTotal = 0;
    let leadClassName = '';
    for (const { progress } of clients) {
      leadTotal += 10;
      leadStatus += parseInt(progress);
    }
    if (leadStatus < leadTotal * 0.7) {
      leadClassName = 'text-danger';
    } else if (leadStatus >= leadTotal * 0.7 && leadStatus <= leadTotal * 0.8) {
      leadClassName = 'text-warning';
    } else {
      leadClassName = 'text-success';
    }
    const leadValue = `${leadStatus}/${leadTotal}`;
    return (
      <div>
        <h3 className="implement">{implementText}</h3>
        <div className="implement lead__number">
          <span className={leadClassName}>{leadValue}</span>
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
  nps: {},
};

Lead.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object),
  nps: PropTypes.shape({
    description: PropTypes.string,
    current: PropTypes.string,
    goal: PropTypes.string,
    defineClients: PropTypes.string,
    defineText: PropTypes.string,
    implementText: PropTypes.string,
  }),
};
