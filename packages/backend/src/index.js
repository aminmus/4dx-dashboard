const express = require('express');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

const tryDbConnection = require('./utils/tryDbConnection');
const clients = require('./routes/api/clients');
const measure = require('./routes/api/measure');
const csat = require('./routes/api/csat');
const user = require('./routes/api/user');
const nps = require('./routes/api/nps');
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

  app.use('/api', measure);
  app.use('/api', clients);
  app.use('/api', csat);
  app.use('/api', nps);
  app.use('/api', user);

  app.use('/', (_req, res) => {
    res.writeHead(200);
    res.end('Hello, World!\n');
  });

  app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}!`));
};

startServer();
