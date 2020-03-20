'use strict';

const { Router } = require('express');

const RouteGuard = require("./../middleware/route-guard");
const Transaction = require('./../database/models/transaction');
const router = new Router();

router.post('/all', RouteGuard, async (req, res, next) => {
  console.log(req.body);
  try {
    const accounts = req.body.map(value => value.accountID);
    const outcomes = await Transaction.getOutcomes(accounts);
    res.json({ outcomes });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;
