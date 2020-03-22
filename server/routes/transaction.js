'use strict';

const { Router } = require('express');
const fetch = require("node-fetch");
const Transaction = require('./../database/models/transaction');
const Account = require('./../database/models/account');
const UserAccount = require('./../database/models/userAccount');
const User = require('./../database/models/user');
const Credit = require('./../database/models/credit');
const Notification = require('./../database/models/notification');
const getSymbolFromCurrency = require('currency-symbol-map');
const router = new Router();

// User can add a transaction
router.post('/add-transaction', async (req, res, next) => {
  const {
    accountIDFrom,
    accountNumber,
    totalAmount,
    reference,
    endPoint,
    category,
    schedule,
    status,
    dateTransaction,
    colorCategory,
    type
  } = req.body;

  try {
    let balanceFrom = 0, accountFrom = null;
    if (type === 'Credit') {
      accountFrom = await Credit.getCreditAccountById(accountIDFrom);
      balanceFrom = accountFrom.current;
    }
    else {
      accountFrom = await Account.getAccountById(accountIDFrom);
      balanceFrom = accountFrom.balance;
    }
    
    let accountTo = null, typeAccTo = 'Account', userTo = null;
    accountTo = await Account.getAccountByNumber(accountNumber);

    if (!accountTo) {
      accountTo = await Credit.getAccountByNumber(accountNumber);
      typeAccTo = 'Credit';
    }
    const accountIDTo = accountTo._id;

    if (accountTo) {
      let balanceTo = 0;
      if (typeAccTo === 'Credit') {
        balanceTo = accountTo.current;
        userTo = await Credit.getUser(accountIDTo);
      }
      else {
        balanceTo = accountTo.balance;
        userTo = await UserAccount.getUser(accountIDTo);
      }

      const userIDTo = userTo.userID._id;
      const userNameTo = userTo.userID.name;
      const userIDFrom = req.user._id;
      const userNameFrom = req.user.name;
      const currencyFrom = accountFrom.currency; 
      const currencyTo = accountTo.currency;
      const minusBalance = Number(balanceFrom) - Number(totalAmount);
      let addBalance = 0;

      if (accountFrom.currency === accountTo.currency) { 
        addBalance = Number(balanceTo) + Number(totalAmount);
      } else {
        const api = `https://api.exchangeratesapi.io/latest?base=${accountFrom.currency}`;
        const results = await fetch(api);
        const resultsJSON = await results.json();
        const rates = resultsJSON.rates;
        const exchange = Number.parseFloat(totalAmount * rates[accountTo.currency]).toFixed(3);
        addBalance = Number(balanceTo) + Number(exchange);
      }

      if (minusBalance >= 0) {

        await Transaction.createTransaction(
          accountIDFrom,
          accountIDTo,
          totalAmount,
          reference,
          endPoint,
          category,
          schedule,
          status,
          dateTransaction,
          colorCategory,
          type,
          typeAccTo,
          'None'
        );

        (type === 'Credit') ? await Credit.updateCurrent(accountIDFrom, minusBalance) : await Account.updateBalance(accountIDFrom, minusBalance);
        (typeAccTo === 'Credit') ? await Credit.updateCurrent(accountIDTo, addBalance) : await Account.updateBalance(accountIDTo, addBalance);
  
        // Success message

        const messageTo = `${userNameFrom} sent you ${totalAmount}${getSymbolFromCurrency(currencyTo)} for ${category}`;
        const messageFrom = `You just sent ${totalAmount}${getSymbolFromCurrency(currencyFrom)} to ${userNameTo} for ${category}`;

        await Notification.createNotification(
          userIDFrom, userIDTo, messageFrom, messageTo
        );

        res.json({ result: true });
      }
      else {
        res.json({ result : false, message: 0});
      }
    }
    else {
      // Insuccess message 
      res.json({ result : false, message: 1});
    }
  } catch (error) {
    console.log(error);
    // Insuccess message 
    next(error);
  }
});

// User can add a transaction
router.post('/add-transaction-phone', async (req, res, next) => {
  const {
    accountIDFrom,
    totalAmount,
    reference,
    endPoint,
    category,
    schedule,
    status,
    dateTransaction,
    colorCategory,
    phoneNumber,
    type
  } = req.body;

  try {
    let balanceFrom = 0, accountFrom = null;
    if (type === 'Credit') {
      accountFrom = await Credit.getCreditAccountById(accountIDFrom);
      balanceFrom = accountFrom.current;
    }
    else {
      accountFrom = await Account.getAccountById(accountIDFrom);
      balanceFrom = accountFrom.balance;
    }
    
    const userTo = await User.getUserByPhoneNumber(phoneNumber);
    if (userTo) {
      const userIDTo = userTo._id;
      const userNameTo = userTo.name;
      const userIDFrom = req.user._id;
      const userNameFrom = req.user.name;
      const accountTo = await UserAccount.getUserPrimaryAccount(userIDTo);
      const currencyFrom = accountFrom.currency; 
      const currencyTo = accountTo.currency;
      const balanceTo = accountTo.balance;
      const accountIDTo = accountTo._id;
      const minusBalance = Number(balanceFrom) - Number(totalAmount);
      let addBalance = 0;
      
      if (accountFrom.currency === accountTo.currency) { 
        addBalance = Number(balanceTo) + Number(totalAmount);
      } else {
        const api = `https://api.exchangeratesapi.io/latest?base=${accountFrom.currency}`;
        const results = await fetch(api);
        const resultsJSON = await results.json();
        const rates = resultsJSON.rates;
        const exchange = Number.parseFloat(totalAmount * rates[accountTo.currency]).toFixed(2);
        addBalance = Number(balanceTo) + Number(exchange);
      }

      if (minusBalance >= 0) {

        await Transaction.createTransaction(
          accountIDFrom,
          accountIDTo,
          totalAmount,
          reference,
          endPoint,
          category,
          schedule,
          status,
          dateTransaction,
          colorCategory,
          type,
          'Current',
          'None'
        );

        (type === 'Credit') ? await Credit.updateCurrent(accountIDFrom, minusBalance) : await Account.updateBalance(accountIDFrom, minusBalance);

        await Account.updateBalance(accountIDTo, addBalance);

        const messageTo = `${userNameFrom} sent you ${totalAmount}${getSymbolFromCurrency(currencyTo)} for ${category}`;
        const messageFrom = `You just sent ${totalAmount}${getSymbolFromCurrency(currencyFrom)} to ${userNameTo} for ${category}`;

        await Notification.createNotification(
          userIDFrom, userIDTo, messageFrom, messageTo
        );
  
        // Success message
        res.json({ result: true });
      } else {
        res.json({ result : false, message: 0});
      }
    }
    else {
      res.json({ result : false, message: 2});
    }
  } catch (error) {
    console.log(error);
    // Insuccess message 
    next(error);
  }
});


router.post('/received', async (req, res, next) => {
  try {
    const transactions = req.body.map(value => value.accountID);
    const transactionsTo = await Transaction.getReceivedTransactions(transactions);
    res.json({ transactionsTo });
  } catch (error) {
    next(error);
  }
});

router.post('/sent', async (req, res, next) => {
  try {
    const transactions = req.body.map(value => value.accountID);
    const transactionsFrom = await Transaction.getSentTransactions(transactions);
    res.json({ transactionsFrom });
  } catch (error) {
    next(error);
  }
});

router.get('/:idAccount/allTransactionsAccount', async (req, res, next) => {
  const idAccount = req.params.idAccount;
  try {
    const allTransactions = await Transaction.getAllTransactionsAccount(idAccount);
    res.json({ allTransactions });
  } catch (error) {
    next(error);
  }
});

router.post('/all', async (req, res, next) => {
  try {
    const accounts = req.body.map(value => value.accountID);
    const allTransactions = await Transaction.getAllTransactions(accounts);
    res.json({ allTransactions });
  } catch (error) {
    next(error);
  }
});

router.post('/add-list-transactions-account', async (req, res, next) => {
  const all = req.body;
  try {
    for (const transaction of all) {
      const {
        accountIDFrom,
        accountNumber,
        totalAmount,
        reference,
        endPoint,
        category,
        schedule,
        status,
        dateTransaction,
        colorCategory,
        type,
        schedulePeriod
      } = transaction;

      let accountFrom = null, accountTo = null, typeAccTo = 'Account';

      if (type === 'Credit') {
        accountFrom = await Credit.getCreditAccountById(accountIDFrom);
      }
      else {
        accountFrom = await Account.getAccountById(accountIDFrom);
      }

      accountTo = await Account.getAccountByNumber(accountNumber);

      if (!accountTo) {
        accountTo = await Credit.getAccountByNumber(accountNumber);
        typeAccTo = 'Credit';
      }


      await Transaction.createTransaction(
        accountFrom,
        accountTo,
        totalAmount,
        reference,
        endPoint,
        category,
        schedule,
        status,
        dateTransaction,
        colorCategory,
        type,
        typeAccTo,
        schedulePeriod
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/add-list-transactions-phone', async (req, res, next) => {
  const all = req.body;
  try {
    for (const transaction of all) {
      const {
        accountIDFrom,
        phoneNumber,
        totalAmount,
        reference,
        endPoint,
        category,
        schedule,
        status,
        dateTransaction,
        colorCategory,
        type,
        schedulePeriod
      } = transaction;

      let accountFrom = null;
      const typeAccTo = 'Account';

      if (type === 'Credit') {
        accountFrom = await Credit.getCreditAccountById(accountIDFrom);
      }
      else {
        accountFrom = await Account.getAccountById(accountIDFrom);
      }

      const user = await User.getUserByPhoneNumber(phoneNumber);
      const userID = user._id;
      const accountTo = await UserAccount.getUserPrimaryAccount(userID);

      await Transaction.createTransaction(
        accountFrom,
        accountTo,
        totalAmount,
        reference,
        endPoint,
        category,
        schedule,
        status,
        dateTransaction,
        colorCategory,
        type,
        typeAccTo,
        schedulePeriod
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Returning a transaction based on the user ID
router.get('/:id', async (req, res, next) => {
  const _id = req.params.id;
  try {
    const transaction = await Transaction.getTransactionById({ _id });
    res.json({ transaction });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
