'use strict';

const { Router } = require('express');

const Transaction = require('../models/transaction');
const Account = require('../models/account');

const router = new Router();


router.post('/add-transaction', (req, res, next) => {
  const { accountIDFrom, accountIDTo, totalAmount} = req.body;
  let balanceFrom = 0, balanceTo = 0;

  Account.findById(accountIDFrom)
  .then((account) => {
    balanceFrom = account.balance;
  })
  .catch(error => {
    console.log(error);
  });

  Account.findById(accountIDTo)
  .then((account) => {
    balanceTo = account.balance;
  })
  .catch(error => {
    console.log(error);
  });


  const minusBalance = balanceFrom - totalAmount;
  const addBalance = balanceTo + totalAmount;
  
  if (minusBalance > 0) {
    Transaction.create({
      accountIDFrom,
      accountIDTo,
      totalAmount
    })
    .then((transaction) => {
      Account.findByIdAndUpdate({accountIDFrom}, {'balance': minusBalance} )
      .then((account) => console.log(account.balance))
      .catch(error => {
        console.log(error);
      });

      Account.findByIdAndUpdate({accountIDTo}, {'balance':  addBalance} )
      .then((account) => console.log(account.balance))
      .catch(error => {
        console.log(error);
      });

      res.json({ transaction });
    })
    .catch((error) => {
      next(error);
    });
    }
  else {
    res.json('notEnoughBalance');
  }
});

router.get('/received', (req, res, next) => {
  const { accounts } = req.body;

  console.log(accounts);

  console.log(accounts.split(""));


  Transaction.find({ 'accountIDTo' : 0 })
  .then((transactions) => {
    res.json({ transactions });
  })
  .catch((error) => {
    next(error);
  });

});

router.get('/sent', (req, res, next) => {
  const { accounts } = req.body;

  console.log(accounts);

  console.log(accounts.join(""));

  Transaction.find({ 'accountIDFrom' : 0 })
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
