'use strict';

const { Router } = require('express');

const RouteGuard = require("./../middleware/route-guard");
const Transaction = require('./../database/models/transaction');
const router = new Router();

router.post('/all', RouteGuard, async (req, res, next) => {
  const { accountsID, creditsID } = req.body;
  try {
    const transactionsAcc = await Transaction.getSentTransactions(accountsID);
    const transactionsCredit = await Transaction.getSentTransactionsCredit(creditsID);
    const outcomes = transactionsAcc.concat(transactionsCredit);
    res.json({ outcomes });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;
