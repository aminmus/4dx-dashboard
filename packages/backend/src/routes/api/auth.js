const router = require('express').Router();
const passport = require('passport');
// const jwt = require('jsonwebtoken');

router.post('signup', passport.authenticate('signup', { session: false }), async (req, res) => {
  res.json({
    message: 'Signup successful',
    user: req.user,
  });
});
