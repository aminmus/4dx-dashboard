import React from 'react';
import { List, ListItem } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';

export default function MeasureCheckList(props) {
  const { measures } = props;
  return (
    <List>
      {measures.map(measure => {
        return (
          <ListItem button key={measure.id} className="text-light">
            {measure.success ? (
              <CheckCircleIcon className="mr-2 text-success" />
            ) : (
              <CancelIcon className="mr-2 text-danger" />
            )}
            {measure.description}
          </ListItem>
        );
      })}
    </List>
  );
}

MeasureCheckList.defaultProps = {
  measures: []
};

MeasureCheckList.propTypes = {
  measures: PropTypes.arrayOf(
    PropTypes.shape({
      success: PropTypes.bool,
      description: PropTypes.string
    })
  )
};
