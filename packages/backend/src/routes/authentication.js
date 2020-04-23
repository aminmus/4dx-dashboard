/** Authentication routes
 * @module Router/authentication
 * @requires express
 * @requires ../controllers/authentication
 */

const router = require('express').Router();
const { signup, login } = require('../controllers/authentication');

/**
 * Sign Up User
 *
 * @name SignUp
 * @route {POST} /api/signup
 * @bodyparam {String} email must be unique
 * @bodyparam {String} password user password
 */
router.post('/signup', signup);

/**
 * Log In User
 *
 * @name Login
 * @route {POST} /api/login
 * @bodyparam {String} email must be unique
 * @bodyparam {String} password user password
 */
router.post('/login', login);

module.exports = router;
