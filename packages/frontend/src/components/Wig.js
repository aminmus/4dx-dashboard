import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
import EditButton from './elements/EditButton';
import InputNps from './elements/editMode/InputNps';
import { addResource, updateResource } from '../slices/resources';

const Wig = ({ nps, editMode, dispatch }) => {
  const [latestNps, setLatestNps] = useState();
  const [progress, setProgress] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingNps, setIsLoadingNps] = useState(false);
  useEffect(() => {
    if (nps.length > 0) {
      setLatestNps(
        nps.reduce((r, a) => {
          return r.date > a.date ? r : a;
        })
      );
    }
    setIsLoadingNps(false);
  }, [nps]);

  useEffect(() => {
    const currentInt = parseInt(latestNps?.currentNps, 10);
    const goalInt = parseInt(latestNps?.goalNps, 10);
    const npsProgress = currentInt && goalInt ? (currentInt / goalInt) * 100 : 0;
    setProgress(npsProgress > 100 ? 100 : npsProgress);
  }, [latestNps]);

  const editNps = (id, { currentNps, goalNps, date, targetDate }, event) => {
    event.preventDefault();
    const data = {
      id,
      type: 'nps',
      data: {
        currentNps,
        goalNps,
        date,
        targetDate
      }
    };
    dispatch(updateResource(data));
    setIsLoadingNps(true);
    setIsEditing(false);
  };

  const addNps = (id, input, event) => {
    event.preventDefault();
    const data = {
      id,
      type: 'nps',
      data: {
        ...input
      }
    };
    dispatch(addResource(data));
    setIsLoadingNps(true);
    setIsAdding(false);
  };

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

  // Used for showing NPS progress circle and as loading indicator
  const CircularProgressBar = withStyles({
    root: {
      position: 'relative',
      color: isLoadingNps ? undefined : setColorBasedOnProgress(progress),
      border: '2px solid black',
      borderRadius: '50%',
      borderColor: 'gray',
      padding: '5px'
    }
  })(CircularProgress);

  const onClickEdit = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <div className="mt-3">
      {latestNps && (
        <>
          <h2>
            WIG
            {editMode && <EditButton onClick={onClickEdit} />}
          </h2>
          {isEditing && editMode ? (
            <InputNps
              id={latestNps.id}
              current={latestNps.currentNps}
              goal={latestNps.goalNps}
              targetDate={latestNps.targetDate}
              setIsAddingOrEditing={setIsEditing}
              handleSubmit={editNps}
            />
          ) : (
            <div>
              <h3 className="wig__statement">{`From ${latestNps.currentNps} NPS to ${latestNps.goalNps} by ${latestNps.targetDate}`}</h3>
              <div style={{ position: 'relative' }}>
                <>
                  <CircularProgressBar
                    size={150}
                    thickness={isLoadingNps ? 1 : 5}
                    variant={isLoadingNps ? 'indeterminate' : 'static'}
                    value={progress}
                  />
                  <div style={ChartLabelContainerStyle}>
                    <span style={LabelText}>NPS</span>
                    <span style={LabelValue}>{latestNps.currentNps}</span>
                  </div>
                </>
              </div>
            </div>
          )}
        </>
      )}
      {editMode && (
        <div className="mt-2">
          {isAdding ? (
            <InputNps handleSubmit={addNps} setIsAddingOrEditing={setIsAdding} />
          ) : (
            <Button onClick={() => setIsAdding(true)} className="px-0 mx-auto">
              <AddCircleIcon className="mr-2 text-warning" />
              Add New NPS Data
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

Wig.defaultProps = {
  nps: []
};

Wig.propTypes = {
  editMode: PropTypes.bool.isRequired,
  nps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      currentNps: PropTypes.number,
      goalNps: PropTypes.number,
      date: PropTypes.string,
      targetDate: PropTypes.string
    })
  ),
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(Wig);
