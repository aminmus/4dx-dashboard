/* eslint-disable no-shadow, no-unused-vars */
import React, { useState } from 'react';
import { List, ListItem, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MeasureListItem from './MeasureListItem';

const MeasureCheckList = ({ measures, editMode }) => {
  const [isAddingMeasure, setIsAddingMeasure] = useState(false);

  const onClickEdit = e => {
    e.preventDefault();
    setIsAddingMeasure(true);
  };
  return (
    <div>
      <List>
        {measures.map(measure => {
          return <MeasureListItem measure={measure} key={`${measure.id}`} />;
        })}
        {editMode && (
          <ListItem className="text-light">
            <Button onClick={onClickEdit} className="px-0">
              <AddCircleIcon className="mr-2 text-warning" />
              Add New Measure
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );
};

MeasureCheckList.defaultProps = {
  measures: []
};

MeasureCheckList.propTypes = {
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
