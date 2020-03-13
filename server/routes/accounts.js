'use strict';

const { Router } = require('express');

const Account = require('../models/account');
const userAccount = require('../models/userAccount');

const router = new Router();

router.post('/', (req, res, next) => {
  console.log(req.body);
  Account.findOne()
    .then(document => {
      console.log(document);
      res.json({ document });
    })
    .catch(error => {
      next(error);
    });
});

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
