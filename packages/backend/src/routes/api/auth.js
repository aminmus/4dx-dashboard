const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res) => {
  res.json({
    message: 'Signup successful',
    user: req.user,
  });
});


router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) return next(err);

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        //Sign and populate token
        const token = jwt.sign({ user: { id: user.id, email: user.email } }, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});