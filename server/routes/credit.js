'use strict';

const { Router } = require('express');

const Credit = require('./../database/models/credit');
const UserAccount = require('./../database/models/userAccount');

const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

// Displays all the credit accounts
router.get('/', RouteGuard, async (req, res, next) => {
  try {
    const credit = await Credit.getCreditAccounts();
    res.json({ credit });
  } catch (error) {
    next(error);
  }
});

// Get all the credit accounts from the user logged in
router.get('/:userID/accounts', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const accounts = await Credit.getCreditAccounts(userID);
    const accountsUser = accounts.map(account => account.accountID);
    res.json({ accountsUser });
  } catch (error) {
    next(error);
  }
});

// When user applys for credit we create the credit account
router.post('/apply-for-credit', RouteGuard, async (req, res, next) => {
  const { accountNumber, balance, type, primary } = req.body;
  const balanceNumber = Number(balance);

  try {
    const account = await Credit.createCreditAccount(accountNumber, type, balanceNumber);

    console.log(account, 'ACCOUNT CREATED CREDIT');

    const accountID = account._id;
    const userID = account.userID;

    console.log(primary, 'PRIMARYYY');

    await UserAccount.createUserAccount(userID, accountID, primary);

    res.json({ account });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
