'use strict';

const { Router } = require('express');

const Account = require('../models/account');
const UserAccount = require('../models/userAccount');

const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

router.get('/', RouteGuard, (req, res, next) => {
  Account.find()
    .then(accounts => {
      res.json({ accounts });
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

      UserAccount
        .create({
          userID,
          accountID
        })
        .then(newUserAccount => {
          console.log(newUserAccount);
        })
        .catch(error => next(error));

      res.json({ account });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/add-account', RouteGuard, (req, res, next) => {
  const { balance, type, accountNumber, userID } = req.body;
  const balanceNumber = Number(balance);

  console.log(req.body);

  Account.create({
    accountNumber,
    type,
    balance: balanceNumber
  })
    .then(account => {
      const accountID = account._id;

      UserAccount
        .create({
          userID,
          accountID
        })
        .then(newUserAccount => {
          console.log(newUserAccount);
        })
        .catch(error => next(error));

      res.json({ account });
    })
    .catch(error => {
      next(error);
    });
});


router.get('/:userID/user-accounts', RouteGuard, (req, res, next) => {
  const userID = req.params.userID;

  UserAccount.find({
    userID: userID
  })
  .select({ "accountID": 1, "_id" : 0 })
  .then((accounts) => {
    console.log(accounts);
    res.json({ accounts });
  })
  .catch(error => {
    next(error);
  });
  
router.post('/delete-account', RouteGuard, (req, res, next) => {
  const id = req.params.id;

  Account.findById(id)
    .then(() => {
      console.log('deleteing account');
      res.json({});
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
