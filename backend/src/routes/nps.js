const express = require('express');

const app = express();
const port = 4000;

app.use('/api', require('./routes/nps'));

app.use('/', (_req, res) => {
  res.writeHead(200);
  res.end('Hello, World!\n');
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
