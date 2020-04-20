/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProgressBar from './elements/ProgressBar';
import MeasureCheckList from './MeasureCheckList';
import EditButton from './elements/EditButton';
import InputClient from './elements/editMode/InputClient';
import DeleteButton from './elements/DeleteButton';
import DeleteDialog from './elements/editMode/DeleteDialog';

const ClientDetails = ({ client, editMode }) => {
  const [renderChecklist, setRenderChecklist] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleContainerHover = () => (!isEditing ? () => setHoverState(!hoverState) : () => true);
  const handleContainerClick = () =>
    !isEditing ? () => setRenderChecklist(!renderChecklist) : () => true;

  return (
    <div style={OuterContainerStyle}>
      <div
        onMouseEnter={handleContainerHover()}
        onMouseLeave={handleContainerHover()}
        onClick={handleContainerClick()}
        onKeyDown={handleContainerClick()}
        style={ProgressBarContainerStyle}
      >
        {isEditing ? (
          <InputClient id={client.id} setIsEditing={setIsEditing} name={client.name} />
        ) : (
          <ProgressBar
            style={{ flex: 1 }}
            key={client.id}
            clientName={client.name}
            clientScore={client.progress}
            clientMeasures={client?.measures}
          />
        )}
      </div>
      {editMode && !isEditing && (
        <div style={EditButtonContainerStyle}>
          <div>
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={() => setIsDeleting(true)} />
            {isDeleting && (
              <DeleteDialog
                id={client.id}
                type="clients"
                content={client.name}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
              />
            )}
          </div>
        </div>
      )}
      {renderChecklist && client.measures.length > 0 && !isEditing && (
        <div style={MeasureCheckListContainerStyle}>
          <MeasureCheckList clientId={client.id} measures={client.measures} />
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
    id: PropTypes.string,
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
