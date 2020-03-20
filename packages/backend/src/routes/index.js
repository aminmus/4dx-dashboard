const router = require('express').Router();

const measures = require('./measures');
const measureGoals = require('./measureGoals');
const clients = require('./clients');
const users = require('./users');
const csat = require('./csat');
const auth = require('./authentication');
const nps = require('./nps');

// Authentication required for these routes
router.use('/measures', measures);
router.use('/measureGoals', measureGoals);
router.use('/clients', clients);
router.use('/users', users);
router.use('/csat', csat);
router.use('/nps', nps);

// Sign up and sign in routes
router.use('/auth', auth);

module.exports = router;
