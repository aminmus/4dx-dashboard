import React from 'react';
import PropTypes from 'prop-types';

export default function Wig(props) {
  const { nps } = props;
  const { current, description } = nps;
  return (
    <div className="wig bg-container text-center">
      <h2>WIG</h2>
      <h3 className="wig__statement">{description}</h3>
      <div className="wig__chart">
        <div className="chart__data">
          <span className="wig__label">NPS</span>
          <span className="wig__result">{current}</span>
        </div>
      </div>
    </div>
  );
}

Wig.defaultProps = {
  nps: {},
};

Wig.propTypes = {
  nps: PropTypes.shape({
    description: PropTypes.string,
    current: PropTypes.string,
    goal: PropTypes.string,
    defineClients: PropTypes.string,
    defineText: PropTypes.string,
    implementText: PropTypes.string,
  }),
};
