'use strict';

const { Router } = require('express');

const Account = require('../models/account');
const UserAccount = require('../models/userAccount');
const Card = require('../models/card');
const Transaction = require('../models/transaction');

const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

// Displays all the accounts
router.get('/', RouteGuard, (req, res, next) => {
  Account.find()
    .then(accounts => {
      res.json({ accounts });
    })
    .catch(error => {
      next(error);
    });
});

// Displays a account using the ID
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

// When user is signing up this creates their first account
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

      UserAccount.create({
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

// When user is logged in they can add another account
router.post('/add-account', RouteGuard, (req, res, next) => {
  const { balance, type, accountNumber, userID } = req.body;
  const balanceNumber = Number(balance);

  Account.create({
    accountNumber,
    type,
    balance: balanceNumber
  })
    .then(account => {
      const accountID = account._id;

      UserAccount.create({
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

// Returning all ID's of the accounts of the user
router.get('/:userID/user-accounts', RouteGuard, (req, res, next) => {
  const userID = req.params.userID;

  UserAccount.find({
    userID: userID
  })
    .select({ accountID: 1, _id: 0 })
    .then(accounts => {
      res.json({ accounts });
    })
    .catch(error => {
      next(error);
    });
});

// Get all the accounts from the user logged in
router.get('/:userID/accounts', RouteGuard, (req, res, next) => {
  const userID = req.params.userID;

  UserAccount.find({
    userID: userID
  })
    .populate('accountID')
    .then(accounts => {
      const accountsUser = accounts.map(account => account.accountID);
      res.json({ accountsUser });
    })
    .catch(error => {
      next(error);
    });
});

// Deletes specific account using the ID
router.post('/:id/delete-account', RouteGuard, (req, res, next) => {
  const id = req.params.id;
  let accountNumber = '';

  Account.findByIdAndRemove(id)
    .then((account) => {
      accountNumber = account.accountNumber;
      UserAccount.findOneAndRemove({
        accountID: id
      })
      .then(() => {})
      .catch(error => {
        next(error);
      });

      Card.findOneAndRemove({
        accountID: id
      })
      .then(() => {})
      .catch(error => {
        next(error);
      });

      /*Transaction.findAndUpdate({
        accountIDFrom: id
      },
      {
        accountIDFrom: id
      })
      .then()
      .catch(error => {
        console.log(error);
      });

      Transaction.findAndUpdate({
        accountIDTo: id
      },
      {
        accountIDTo: id
      })
      .then()
      .catch(error => {
        console.log(error);
      });*/

      res.json({});
      
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
