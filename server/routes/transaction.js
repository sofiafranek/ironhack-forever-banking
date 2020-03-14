'use strict';

const { Router } = require('express');

const Transaction = require('../models/transaction');

const router = new Router();


router.post('/add-transaction', (req, res, next) => {
  const { accountIDFrom, accountIDTo, totalAmount} = req.body;

  Transaction.create({
    accountIDFrom,
    accountIDTo,
    totalAmount
  })
  .then((transaction) => {
    res.json({ transaction });
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/:idTo/received', (req, res, next) => {
  const { idTo } = req.params;

  Transaction.find({ 'accountIDTo' : idTo })
  .then((transactions) => {
    res.json({ transactions });
  })
  .catch((error) => {
    next(error);
  });

});

router.get('/:idFrom/sent', (req, res, next) => {
  const { idFrom } = req.params;

  Transaction.find({ 'accountIDFrom' : idFrom })
  .then((transactions) => {
    res.json({ transactions });
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/:id', (req, res, next) => {
  const _id = req.params.id;

  Transaction.findById({ _id })
  .then((transaction) => {
    res.json({ transaction });
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
