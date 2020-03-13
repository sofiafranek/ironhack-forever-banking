'use strict';

const { Router } = require('express');

const Account = require('../models/account');

const router = new Router();

router.post('/', (req, res, next) => {
  console.log(req.body);
  // let account;
  Account.findOne()
    .then(document => {
      console.log(document);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id', (req, res, next) => {
  console.log(req.body);
  // let account;
  Account.findOne()
    .then(document => {
      console.log(document);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
