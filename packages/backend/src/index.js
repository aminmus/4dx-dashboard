/** Mounting of Express server
 * @module Server
 * @requires express
 * @requires cors
 * @requires passport
 * @requires jsonapi-serializer
 * @requires dotenv
 * @requires ./utils/tryDbConnection
 * @requires ./routes/index
 * @requires ./models/index
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * cors module
 * @const
 */
const cors = require('cors');

/**
 * passport module
 * @const
 */
const passport = require('passport');

/**
 * JSONAPI Error serializer module
 * @const
 */
const JSONAPIError = require('jsonapi-serializer').Error;

require('dotenv').config();

/**
 * tryDbConnection Util
 * @const
 */
const tryDbConnection = require('./utils/tryDbConnection');

/**
 * routes
 * @const
 */
const routes = require('./routes');

/**
 * database connection object
 * @const
 */
const db = require('./models');

/**
 * Start Server
 * @function
 * @memberof module:Server
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

  /**
   * API base paths
   * In order to use react-admin on the 4DX frontend on a sub-path to the rest of the frontend site,
   * react-admin requires the api routes to be on the same path.
   * Therefore we have two endpoints for the same routes as a workaround for react-admin.
   * I.e. if react-admin is on  "$FRONTEND_PATH/admin", then it will
   * use the API base path of "$BACKEND_PATH/api/admin"
   */
  app.use('/api', routes);
  app.use('/api/admin', routes);

  app.use((error, _req, res, _next) => {
    res.status(error.status || 500);
    console.error(error);
    res.json(new JSONAPIError({ ...error, title: error.message }));
  });

  app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}!`));
};

startServer();
