'use strict';

const { Router } = require('express');

const Account = require('../models/account');
const userAccount = require('../models/userAccount');

const router = new Router();

const RouteGuard = require("./../middleware/route-guard");

router.post('/create-account', (req, res, next) => {
  const { balance, type, accountNumber, userID } = req.body;
  const balanceNumber = Number(balance);

  Account.create({
    accountNumber,
    type,
    balance: balanceNumber
  })
  .then(account => {
    const accountID = account._id;

    userAccount.create({
      userID,
      accountID
    })
    .then(newUserAccount => {
      console.log(newUserAccount);
    })
    .catch(error => next(error));

    res.json({account});
  })
  .catch(error => {
    next(error);
  });
});

router.post('/', RouteGuard, (req, res, next) => {
  Account.findOne()
    .then(document => {
      res.json({ document });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', RouteGuard, (req, res, next) => {
  const id = req.params.id;
  
  Account.findById(id)
    .then(account => {
      res.json({ account });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
