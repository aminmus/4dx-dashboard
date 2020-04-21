/* eslint-disable no-shadow, no-unused-vars */
import React, { useState } from 'react';
import { List, ListItem, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { styled } from '@material-ui/core/styles';
import MeasureListItem from './MeasureListItem';
import InputMeasure from './elements/editMode/InputMeasure';

const MeasureList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'strech',
  flexBasis: '100%',
  width: '100%'
});

const MeasureCheckList = ({ measures, editMode, clientId }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <MeasureList>
      {measures.map(measure => {
        return <MeasureListItem measure={measure} key={`${measure.id}`} />;
      })}
      {editMode && (
        <ListItem className="text-light">
          {isEditing ? (
            <InputMeasure clientId={clientId} setIsEditing={setIsEditing} />
          ) : (
            <Button onClick={() => setIsEditing(true)} className="px-0 mx-auto">
              <AddCircleIcon className="mr-2 text-warning" />
              Add New Measure
            </Button>
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
  )
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(MeasureCheckList);
