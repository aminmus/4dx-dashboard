/** Express Router providing routes
 * @module Router
 * @requires Router/measures
 * @requires Router/measure_goals
 * @requires Router/clients
 * @requires Router/users
 * @requires Router/csat
 * @requires Router/authentication
 * @requires Router/nps
 */

/**
 * Express router to mount user related functions on.
 * @type {Object}
 * @const
 */
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
