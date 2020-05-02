/* eslint-disable no-shadow, no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  Button,
  CircularProgress as LoadingIndicator,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { styled } from '@material-ui/core/styles';
import MeasureListItem from './MeasureListItem';
import InputMeasure from './elements/editMode/InputMeasure';
import { addMeasure } from '../slices/resources';

const MeasureList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'strech',
  flexBasis: '100%',
  width: '100%'
});

const MeasureCheckList = ({ measures, editMode, clientId, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingNewMeasure, setIsLoadingNewMeasure] = useState(false);

  useEffect(() => {
    setIsLoadingNewMeasure(false);
  }, [measures]);

  const handleSave = data => {
    dispatch(addMeasure(data));
    setIsLoadingNewMeasure(true);
    setIsEditing(false);
  };

  const useStyles = makeStyles({
    flex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  });

  const classes = useStyles();

  return (
    <MeasureList>
      {measures.map(measure => {
        return <MeasureListItem clientId={clientId} measure={measure} key={`${measure.id}`} />;
      })}
      {editMode && (
        <ListItem className="text-light">
          {isEditing && editMode ? (
            <InputMeasure clientId={clientId} handleSave={handleSave} setIsEditing={setIsEditing} />
          ) : (
            <div className={classes.flex}>
              {isLoadingNewMeasure && <LoadingIndicator />}
              <Button onClick={() => setIsEditing(true)} className="px-0 mx-auto">
                <AddCircleIcon className="mr-2 text-warning" />
                Add New Measure
              </Button>
            </div>
          )}
        </ListItem>
      )}
    </MeasureList>
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
