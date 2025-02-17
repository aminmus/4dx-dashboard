/**
 * Controller for Authentication Routes
 * @module Controllers_authentication
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * Authenticate and sign in user with passport
 * @function
 * @memberof module:Controllers_authentication
 * @param {Object} req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Express middleware.
 */
const signup = async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send(info);

    return res.json({
      message: 'Signup successful',
      user,
    });
  })(req, res, next);
};

/**
 * Authenticate and log in user with passport
 * @function
 * @memberof module:Controllers_authentication
 * @param {Object} req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Express middleware.
 */
const login = async (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    try {
      if (err) return next(err);

      const token = jwt.sign(
        { user: { id: user.id, email: user.email, role: user.role } },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
      );
      return res.json({ message: info.message, token });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports = { signup, login };
