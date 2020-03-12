'use strict';

const { Router } = require('express');

const passport = require('passport');

const router = new Router();

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/private',
    failureRedirect: '/signup'
  })
);

router.post(
  '/sign-in',
  passport.authenticate('local-signin', {
    successRedirect: '/private',
    failureRedirect: '/signin'
  })
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.json({});
});

module.exports = router;
