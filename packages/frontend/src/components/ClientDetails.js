/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Progressbar from './Progressbar';
import MeasureCheckList from './MeasureCheckList';

export default function ClientDetails(props) {
  const { client } = props;
  const [renderChecklist, setRenderChecklist] = useState(false);

  const handleToggleClick = e => {
    e.preventDefault();
    setRenderChecklist(!renderChecklist);
  };

  return (
    <div onClick={handleToggleClick} onKeyDown={handleToggleClick}>
      <Progressbar key={client.id} clientName={client.name} clientScore={client.progress} />
      {renderChecklist && client.measures.length > 0 && (
        <MeasureCheckList key={`${client.id}-checklist`} measures={client.measures} />
      )}
    </div>
  );
}

ClientDetails.defaultProps = {
  client: []
};

ClientDetails.propTypes = {
  client: PropTypes.arrayOf(PropTypes.object)
};
