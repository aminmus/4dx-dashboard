import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';
import EditButton from './elements/EditButton';
import InputNps from './elements/editMode/InputNps';
import { addResource, updateResource } from '../slices/resources';
import AddNewResourceButton from './elements/editMode/AddNewResourceButton';

import COLORS from '../style/COLORS';

const { success, warning, danger } = COLORS;

/**
 * WIG component
 *
 * @component
 * @param {Object} props Component props
 * @param {Object[]} props.nps Array of Nps resource objects
 * @param {Boolean} props.editMode Is user editing resource
 * @param {Function} props.dispatch Redux store dispatch
 */
const Wig = ({ nps, editMode, dispatch }) => {
  const [latestNps, setLatestNps] = useState();
  const [progress, setProgress] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const setColorBasedOnProgress = score => {
    if (score > 70) {
      return success;
    }
    if (score > 50) {
      return warning;
    }
    return danger;
  };

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    mainContainer: {
      padding: '10px'
    },
    chartLabelContainer: {
      position: 'absolute',
      top: 40,
      left: 50,
      right: 50,
      bottom: 50,
      padding: '0px'
    },
    labelText: {
      display: 'block'
    },
    labelValue: { display: 'block', color: setColorBasedOnProgress(progress) },
    circularProgressContainer: {
      textAlign: 'center',
      position: 'relative'
    },
    addNpsContainer: {
      textAlign: 'center'
    },
    statementContainer: {
      margin: '10px'
    }
  });

  const classes = useStyles();
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
        currentNps: parseInt(currentNps, 10),
        goalNps: parseInt(goalNps, 10),
        date,
        targetDate
      }
    };
    dispatch(updateResource(data));
    setIsLoadingNps(true);
    setIsEditing(false);
  };

  const addNps = (id, { currentNps, goalNps, date, targetDate }, event) => {
    event.preventDefault();
    const data = {
      id,
      type: 'nps',
      data: {
        currentNps: parseInt(currentNps, 10),
        goalNps: parseInt(goalNps, 10),
        date,
        targetDate
      }
    };
    dispatch(addResource(data));
    setIsLoadingNps(true);
    setIsAdding(false);
  };

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
    <div className={classes.mainContainer}>
      {latestNps && (
        <>
          <div>
            <Typography variant="h3">
              WIG
              {editMode && <EditButton onClick={onClickEdit} />}
            </Typography>
          </div>
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
            <>
              <div className={classes.statementContainer}>
                {latestNps.goalNps && latestNps.targetDate && (
                  <Typography variant="h5" className="wig__statement">
                    {`From ${latestNps.currentNps} NPS to ${latestNps.goalNps} by ${latestNps.targetDate}`}
                  </Typography>
                )}
              </div>
              <div className={classes.circularProgressContainer}>
                <CircularProgressBar
                  size={150}
                  thickness={isLoadingNps ? 1 : 5}
                  variant={isLoadingNps ? 'indeterminate' : 'static'}
                  value={progress}
                />
                <div className={classes.chartLabelContainer}>
                  <Typography variant="h5" className={classes.labelText}>
                    NPS
                  </Typography>
                  <Typography variant="h4" className={classes.labelValue}>
                    {latestNps.currentNps}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {editMode && (
        <div className={classes.addNpsContainer}>
          {isAdding ? (
            <InputNps handleSubmit={addNps} setIsAddingOrEditing={setIsAdding} />
          ) : (
            <AddNewResourceButton buttonText="Add New NPS Data" setIsEditing={setIsEditing} />
          )}
        </div>
      )}
    </div>
  );
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
  ).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(Wig);
