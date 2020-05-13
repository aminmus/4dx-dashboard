/**
 * @module Utils/tryDbConnection
 * @requires Model_database
 */

/**
 * Database connection object
 * @const
 * @type {Object}
 */
const db = require('../models/index');

/**
 * Will try to establish database connection with a total of 5 retries in 5 second intervals
 * and console log a message that connection is established upon succes or an error upon fail
 * @function
 */
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
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

module.exports = tryDbConnection;
