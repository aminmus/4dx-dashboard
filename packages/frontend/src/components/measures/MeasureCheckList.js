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
import MeasureListItem from './MeasureListItem';
import InputMeasure from '../elements/InputMeasure';
import { addMeasure } from '../../slices/resources';
import COLORS from '../../style/COLORS';

const { primary, lightGray } = COLORS;

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

  const handleSave = data => {
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
    },
    addMeasureBtn: {
      padding: '0',
      margin: 'auto',
      opacity: 0.5,
      '&:hover': {
        backgroundColor: lightGray,
        opacity: 1
      }
    },
    addMeasureIcon: {
      padding: '0',
      marginRight: '5px',
      color: primary
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
            <InputMeasure clientId={clientId} handleSave={handleSave} setIsEditing={setIsEditing} />
          ) : (
            <div className={classes.flex}>
              {isLoadingNewMeasure && <LoadingIndicator />}
              <Button onClick={() => setIsEditing(true)} className={classes.addMeasureBtn}>
                <AddCircleIcon className={classes.addMeasureIcon} />
                Add New Measure
              </Button>
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
