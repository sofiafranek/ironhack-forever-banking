'use strict';

const { Router } = require('express');
const router = new Router();
const UserAccount = require('./../models/userAccount');
const Card = require('./../models/card');
const Transaction = require('./../models/transaction');

const RouteGuard = require('./../middleware/route-guard');

// Populating the activity page with accounts
router.get('/:userID/activity', RouteGuard, async (req, res, next) => {
  const { userID } = req.params;
  const activity = new Object();

  try {
    const accounts = await UserAccount.getUserAccounts(userID);
    const accountsUser = accounts.map(account => account._id);
    activity.accountsUser = accountsUser;
    const transactions = await Transaction.getAllTransactions(accountsUser);
    activity.transactions = transactions;
    res.json({ activity });
  } catch (error) {
    next(error);
  }
});

// Returning data for the summary page on sign up
router.get('/:userID/summary', async (req, res, next) => {
  const userID = req.params.userID;
  const information = new Object();
  
  try {
    const account = await UserAccount.getUserAccount(userID);
    information.account = account;
    const card = await Card.getUserCard(userID);
    information.card = card;
    res.json({ information });
  } catch (error) {
    next(error);
  }

});

module.exports = router;
