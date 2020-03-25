/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Progressbar from './Progressbar';
import MeasureCheckList from './admin/MeasureCheckList';

export default function ClientDetails(props) {
  const { client } = props;
  const [renderChecklist, setRenderChecklist] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const ContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '20px 0',
    cursor: hoverState ? 'pointer' : 'auto'
  };

  const MeasureCheckListContainerStyle = {
    display: 'flex',
    justifyContent: 'darkGray',
    border: '1px solid white',
    borderRadius: '10px',
    margin: '0, 10px 0 10px'
  };

  const handleToggleClick = e => {
    e.preventDefault();
    setRenderChecklist(!renderChecklist);
  };

  const toggleHoverState = e => {
    e.preventDefault();
    setHoverState(!hoverState);
  };

  return (
    <div
      onMouseEnter={toggleHoverState}
      onMouseLeave={toggleHoverState}
      onClick={handleToggleClick}
      onKeyDown={handleToggleClick}
      style={ContainerStyle}
    >
      <Progressbar key={client.id} clientName={client.name} clientScore={client.progress} />
      {renderChecklist && client.measures.length > 0 && (
        <div style={MeasureCheckListContainerStyle}>
          <MeasureCheckList key={`${client.id}-checklist`} measures={client.measures} />
        </div>
      )}
    </div>
  );
}

ClientDetails.defaultProps = {
  client: {}
};

ClientDetails.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    measures: PropTypes.array,
    progress: PropTypes.string
  })
};
