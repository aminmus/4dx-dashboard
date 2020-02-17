const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../models');

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { email, password },
    });

    if (!isCreated && user) return done(null, false, { message: 'User already exists' });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return done(null, false, { message: 'Invalid email or password' });

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) return done(null, false, { message: 'Invalid email or password' });

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));


// Verify token sent by user
passport.use(new JwtStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    return done(error);
  }
}));

// Auth middleware
const checkAuth = passport.authenticate('jwt', { session: false });

module.exports = { checkAuth };
