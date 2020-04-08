import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import EditButton from './elements/EditButton';
import InputWig from './elements/editMode/InputWig';

const Wig = props => {
  const { nps, editMode } = props;
  const { current, description, goal, targetDate } = nps;
  const currentInt = parseInt(current, 10);
  const goalInt = parseInt(goal, 10);
  const progress = currentInt && goalInt ? (currentInt / goalInt) * 100 : 0;
  const [isEditingWig, setIsEditingWig] = useState(false);

  const setColorBasedOnProgress = score => {
    if (score > 70) {
      return '#28a745';
    }
    if (score > 50) {
      return '#ffc107';
    }
    return '#dc3545';
  };

  const ChartLabelContainerStyle = {
    position: 'absolute',
    top: 40,
    left: 50,
    right: 50,
    bottom: 50,
    padding: '0px'
  };

  const LabelText = {
    display: 'block',
    fontSize: '1em'
  };
  const LabelValue = {
    display: 'block',
    fontSize: '2em',
    color: setColorBasedOnProgress(progress)
  };

  const CircularProgressBar = withStyles({
    root: {
      position: 'relative',
      color: setColorBasedOnProgress(progress),
      border: '2px solid black',
      borderRadius: '50%',
      borderColor: 'gray',
      padding: '5px'
    }
  })(CircularProgress);

  const onClickEdit = e => {
    e.preventDefault();
    setIsEditingWig(true);
  };

  return (
    <div className="mt-3">
      <h2>
        WIG
        {editMode && <EditButton onClick={onClickEdit} />}
      </h2>
      {!isEditingWig ? (
        <div>
          <h3 className="wig__statement">{description}</h3>
          <div style={{ position: 'relative' }}>
            <CircularProgressBar size={150} thickness={5} variant="static" value={progress} />
            <div style={ChartLabelContainerStyle}>
              <span style={LabelText}>NPS</span>
              <span style={LabelValue}>{current}</span>
            </div>
          </div>
        </div>
      ) : (
        <InputWig
          current={current}
          goal={goal}
          targetDate={targetDate}
          setIsEditingWig={setIsEditingWig}
        />
      )}
    </div>
  );
};

Wig.defaultProps = {
  nps: {}
};

Wig.propTypes = {
  editMode: PropTypes.bool.isRequired,
  nps: PropTypes.shape({
    description: PropTypes.string,
    current: PropTypes.number,
    goal: PropTypes.number,
    targetDate: PropTypes.string,
    defineClients: PropTypes.string,
    defineText: PropTypes.string,
    implementText: PropTypes.string
  })
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(Wig);
