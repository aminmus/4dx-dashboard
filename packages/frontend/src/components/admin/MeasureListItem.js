import React, { useState } from 'react';
import { ListItem } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditButton from '../elements/EditButton';
import InputMeasure from '../elements/editMode/InputMeasure';

const MeasureListItem = props => {
  const {
    measure: { success, description },
    editMode
  } = props;

  const [isEditingMeasure, setIsEditingMeasure] = useState(false);

  const onClickEdit = e => {
    e.preventDefault();
    setIsEditingMeasure(true);
  };

  return (
    <ListItem className="text-light">
      {isEditingMeasure ? (
        <div>
          <InputMeasure
            description={description}
            success={success}
            setIsEditingMeasure={setIsEditingMeasure}
          />
        </div>
      ) : (
        <div>
          {success ? (
            <CheckCircleIcon className="mr-2 text-success" />
          ) : (
            <CancelIcon className="mr-2 text-danger" />
          )}
          {description}
          {editMode && <EditButton onClick={onClickEdit} />}
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
    success: PropTypes.string,
    description: PropTypes.string
  })
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(MeasureListItem);
