import React, { useState } from 'react';
import { ListItem } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditButton from '../elements/EditButton';
import DeleteButton from '../elements/DeleteButton';
import InputMeasure from '../elements/editMode/InputMeasure';
import DeleteDialog from '../elements/editMode/DeleteDialog';
import { updateMeasure, deleteMeasure } from '../../slices/resources';

const MeasureListItem = ({ measure, clientId, editMode, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id, success, description } = measure;

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    container: { display: 'flex' }
  });

  const classes = useStyles();

  const handleMeasureUpdate = data => {
    dispatch(updateMeasure(data));
    setIsEditing(false);
  };

  const handleMeasureDelete = () => {
    dispatch(
      deleteMeasure({
        id,
        clientId
      })
    );
  };

  return (
    <ListItem className="text-light">
      {isEditing && editMode ? (
        <div>
          <InputMeasure
            id={measure.id}
            clientId={clientId}
            success={measure.success}
            description={measure.description}
            handleSave={handleMeasureUpdate}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <div className={classes.container}>
          {success ? (
            <CheckCircleIcon className="mr-2 text-success" />
          ) : (
            <CancelIcon className="mr-2 text-danger" />
          )}
          {description}
          {editMode && (
            <div>
              <EditButton onClick={() => setIsEditing(true)} />
              <DeleteButton onClick={() => setIsDeleting(true)} />
              {isDeleting && (
                <DeleteDialog
                  id={id}
                  type="measures"
                  content={description}
                  isDeleting={isDeleting}
                  handleDelete={handleMeasureDelete}
                  setIsDeleting={setIsDeleting}
                />
              )}
            </div>
          )}
        </div>
      )}
    </ListItem>
  );
};

MeasureListItem.defaultProps = {
  measure: {}
};

MeasureListItem.propTypes = {
  editMode: PropTypes.bool.isRequired,
  measure: PropTypes.shape({
    id: PropTypes.string,
    success: PropTypes.string,
    description: PropTypes.string
  }),
  clientId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(MeasureListItem);
