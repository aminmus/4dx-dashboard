import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';
import ClientDetails from './ClientDetails';
import InputClient from './elements/editMode/InputClient';
import { addResource } from '../slices/resources';

const Details = ({ clients, editMode, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const addNewClient = data => {
    dispatch(addResource(data));
    setIsEditing(false);
  };
  return (
    <div className="mt-3">
      {clients.map(client => (
        <ClientDetails key={client.id} client={client} />
      ))}
      {editMode && (
        <div>
          {isEditing && editMode ? (
            <InputClient handleSave={addNewClient} setIsEditing={setIsEditing} />
          ) : (
            <Button onClick={() => setIsEditing(true)} className="px-0">
              <AddCircleIcon className="mr-2 text-warning" />
              Add New Client
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

Details.propTypes = {
  editMode: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({
  editMode,
  resources: {
    data: { clients }
  }
}) => ({
  editMode: editMode.editModeEnabled,
  clients
});

export default connect(mapStateToProps, null)(Details);
