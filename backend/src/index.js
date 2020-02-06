const express = require('express');

require('dotenv').config();

const app = express();

app.use('/api', require('./routes/nps'));

app.use('/', (_req, res) => {
  res.writeHead(200);
  res.end('Hello, World!\n');
});

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}!`));
