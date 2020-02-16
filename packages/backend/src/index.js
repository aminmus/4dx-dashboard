const express = require('express');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

const tryDbConnection = require('./utils/tryDbConnection');
const routes = require('./routes');
const db = require('../models');

const startServer = async () => {
  await tryDbConnection();

  // Sync Database
  try {
    console.log('Trying to sync models to database...');
    await db.sequelize.sync();
    console.log('Database sync completed');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());
  app.use(passport.initialize());

  app.use('/api', routes);

  // Handle errors
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.log(err);
    res.json({ error: err });
  });

  app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}!`));
};

startServer();
