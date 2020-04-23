/**
 * Config file for database
 * @module Config_database
 * @requires dotenv
 */

require('dotenv').config();

module.exports = {
  /**
     * Development database variables
     * @type {Object}
     */
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
};
