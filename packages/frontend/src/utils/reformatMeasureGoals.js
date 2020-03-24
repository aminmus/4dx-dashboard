export default measureGoals => {
  const measureGoalEntries = measureGoals.data.map(entry => entry.attributes);

  const latestMeasureGoalEntry = measureGoalEntries.reduce((currentEntry, nextEntry) => {
    return currentEntry.date > nextEntry.date ? currentEntry : nextEntry;
  });

  return {
    targetMeasures: latestMeasureGoalEntry['measures-amount'],
    targetDate: latestMeasureGoalEntry['target-date']
  };
};
