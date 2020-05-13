/** Mounting of Express server
 * @module Server
 * @requires Config_database
 * @requires Utils/tryDbConnection
 * @requires Router
 * @requires Model_database
 */

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const JSONAPIError = require('jsonapi-serializer').Error;

require('dotenv').config();

const tryDbConnection = require('./utils/tryDbConnection');
const routes = require('./routes');
const db = require('./models');

/**
 * Start Server
 * @function
 */
const startServer = async () => {
  await tryDbConnection();
  try {
    console.log('Trying to sync models to database...');
    await db.sequelize.sync();
    console.log('Database sync completed');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }

  const app = express();

  app.use(express.json({ type: 'application/vnd.api+json' }));
  app.use(express.urlencoded());
  app.use(cors());
  app.use(passport.initialize());

  app.use('/api', routes);

  app.use((error, _req, res, _next) => {
    res.status(error.status || 500);
    console.error(error);
    res.json(new JSONAPIError({ ...error, title: error.message }));
  });

  app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}!`));
};

startServer();
