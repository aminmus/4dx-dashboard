/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  CircularProgress as LoadingIndicator,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MeasureListItem from './MeasureListItem';
import InputMeasure from '../elements/InputMeasure';
import { addMeasure } from '../../slices/resources';
import AddNewResourceButton from '../elements/editMode/AddNewResourceButton';

/**
 * Mesure Checklist component
 *
 * @component
 * @param {Object} props Component props
 * @param {Object[]} props.measures Array of measures resource objects
 * @param {Boolean} props.editMode Is user editing resource
 * @param {Boolean} props.clientId Id of client
 * @param {Function} props.dispatch Redux store dispatch
 */
const MeasureCheckList = ({ measures, editMode, clientId, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingNewMeasure, setIsLoadingNewMeasure] = useState(false);

  useEffect(() => {
    setIsLoadingNewMeasure(false);
  }, [measures]);

  const addNewMeasure = ({ description, success, clientId }) => {
    const data = {
      type: 'measures',
      data: {
        description,
        success,
        clientId
      }
    };
    dispatch(addMeasure(data));
    setIsLoadingNewMeasure(true);
    setIsEditing(false);
  };

  const useStyles = makeStyles({
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'strech',
      flexBasis: '100%',
      width: '100%'
    },
    flex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  });

  const classes = useStyles();

  return (
    <List className={classes.listContainer}>
      {measures.map(measure => {
        return <MeasureListItem clientId={clientId} measure={measure} key={`${measure.id}`} />;
      })}
      {editMode && (
        <ListItem>
          {isEditing && editMode ? (
            <InputMeasure
              clientId={clientId}
              handleSubmit={addNewMeasure}
              setIsEditing={setIsEditing}
            />
          ) : (
            <div className={classes.flex}>
              {isLoadingNewMeasure && <LoadingIndicator />}
              <AddNewResourceButton buttonText="Add New Measure" setIsEditing={setIsEditing} />
            </div>
          )}
        </ListItem>
      )}
    </List>
  );
};

MeasureCheckList.defaultProps = {
  measures: []
};

MeasureCheckList.propTypes = {
  clientId: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  measures: PropTypes.arrayOf(
    PropTypes.shape({
      success: PropTypes.string,
      description: PropTypes.string
    })
  ),
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(MeasureCheckList);
