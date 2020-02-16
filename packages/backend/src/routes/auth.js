const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send(info);

    return res.json({
      message: 'Signup successful',
      user,
    });
  })(req, res, next);
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user) return res.status(400).json(info);

      // Sign and populate token
      const token = jwt.sign({ user: { id: user.id, email: user.email } }, process.env.JWT_SECRET, { expiresIn: '24h' });
      return res.json({ message: info.message, token });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
