'use strict';

const { Router } = require('express');
const router = new Router();
const UserAccount = require('./../database/models/userAccount');
const Card = require('./../database/models/card');
const Transaction = require('./../database/models/transaction');
const Credit = require('./../database/models/credit');

const RouteGuard = require('./../middleware/route-guard');

// Populating the activity page with accounts
router.get('/:userID/activity', RouteGuard, async (req, res, next) => {
  const { userID } = req.params;
  const activity = new Object();

  try {
    const accounts = await UserAccount.getUserActiveAccounts(userID);

    const credits = await Credit.getCreditAccounts(userID);
    const allAccounts = await UserAccount.getUserAllAccounts(userID);
    const allAccountsIDs = allAccounts.map(account => account.accountID);
    const creditsID = credits.map(credit => credit._id);

    const transactionsAccF = await Transaction.getReceivedTransactions(allAccountsIDs);
    const transactionsCreditF = await Transaction.getReceivedTransactionsCredit(creditsID);
    const transactionsTo = transactionsAccF.concat(transactionsCreditF);
    const transactionsAccT = await Transaction.getSentTransactions(allAccountsIDs);
    const transactionsCreditT = await Transaction.getSentTransactionsCredit(creditsID);
    const transactionsFrom = transactionsAccT.concat(transactionsCreditT);

    activity.accountsUser = accounts;
    activity.transactionsTo = transactionsTo;
    activity.transactionsFrom = transactionsFrom;
    activity.credits = credits;
    
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
