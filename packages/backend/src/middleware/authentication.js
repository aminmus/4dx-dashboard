/**
 * Authentication middlware
 * @module Middleware_authentication
 * @requires passport
 * @requires passport-local
 * @requires passport-jwt
 * @requires ../models/user
 */

/**
 * passport module
 * @type {Object}
 */
const passport = require('passport');

/**
 * @name passport-local
 * @typedef {module}
 * @property {Object} Strategy JWT strategy
 * @property {Object} Strategy.LocalStrategy Local JWT strategy
 */
const { Strategy: LocalStrategy } = require('passport-local');

/**
 * @name passport-jwt
 * @typedef {module} passportJwt
 * @property {Object} Strategy JWT strategy
 * @property {Object} Strategy.JwtStrategy JWT strategy
 * @property {Object} Strategy.ExtractJwt Extract JWT token from headers
 */
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

/**
 * User Model
 * @const
 */
const { User } = require('../models');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const [user, isCreated] = await User.findOrCreate({
          where: { email },
          defaults: { email, password },
        });

        if (!isCreated && user) {
          return done(null, false, {
            message: 'User already exists',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, {
            message: 'Invalid email or password',
          });
        }

        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
          return done(null, false, {
            message: 'Invalid email or password',
          });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

/**
 * Middleware to check authentication of JTW token using passport
 * @function
 * @memberof module:Middleware_authentication
 */
const checkAuth = passport.authenticate('jwt', { session: false });

module.exports = { checkAuth };
