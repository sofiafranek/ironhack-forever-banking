'use strict';

const { Router } = require('express');

const Account = require('./../database/models/account');
const UserAccount = require('./../database/models/userAccount');
const Card = require('./../database/models/card');
const User = require('./../database/models/user');
const Credit = require('./../database/models/credit');
const Notification = require('./../database/models/notification');
const getSymbolFromCurrency = require('currency-symbol-map');
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

router.post('/topUpAccount', RouteGuard, async (req, res, next) => {
  const { balance, accountID } = req.body;
  const numberBalance = Number(balance);

  try {
    const account = await Account.getAccountById(accountID);
    const currentBalance = account.balance;
    const newBalance = currentBalance + numberBalance;
    await Account.updateBalance(accountID, newBalance);
    res.json({ result: true });
  } catch (error) {
    console.log(error);
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
  const balanceDecimal = balanceNumber;

  try {
    const account = await Account.createAccount(
      accountNumber,
      type,
      balanceDecimal,
      sharedAccount,
      currency
    );
    const accountID = account._id;
    const userIDFrom = req.user._id;
    const userNameFrom = req.user.name;

    await UserAccount.createUserAccount(userID, accountID, primary);

    if (sharedAccount) {
      const existUser = await User.getUserByPhoneNumber(sharedUser);
      if (existUser) {

        const sharedUserID = existUser._id;
        const userName = existUser.name;
        await UserAccount.createUserAccount(sharedUserID, accountID, false);
        const messageTo = `${userNameFrom} created a ${type} shared account with you with ${balance}${getSymbolFromCurrency(currency)}`;
        const messageFrom = `You just created a ${type} shared account with ${userName} with ${balance}${getSymbolFromCurrency(currency)}`;

        await Notification.createNotification(
          userIDFrom, sharedUserID, messageFrom, messageTo
        );
        res.json({ result: true, type, accountID });
      } else {
        res.json({ result: false, message: 2 });
      }
    } else {
      const messageFrom = `You just created a ${type} account with ${balance}${getSymbolFromCurrency(currency)}`;
        const message = '';
        await Notification.createNotification(
          userIDFrom, null, messageFrom, message
        );
      res.json({ result: true, type, accountID });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/create-account-internal', async (req, res, next) => {
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
  const balanceDecimal = balanceNumber;
  try {
    // GO TO ACCOUNT THAT YOU WANT TO TRANSFER
    let accountFrom = await Account.getAccountById(accountIDFrom);
    let balanceFrom = 0, accounttype = true;

    if (!accountFrom) {
      accountFrom = await Credit.getAccountById(accountIDFrom);
      balanceFrom = accountFrom.current;
      accounttype = false;
    } else {
      balanceFrom = accountFrom.balance;
    }

    const minusBalance = Number(balanceFrom) - balanceDecimal;
    const addBalance = balanceDecimal;
    if (minusBalance >= 0) {
      (accounttype) ? await Account.updateBalance(accountIDFrom, minusBalance) : Credit.updateCurrent(accountIDFrom, minusBalance);
      
      const account = await Account.createAccount(
        accountNumber,
        type,
        addBalance,
        sharedAccount,
        currency
      );
      const accountID = account._id;
      const userIDFrom = req.user._id;
      const userNameFrom = req.user.name;

      await UserAccount.createUserAccount(userID, accountID, primary);

      if (sharedAccount) {
        const sharedAccountUser = await User.getUserByPhoneNumber(sharedUser);
        const sharedUserID = sharedAccountUser._id;
        const userName = sharedAccountUser.name;

        if (sharedAccountUser) {
          await UserAccount.createUserAccount(sharedAccountUser, accountID, primary);
          const messageTo = `${userNameFrom} created a ${type} shared account with you with ${balance}${getSymbolFromCurrency(currency)}`;
          const messageFrom = `You just created a ${type} shared account with ${userName} with ${balance}${getSymbolFromCurrency(currency)}`;

          await Notification.createNotification(
            userIDFrom, sharedUserID, messageFrom, messageTo
          );
          res.json({ result: true, sharedUserID, userName });
        } else {
          res.json({ result: false, message: 2 });
        }
      } else {
        const messageFrom = `You just created a ${type} account with ${balance}${getSymbolFromCurrency(currency)}`;
        const message = '';
        await Notification.createNotification(
          userIDFrom, null, messageFrom, message
        );
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
    res.json({ result : true });
  } catch (error) {
    next(error);
  }
});

router.post('/add-user-to-account', RouteGuard, async (req, res, next) => {
  const { phoneNumber, account } = req.body;
  try {

    const user = await User.getUserByPhoneNumber(phoneNumber);
    if (user) {
      const userID = user._id;
      const accountID = account._id;

      await Account.updateShared(accountID);
      await UserAccount.createUserAccount(userID, accountID, false);

      const userIDTo = user._id;
      const userNameTo = user.name;
      const userIDFrom = req.user._id;
      const userNameFrom = req.user.name;

      const messageTo = `${userNameFrom} started to share an account with you`;
      const messageFrom = `You just stated to share an account with ${userNameTo}`;

      await Notification.createNotification(
        userIDFrom, userIDTo, messageFrom, messageTo
      );

      res.json({ result : true });
    } else {
      res.json({ result : false });
    }

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

router.get('/:userID/accountsAndCards', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const accountsUser = await UserAccount.getUserActiveAccounts(userID);
    const accounts = [];
    for (const acc of accountsUser) {
      const card = await Card.getCardByAccountID(acc.accountID._id);
      const information = {
        acc,
        card
      };
      accounts.push(information);
    }
    res.json({ accounts });
  } catch (error) {
    next(error);
  }
});

// Get all the accounts from the user logged in
router.get('/:userID/linked-accounts', RouteGuard, async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const accountsUser = await UserAccount.getUserActiveAccounts(userID);
    const sharedAccounts = [];

    for (const account of accountsUser) {
      const user = await UserAccount.getSharedUser(account.accountID._id, userID);
      const information = {
        user: user[0]
      };     
      if (account.accountID.shared) {
        information.account = account;
        sharedAccounts.push(information);
      }
    }
    res.json({ sharedAccounts });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Deletes specific account using the ID
router.post('/:id/delete-account', RouteGuard, async (req, res, next) => {
  const idAccount = req.params.id;
  try {
    await Account.removeAccount(idAccount);
    await UserAccount.removeAccount(idAccount);
    await Card.removeCardAccount(idAccount);
    res.json({ result: 'sucess' });
  } catch (error) {
    res.json({ result: 'error' });
    next(error);
  }
});

module.exports = router;
