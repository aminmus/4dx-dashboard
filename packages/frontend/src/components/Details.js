import React from 'react';
import PropTypes from 'prop-types';
import ClientDetails from './ClientDetails';

export default function Details(props) {
  const { clients } = props;
  return (
    <div className="mt-5">
      {clients.map(client => (
        <ClientDetails key={client.id} client={client} />
      ))}
    </div>
  );
}

Details.defaultProps = {
  clients: []
};

Details.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object)
};
