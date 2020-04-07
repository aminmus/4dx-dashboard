/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progressbar from './Progressbar';
import MeasureCheckList from './admin/MeasureCheckList';
import EditButton from './elements/EditButton';

const ClientDetails = props => {
  const { client, editMode } = props;
  const [renderChecklist, setRenderChecklist] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const OuterContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    cursor: hoverState ? 'pointer' : 'auto'
  };

  const ProgressBarContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    padding: '10px'
  };

  const EditButtonContainerStyle = {
    justifyContent: 'center',
    padding: '10px'
  };

  const MeasureCheckListContainerStyle = {
    display: 'flex',
    flexBasis: '100%',
    justifyContent: 'darkGray',
    border: '1px solid white',
    borderRadius: '10px',
    margin: '0, 10px 0 10px',
    width: '100%'
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
    <div style={OuterContainerStyle}>
      <div
        onMouseEnter={toggleHoverState}
        onMouseLeave={toggleHoverState}
        onClick={handleToggleClick}
        onKeyDown={handleToggleClick}
        style={ProgressBarContainerStyle}
      >
        <Progressbar
          style={{ flex: 1 }}
          key={client.id}
          clientName={client.name}
          clientScore={client.progress}
        />
      </div>
      {editMode && (
        <div style={EditButtonContainerStyle}>
          <EditButton />
        </div>
      )}
      {renderChecklist && client.measures.length > 0 && (
        <div style={MeasureCheckListContainerStyle}>
          <MeasureCheckList key={`${client.id}-checklist`} measures={client.measures} />
        </div>
      )}
    </div>
  );
};

ClientDetails.defaultProps = {
  client: {}
};

ClientDetails.propTypes = {
  editMode: PropTypes.bool.isRequired,
  client: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    measures: PropTypes.array,
    progress: PropTypes.string
  })
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled,
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, null)(ClientDetails);
