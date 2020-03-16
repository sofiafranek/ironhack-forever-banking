'use strict';

const { Router } = require('express');
const router = new Router();

const Account = require('../models/account');

const RouteGuard = require('./../middleware/route-guard');

router.get('/activity', RouteGuard, (req, res, next) => {
  Account.find()
    .then(accounts => {
      res.json({ accounts });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
