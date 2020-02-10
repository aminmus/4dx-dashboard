import React from 'react';
import PropTypes from 'prop-types';
import Progressbar from './Progressbar';

export default function Details(props) {
  const { clients } = props;
  return (
    <div>
      <ol>
        {clients.map(client => (
          <Progressbar key={client.id} clientName={client.name} clientScore={client.progress} />
        ))}
      </ol>
    </div>
  );
}

Details.defaultProps = {
  clients: []
};

Details.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object)
};
