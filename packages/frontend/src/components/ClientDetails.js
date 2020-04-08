/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progressbar from './Progressbar';
import MeasureCheckList from './admin/MeasureCheckList';
import EditButton from './elements/EditButton';
import InputClientTitle from './elements/editMode/InputClientTitle';

const ClientDetails = props => {
  const { client, editMode } = props;
  const { name, measures, progress } = client;
  const [renderChecklist, setRenderChecklist] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const OuterContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    cursor: hoverState ? 'pointer' : 'auto',
    marginBottom: '10px'
  };

  const ProgressBarContainerStyle = {
    flex: 1,
    justifyContent: 'center'
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

  const onClickEdit = e => {
    e.preventDefault();
    setIsEditingTitle(true);
  };

  return (
    <div style={OuterContainerStyle}>
      <div
        onMouseEnter={!isEditingTitle ? toggleHoverState : () => true}
        onMouseLeave={!isEditingTitle ? toggleHoverState : () => true}
        onClick={!isEditingTitle ? handleToggleClick : () => true}
        onKeyDown={!isEditingTitle ? handleToggleClick : () => true}
        style={ProgressBarContainerStyle}
      >
        {isEditingTitle ? (
          <InputClientTitle setIsEditingTitle={setIsEditingTitle} name={name} />
        ) : (
          <Progressbar style={{ flex: 1 }} clientName={name} clientScore={progress} />
        )}
      </div>
      {editMode && !isEditingTitle && (
        <div style={EditButtonContainerStyle}>
          <EditButton onClick={onClickEdit} />
        </div>
      )}
      {!isEditingTitle && renderChecklist && measures.length > 0 && (
        <div style={MeasureCheckListContainerStyle}>
          <MeasureCheckList measures={measures} />
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
