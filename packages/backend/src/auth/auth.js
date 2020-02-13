const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../../models/user');

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await UserModel.create({ email, password });
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
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return done(null, false, { message: 'User not found' });

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) return done(null, false, { message: 'Invalid password' });

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));
