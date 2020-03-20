'use strict';

const { Router } = require('express');

const Credit = require('./../database/models/credit');
// const UserAccount = require('./../database/models/userAccount');

const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

// Returning a credit from the ID
router.get('/:id', RouteGuard, async (req, res, next) => {
  const id = req.params.id;
  try {
    const credit = await Credit.getCreditAccountById(id);
    res.json({ credit });
  } catch (error) {
    next(error);
  }
});

// Get all the credit accounts from the user logged in
router.get('/:userID/credit', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const accounts = await Credit.getCreditAccounts(userID);
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
});

// When user applys for credit we create the credit account
router.post('/apply-for-credit', RouteGuard, async (req, res, next) => {
  const { accountNumber, balance, type, userID } = req.body;
  const balanceNumber = Number(balance);

  try {
    const account = await Credit.createCreditAccount(accountNumber, type, balanceNumber, userID);
    res.json({ account });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
