'use strict';

const { Router } = require('express');

const RouteGuard = require('./../middleware/route-guard');
const Transaction = require('./../database/models/transaction');
const router = new Router();

router.post('/all', RouteGuard, async (req, res, next) => {
  const { accountsID, creditsID } = req.body;
  try {
    let transactionsAcc = [], transactionsCredit = [];
    const outcomes = [];

    for (const acc of accountsID) {
      transactionsAcc = await Transaction.getOutcomesAccount(acc._id);
      if (transactionsAcc.length > 0) outcomes.push(transactionsAcc);
    }

    for (const credit of creditsID) {
      transactionsCredit = await Transaction.getOutcomesCredit(credit);
      if (transactionsCredit.length > 0) outcomes.push(transactionsCredit);
    }

    res.json({ outcomes });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
