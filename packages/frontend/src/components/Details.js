import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress as LoadingIndicator, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ClientDetails from './ClientDetails';
import InputClient from './elements/editMode/InputClient';
import { addResource } from '../slices/resources';
import AddNewResourceButton from './elements/editMode/AddNewResourceButton';

/**
 * Details component for client
 *
 * @component
 * @param {Object} props Component props
 * @param {Object[]} props.clients Array of client resource objects
 * @param {Boolean} props.editMode Is user editing resource
 * @param {Function} props.dispatch Redux store dispatch
 */
const Details = ({ clients, editMode, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingNewClient, setIsLoadingNewClient] = useState(false);

  const useStyles = makeStyles({
    mainContainer: {
      padding: '0.2em',
      margin: '2em 0em'
    },
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
    <div className={classes.mainContainer}>
      <div>
        <Typography variant="h3">CLIENTS</Typography>
      </div>
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
              <AddNewResourceButton buttonText="Add New Client" setIsEditing={setIsEditing} />
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
