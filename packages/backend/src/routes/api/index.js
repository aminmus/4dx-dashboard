const router = require('express').Router();

const measures = require('./measures');
const clients = require('./clients');
const users = require('./users');
const csat = require('./csat');
const nps = require('./nps');

router.use([measures, clients, users, csat, nps]);

module.exports = router;
