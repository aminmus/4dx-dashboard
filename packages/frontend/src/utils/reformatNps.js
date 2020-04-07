export default nps => {
  const npsEntries = nps.map(entry => entry.attributes);

  const latestNps = npsEntries.reduce((r, a) => {
    return r.date > a.date ? r : a;
  });

  return {
    description: `From ${latestNps['current-nps']} NPS to ${latestNps['goal-nps']} by ${latestNps['target-date']}`,
    current: latestNps['current-nps'],
    goal: latestNps['goal-nps'],
    targetDate: latestNps['target-date'],
    defineText: 'Define the Success factors for listed clients',
    implementText: 'Implement Client Success Program for listed clients'
  };
};
