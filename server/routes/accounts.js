'use strict';

const { Router } = require('express');

const Account = require('../models/account');
const UserAccount = require('../models/userAccount');
const Card = require('../models/card');
const Transaction = require('../models/transaction');

const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

// Displays all the accounts
router.get('/', RouteGuard, async (req, res, next) => {
  try {
    const accounts = await Account.getAccounts();
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
});

// Displays a account using the ID
router.get('/:id', RouteGuard, async (req, res, next) => {
  const id = req.params.id;
  try {
    const account = Account.getAccountById(id);
    res.json({ account });
  } catch (error) {
    next(error);
  }
});

// When user is signing up this creates their first account
router.post('/create-account', async (req, res, next) => {
  const { balance, type, accountNumber, userID } = req.body;
  const balanceNumber = Number(balance);

  try {
    const account = await Account.createAccount(accountNumber, type, balanceNumber);
    console.log(account);
    const accountID = account._id;
    await UserAccount.createUserAccount(userID, accountID);
    res.json({ account });
  } 
  catch (error) {
    console.log(error);
    next(error);
  }
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
router.get('/:userID/accounts', RouteGuard, async (req, res, next) => { 
    const userID = req.params.userID;
    try {
      const accounts = await UserAccount.getUserAccounts(userID);
      const accountsUser = accounts.map(account => account.accountID);
      res.json({ accountsUser });
    }    
    catch (error) {
      next(error);
    }
});

// Deletes specific account using the ID
router.post('/:id/delete-account', RouteGuard, async (req, res, next) => {
  const idAccount = req.params.id;
  try {
    await Account.removeAccount(idAccount);
    await UserAccount.removeAccount(idAccount);
    await Card.removeCard(idAccount);  
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
