import React, { useState } from 'react';
import { ListItem, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditButton from '../elements/EditButton';
import DeleteButton from '../elements/DeleteButton';
import InputMeasure from '../elements/InputMeasure';
import DeleteDialog from '../elements/DeleteDialog';
import { updateMeasure, deleteMeasure } from '../../slices/resources';
import COLORS from '../../style/COLORS';

/**
 * Measure List Item component
 *
 * @component
 * @param {Object} props Component props
 * @param {Object} props.measure Measure resource object
 * @param {Object} props.clientId Client resource id
 * @param {Boolean} props.editMode Is user editing resource
 * @param {Function} props.dispatch Redux store dispatch
 */
const MeasureListItem = ({ measure, clientId, editMode, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id, success, description } = measure;

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    container: { display: 'flex' },
    successIcon: {
      color: COLORS.success,
      marginRight: '0.2em'
    },
    cancelIcon: {
      color: COLORS.danger,
      marginRight: '0.2em'
    }
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
    <ListItem>
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
            <CheckCircleIcon className={classes.successIcon} />
          ) : (
            <CancelIcon className={classes.cancelIcon} />
          )}
          <Typography variant="body1">{description}</Typography>
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
