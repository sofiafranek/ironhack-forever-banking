'use strict';

const { Router } = require('express');

const Account = require('./../database/models/account');
const UserAccount = require('./../database/models/userAccount');
const Card = require('./../database/models/card');
const User = require('./../database/models/user');

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
router.post('/create-account-external', async (req, res, next) => {
  const {
    balance,
    type,
    accountNumber,
    userID,
    sharedAccount,
    sharedUser,
    primary,
    currency
  } = req.body;
  const balanceNumber = Number(balance);
  const balanceDecimal = balanceNumber.toFixed(2);

  try {
    const account = await Account.createAccount(
      accountNumber,
      type,
      balanceDecimal,
      sharedAccount,
      currency
    );
    const accountID = account._id;
    await UserAccount.createUserAccount(userID, accountID, primary);

    if (sharedAccount) {
      const sharedAccountUser = await User.getUserByPhoneNumber(sharedUser);
      const sharedUserID = sharedAccountUser._id;
      const userName = sharedAccountUser.name;

      if (sharedAccountUser) {
        await UserAccount.createUserAccount(sharedAccountUser, accountID, primary);
        res.json({ result: true, sharedUserID, userName });
      } else {
        res.json({ result: false, message: 2 });
      }
    } else {
      res.json({ result: true, type, accountID });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/create-account-internal', async (req, res, next) => {
  console.log(req.body);
  const {
    accountIDFrom,
    balance,
    type,
    accountNumber,
    userID,
    sharedAccount,
    sharedUser,
    primary,
    currency
  } = req.body;

  const balanceNumber = Number(balance);
  const balanceDecimal = balanceNumber.toFixed(2);

  try {
    // GO TO ACCOUNT THAT YOU WANT TO TRANSFER
    const accountFrom = await Account.getAccountById(accountIDFrom);
    const balanceFrom = accountFrom.balance;

    const minusBalance = Number(balanceFrom) - balanceDecimal;
    const addBalance = balanceDecimal;

    if (minusBalance >= 0) {
      await Account.updateBalance(accountIDFrom, minusBalance);
      const account = await Account.createAccount(
        accountNumber,
        type,
        addBalance,
        sharedAccount,
        currency
      );
      const accountID = account._id;
      await UserAccount.createUserAccount(userID, accountID, primary);

      if (sharedAccount) {
        const sharedAccountUser = await User.getUserByPhoneNumber(sharedUser);
        const sharedUserID = sharedAccountUser._id;
        const userName = sharedAccountUser.name;

        if (sharedAccountUser) {
          await UserAccount.createUserAccount(sharedAccountUser, accountID, primary);
          res.json({ result: true, sharedUserID, userName });
        } else {
          res.json({ result: false, message: 2 });
        }
      } else {
        res.json({ result: true });
      }
    } else {
      res.json({ result: false, message: 0 });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Returning all ID's of the accounts of the user, including non active
router.get('/:userID/user-accounts', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const accounts = await UserAccount.getUserAllAccounts(userID);
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
});

router.post('/update-primary-account', RouteGuard, async (req, res, next) => {
  const { oldAccount, newAccount } = req.body;

  try {
    await UserAccount.updatePrimaryAccount(oldAccount, false);
    await UserAccount.updatePrimaryAccount(newAccount, true);

  } catch (error) {
    next(error);
  }
});

router.post('/add-user-to-account', RouteGuard, async (req, res, next) => {
  const { accountID, userID } = req.body;

  try {
    await Account.updateShared(accountID);
    await UserAccount.createUserAccount(userID, accountID, false);
  } catch (error) {
    next(error);
  }
});

// Get all the accounts from the user logged in
router.get('/:userID/accounts', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const accountsUser = await UserAccount.getUserActiveAccounts(userID);
    res.json({ accountsUser });
  } catch (error) {
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
    res.json({ result: 'sucess' });
  } catch (error) {
    next(error);
    res.json({ result: 'error' });
  }
});

module.exports = router;
