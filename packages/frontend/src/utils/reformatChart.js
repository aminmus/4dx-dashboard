/*
* This module will sort through the nps data entries and do the following:
1) Sort the entries by dates (ascending)
2) Find occurances where two entries share the same year and month
3) Return only the latest of these entries (as this one is likely to be the most relevant)
4) Conver the date format of these entries into a "month year" format, eg "January 2020"
5) Select the latest five entries 
6) Separate the entries into a months and values array to match App-state format
*/

export default nps => {
  const npsEntries = nps.data.map(entry => {
    return {
      date: entry.attributes.date,
      nps: entry.attributes['current-nps'],
      goal: entry.attributes['goal-nps']
    };
  });

  // Sort array by ascending date
  npsEntries.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const cleanDateArray = [];

  /* 
  Compare previous entry and current entry's date.
  If they match skip, if they don't match add entry to new array
  */
  for (let i = 1; i <= npsEntries.length; i += 1) {
    if (i === npsEntries.length) {
      cleanDateArray.push(npsEntries[i - 1]);
    } else {
      let dateArrayCurrent = [];
      let dateArrayPrevious = [];
      dateArrayCurrent = npsEntries[i].date.split('-');
      dateArrayPrevious = npsEntries[i - 1].date.split('-');
      if (
        dateArrayCurrent[0] !== dateArrayPrevious[0] ||
        dateArrayCurrent[1] !== dateArrayPrevious[1]
      ) {
        cleanDateArray.push(npsEntries[i - 1]);
      }
    }
  }

  // Convert dates to Month-Year, for example "January 2019"
  const convertDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Apply conversion of dates
  const convertedArray = cleanDateArray.map(entry => {
    return { nps: entry.nps, date: convertDate(entry.date), goal: entry.goal };
  });

  const finalArray = convertedArray.length > 5 ? convertedArray.slice(1).slice(-5) : convertedArray;

  return {
    months: finalArray.map(entry => entry.date),
    values: finalArray.map(entry => entry.nps),
    target: finalArray.slice(-1)[0].goal
  };
};
