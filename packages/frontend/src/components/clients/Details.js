import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, CircularProgress as LoadingIndicator, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';
import ClientDetails from './ClientDetails';
import InputClient from './InputClient';
import { addResource } from '../../slices/resources';
import COLORS from '../../style/COLORS';

const { primary, lightGray } = COLORS;

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
    flex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    addClientBtn: {
      padding: '0',
      margin: 'auto',
      opacity: 0.5,
      '&:hover': {
        backgroundColor: lightGray,
        opacity: 1
      }
    },
    addClientIcon: {
      padding: '0',
      marginRight: '5px',
      color: primary
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
              <Button onClick={() => setIsEditing(true)} className={classes.addClientBtn}>
                <AddCircleIcon className={classes.addClientIcon} />
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
