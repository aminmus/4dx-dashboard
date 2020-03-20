export default measureGoals => {
  const measureGoalEntries = measureGoals.data.map(entry => entry.attributes);

  const latestMeasureGoalEntry = measureGoalEntries.reduce((r, a) => {
    return r.date > a.date ? r : a;
  });

  return {
    targetMeasures: latestMeasureGoalEntry['measures-amount'],
    targetDate: latestMeasureGoalEntry['target-date']
  };
};
