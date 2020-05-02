import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, CircularProgress as LoadingIndicator, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';
import ClientDetails from './ClientDetails';
import InputClient from './elements/editMode/InputClient';
import { addResource } from '../slices/resources';

const Details = ({ clients, editMode, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingNewClient, setIsLoadingNewClient] = useState(false);

  const useStyles = makeStyles({
    flex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  });

  const classes = useStyles();

  useEffect(() => {
    setIsLoadingNewClient(false);
  }, [clients]);

  const addNewClient = data => {
    dispatch(addResource(data));
    setIsLoadingNewClient(true);
    setIsEditing(false);
  };

  return (
    <div>
      {clients.map(client => (
        <ClientDetails key={client.id} client={client} />
      ))}
      {editMode && (
        <div>
          {isEditing && editMode ? (
            <InputClient handleSave={addNewClient} setIsEditing={setIsEditing} />
          ) : (
            <div className={classes.flex}>
              {isLoadingNewClient && <LoadingIndicator />}
              <Button onClick={() => setIsEditing(true)} className="px-0">
                <AddCircleIcon className="mr-2 text-warning" />
                Add New Client
              </Button>
            </div>
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
