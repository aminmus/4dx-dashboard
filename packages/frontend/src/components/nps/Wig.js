import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditButton from '../elements/EditButton';
import InputNps from './InputNps';
import { addResource, updateResource } from '../../slices/resources';
import COLORS from '../../style/COLORS';

const { primary, lightGray } = COLORS;

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
      return '#28a745';
    }
    if (score > 50) {
      return '#ffc107';
    }
    return '#dc3545';
  };

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    mainContainer: {
      paddingTop: '10px'
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
      display: 'block',
      fontSize: '1em'
    },
    labelValue: { display: 'block', fontSize: '2em', color: setColorBasedOnProgress(progress) },
    circularProgressContainer: {
      position: 'relative'
    },
    addNpsContainer: {
      marginTop: '10px'
    },
    addNpsBtn: {
      padding: '0',
      margin: 'auto',
      opacity: 0.5,
      '&:hover': {
        backgroundColor: lightGray,
        opacity: 1
      }
    },
    addNpsIcon: {
      padding: '0',
      marginRight: '5px',
      color: primary
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
              {latestNps.goalNps && latestNps.targetDate && (
                <h3 className="wig__statement">{`From ${latestNps.currentNps} NPS to ${latestNps.goalNps} by ${latestNps.targetDate}`}</h3>
              )}
              <div className={classes.circularProgressContainer}>
                <>
                  <CircularProgressBar
                    size={150}
                    thickness={isLoadingNps ? 1 : 5}
                    variant={isLoadingNps ? 'indeterminate' : 'static'}
                    value={progress}
                  />
                  <div className={classes.chartLabelContainer}>
                    <span className={classes.labelText}>NPS</span>
                    <span className={classes.labelValue}>{latestNps.currentNps}</span>
                  </div>
                </>
              </div>
            </div>
          )}
        </>
      )}
      {editMode && (
        <div className={classes.addNpsContainer}>
          {isAdding ? (
            <InputNps handleSubmit={addNps} setIsAddingOrEditing={setIsAdding} />
          ) : (
            <Button onClick={() => setIsAdding(true)} className={classes.addNpsBtn}>
              <AddCircleIcon className={classes.addNpsIcon} />
              Add New NPS Data
            </Button>
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
