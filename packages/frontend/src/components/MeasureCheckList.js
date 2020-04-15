/* eslint-disable no-shadow, no-console */

import React from 'react';
import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import MeasureListItem from './MeasureListItem';

const MeasureCheckList = props => {
  const { measures } = props;

  return (
    <List>
      {measures.map(measure => {
        return <MeasureListItem measure={measure} key={`${measure.id}`} />;
      })}
    </List>
  );
};

MeasureCheckList.defaultProps = {
  measures: []
};

MeasureCheckList.propTypes = {
  measures: PropTypes.arrayOf(
    PropTypes.shape({
      success: PropTypes.string,
      description: PropTypes.string
    })
  )
};

export default MeasureCheckList;
