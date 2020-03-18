/* eslint-disable no-unused-vars, no-plusplus, no-console */
import moment from 'moment';

export default function() {
  const measures = [
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-01-10' },
    { sucessDate: '2020-02-11' },
    { sucessDate: '2020-03-10' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-02-05' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-01-10' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-01-10' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2019-02-10' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-05-10' },
    { sucessDate: '2020-02-10' },
    { sucessDate: '2020-06-10' },
    { sucessDate: '2020-07-10' }
  ];

  // 1. FETCH ALL THE MEASURES ARRANGE INTO "ARRAY",  OF DATES
  const dateArray = measures.map(entry => moment(entry.sucessDate));

  // 2. GET THE CURRENT DATE
  const currentDate = moment();

  // 3. CREATE A DATE INTERVAL (7 DAYS PER INCREMENT FROM CURRENT DATE)
  const dateInterval = [];
  for (let i = 0; i <= 5; i++) {
    dateInterval.push({
      date: currentDate.subtract(7, 'd').format('YYYY-MM-DD'),
      measuresCompleted: null
    });
  }

  console.log(dateInterval);

  // 4. POPULATE DATE INTERVAL OBJECTS WITH MEASURES COMPLETED
  // FILTER AWAY ARRAY VALUES THAT COME AFTER DATE
  // DO AN ARRAY LENGTH ON THIS EXISTING ARRAY TO GET MEASURES
  // POPULATE USING MAP OVER ARRAY OF OBJECTS
}
