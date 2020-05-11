import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProgressBar from '../elements/ProgressBar';
import MeasureCheckList from '../measures/MeasureCheckList';
import EditButton from '../elements/EditButton';
import InputClient from './InputClient';
import DeleteButton from '../elements/DeleteButton';
import DeleteDialog from '../elements/DeleteDialog';
import { updateResource, deleteResource } from '../../slices/resources';

/**
 * Client Details component
 *
 * @component
 * @param {Object} props Component props
 * @param {Object} props.client Client resource object
 * @param {Boolean} props.editMode Is user editing resource
 * @param {Function} props.dispatch Redux store dispatch
 */
const ClientDetails = ({ client, editMode, dispatch }) => {
  const [renderChecklist, setRenderChecklist] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      cursor: hoverState ? 'pointer' : 'auto'
    },
    progressBarContainer: { flex: 1, justifyContent: 'center' },
    editBtnContainer: { justifyContent: 'center', padding: '0.2em' },
    measureCheckListContainer: {
      display: 'flex',
      flexBasis: '100%',
      justifyContent: 'darkGray',
      border: '1px solid white',
      borderRadius: '0.2em',
      margin: '0, 0.2em 0 0.2em',
      width: '100%'
    }
  });

  const classes = useStyles();

  const editClient = data => {
    dispatch(updateResource(data));
    setIsEditing(false);
  };

  const deleteClient = () => {
    dispatch(
      deleteResource({
        type: 'clients',
        id: client.id
      })
    );
  };

  const handleContainerHover = () => (!isEditing ? () => setHoverState(!hoverState) : () => true);
  const handleContainerClick = () =>
    !isEditing ? () => setRenderChecklist(!renderChecklist) : () => true;

  return (
    <div className={classes.mainContainer}>
      <div
        role="presentation"
        onMouseEnter={handleContainerHover()}
        onMouseLeave={handleContainerHover()}
        onClick={handleContainerClick()}
        onKeyDown={handleContainerClick()}
        className={classes.progressBarContainer}
      >
        {isEditing ? (
          <InputClient
            id={client.id}
            setIsEditing={setIsEditing}
            name={client.name}
            handleResource={editClient}
          />
        ) : (
          <ProgressBar
            key={client.id}
            clientName={client.name}
            clientScore={client.progress}
            clientMeasures={client?.measures}
          />
        )}
      </div>
      {editMode && !isEditing && (
        <div className={classes.editBtnContainer}>
          <div>
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={() => setIsDeleting(true)} />
            {isDeleting && (
              <DeleteDialog
                type="clients"
                content={client.name}
                isDeleting={isDeleting}
                handleDelete={deleteClient}
                setIsDeleting={setIsDeleting}
              />
            )}
          </div>
        </div>
      )}
      {renderChecklist && !isEditing && (
        <div className={classes.measureCheckListContainer}>
          <MeasureCheckList clientId={client.id} measures={client.measures} />
        </div>
      )}
    </div>
  );
};

ClientDetails.propTypes = {
  editMode: PropTypes.bool.isRequired,
  client: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    measures: PropTypes.array,
    progress: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled,
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, null)(ClientDetails);
