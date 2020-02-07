const express = require('express');

require('dotenv').config();

const tryDbConnection = require('./utils/tryDbConnection');

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

  app.use('/api', require('./routes/client'));
  app.use('/api', require('./routes/user'));

  app.use('/', (_req, res) => {
    res.writeHead(200);
    res.end('Hello, World!\n');
  });

  app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}!`));
};

startServer();
