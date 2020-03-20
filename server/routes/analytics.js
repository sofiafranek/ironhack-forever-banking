'use strict';

const { Router } = require('express');

const RouteGuard = require("./../middleware/route-guard");
const Transaction = require('./../database/models/transaction');
const router = new Router();

router.post('/all', RouteGuard, async (req, res, next) => {
  console.log(req.body);
  try {
    const accounts = req.body.map(value => value.accountID);
    console.log(accounts);
    const outcomes = await Transaction.getOutcomes(accounts);
    res.json({ outcomes });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/category', RouteGuard, async (req, res, next) => {
  try {
    const exp = ['5e74ef2038a66d7ed5191f3b'];
    const transactionsCategory = await Transaction.getSentTransactionsMonth(exp);
    res.json({ transactionsCategory });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
