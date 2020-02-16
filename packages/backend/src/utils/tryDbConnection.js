const db = require('../models/index');

const tryDbConnection = async () => {
  let retries = 5;
  while (retries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await db.sequelize.authenticate();
      console.log('Established connecion to database');
      break;
    } catch (err) {
      retries -= 1;
      console.log(err);
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

module.exports = tryDbConnection;
