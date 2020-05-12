import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';
import EditButton from '../elements/EditButton';
import InputNps from './InputNps';
import { addResource, updateResource } from '../../slices/resources';
import COLORS from '../../style/COLORS';
import AddNewResourceButton from '../elements/editMode/AddNewResourceButton';

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
      padding: '0.2em',
      margin: '1em 0em'
    },
    chartLabelContainer: {
      position: 'absolute',
      top: 40,
      left: 50,
      right: 50,
      bottom: 50,
      padding: '0'
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
      margin: '0.2em'
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
    /** Since these values are not being reused in any other way than to
     * calculate the progress a value of 100 is added to account for possible
     * negative values (negative max is -100)
     */
    const currentInt = parseInt(latestNps?.currentNps, 10) + 100;
    const goalInt = parseInt(latestNps?.goalNps, 10) + 100;
    let npsProgress = 0;
    if (currentInt > goalInt || !goalInt) {
      npsProgress = 100;
    } else {
      npsProgress = currentInt && goalInt ? (currentInt / goalInt) * 100 : 0;
    }
    setProgress(npsProgress);
  }, [latestNps]);

  const editNps = data => {
    dispatch(updateResource(data));
    setIsLoadingNps(true);
    setIsEditing(false);
  };

  const addNps = data => {
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
      padding: '0.1em'
    }
  })(CircularProgress);

  const onClickEdit = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  const textDescription = ({ currentNps, goalNps, targetDate }) => {
    if ((currentNps < goalNps || currentNps > goalNps) && targetDate) {
      return `From ${currentNps} NPS to ${goalNps} by ${targetDate}`;
    }
    if (currentNps && !targetDate) {
      return `Current NPS ${currentNps} with no target set`;
    }
    return 'NA';
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
              handleResource={editNps}
            />
          ) : (
            <>
              <div className={classes.statementContainer}>
                <Typography variant="h5" className="wig__statement">
                  {textDescription(latestNps)}
                </Typography>
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
            <InputNps handleResource={addNps} setIsAddingOrEditing={setIsAdding} />
          ) : (
            <AddNewResourceButton buttonText="Add New NPS Data" setIsEditing={setIsAdding} />
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
