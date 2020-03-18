'use strict';

const { Router } = require('express');
const Transaction = require('./../database/models/transaction');
const Account = require('./../database/models/account');
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
    dateTransaction
  } = req.body;

  try {
    const accountFrom = await Account.getAccountById(accountIDFrom);
    const balanceFrom = accountFrom.balance;
    const accountTo = await Account.getAccountByNumber(accountNumber);
    const balanceTo = accountTo.balance;
    const accountIDTo = accountTo._id;
    const minusBalance = balanceFrom - Number(totalAmount);
    const addBalance = Number(balanceTo) + Number(totalAmount);

    if (minusBalance >= 0) {
      const transaction = await Transaction.createTransaction(
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

      await Account.updateBalance(accountIDFrom, minusBalance);
      await Account.updateBalance(accountIDTo, addBalance);
      
      res.json({ transaction });
    }
  } catch (error) {
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
