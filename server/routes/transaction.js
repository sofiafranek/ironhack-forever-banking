'use strict';

const { Router } = require('express');
const fetch = require("node-fetch");
const Transaction = require('./../database/models/transaction');
const Account = require('./../database/models/account');
const UserAccount = require('./../database/models/userAccount');
const User = require('./../database/models/user');
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
    colorCategory
  } = req.body;

  try {
    const accountFrom = await Account.getAccountById(accountIDFrom);
    const balanceFrom = accountFrom.balance;
    const accountTo = await Account.getAccountByNumber(accountNumber);

    if (accountTo) {
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
        const exchange = Number.parseFloat(totalAmount * rates[accountTo.currency]).toFixed(3);
        addBalance = Number(balanceTo) + Number(exchange);
      }

      const user = await UserAccount.getAccountUser(accountIDTo);
      const userID = user._id;
      const userName = user.name;

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
          colorCategory
        );

        await Account.updateBalance(accountIDFrom, minusBalance);
        await Account.updateBalance(accountIDTo, addBalance);
  
        // Success message
        res.json({ result: true,  userID, userName});
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
  console.log(req.body);
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
    phoneNumber
  } = req.body;

  try {
    const accountFrom = await Account.getAccountById(accountIDFrom);
    const balanceFrom = accountFrom.balance;
    
    const user = await User.getUserByPhoneNumber(phoneNumber);
    if (user) {
      const userID = user._id;
      const userName = user.name;
      const accountTo = await UserAccount.getUserPrimaryAccount(userID);

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
          colorCategory
        );

        await Account.updateBalance(accountIDFrom, minusBalance);
        await Account.updateBalance(accountIDTo, addBalance);
  
        // Success message
        res.json({ result: true , userID, userName});
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

router.post('/add-list-transactions', async (req, res, next) => {
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
        dateTransaction
      } = transaction;

      const accountTo = await Account.getAccountByNumber(accountNumber);
      const accountIDTo = accountTo._id;

      await Transaction.createTransaction(
        accountIDFrom,
        accountIDTo,
        totalAmount,
        reference,
        endPoint,
        category,
        schedule,
        status,
        dateTransaction
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
