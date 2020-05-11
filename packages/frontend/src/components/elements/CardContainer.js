import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import OptionsButton from './OptionsButton';
import COLORS from '../../style/COLORS';

const { dark, primary } = COLORS;

const StyledCard = withStyles({
  root: {
    border: `1px solid ${primary}`,
    marginTop: '0.5em'
  }
})(Card);

const StyledCardActions = withStyles({
  root: {
    backgroundColor: dark
  }
})(CardActions);

/**
 * Card Container for resource input
 * @component
 * @param {Object} props Component props
 * @param {Object} props.formData Form input values
 * @param {Function} props.handleSubmit Form submission
 * @param {Function} props.setIsEditing Setting isEditing state property
 * @param {Boolean} props.validationError Is there a validation error
 * @param {Object} props.children Child component
 */
const CardContainer = ({ formData, handleSubmit, setIsEditing, validationError, children }) => {
  return (
    <StyledCard>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <CardContent>{children}</CardContent>
        <StyledCardActions>
          <OptionsButton disabled={validationError} type="submit" text="Save" />
          <OptionsButton text="Cancel" onClick={() => setIsEditing(false)} />
        </StyledCardActions>
      </form>
    </StyledCard>
  );
};

CardContainer.propTypes = {
  formData: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  setIsEditing: PropTypes.func.isRequired,
  validationError: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CardContainer;
