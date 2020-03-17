'use strict';

const { Router } = require('express');
const router = new Router();
const UserAccount = require('./../models/userAccount');
const Card = require('./../models/card');

const RouteGuard = require('./../middleware/route-guard');

// Populating the activity page with accounts
router.get('/:userID/activity', RouteGuard, (req, res, next) => {
  const { userID } = req.params;
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

// Returning data for the summary page on sign up
router.get('/:userID/summary', (req, res, next) => {
  const userID = req.params.userID;
  const information = new Object();

  UserAccount.findOne({
    userID: userID
  })
    .populate('accountID')
    .then(account => {
      information.account = account;
      Card.findOne({
        userID: userID
      })
        .then(card => {
          information.card = card;
          res.json({ information });
        })
        .catch(error => {
          next(error);
        });
    });
});

module.exports = router;
