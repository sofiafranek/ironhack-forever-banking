'use strict';

const { Router } = require('express');
const Transaction = require('../models/transaction');
const Account = require('../models/account');
const router = new Router();

router.post('/add-transaction', (req, res, next) => {
  const { accountIDFrom, accountNumber, totalAmount, reference, endPoint, category, schedule, status } = req.body;

  let balanceFrom = 0, balanceTo = 0, accountIDTo = '';

  Account.findById(accountIDFrom)
  .then((accountFrom) => {
    balanceFrom = accountFrom.balance;
      Account.findOne({ 'accountNumber': accountNumber })
      .then((accountTo) => {
        balanceTo = accountTo.balance;
        accountIDTo = accountTo._id;

        const minusBalance = balanceFrom - Number(totalAmount);      
        const addBalance = Number(balanceTo) + Number(totalAmount);
      
        if (minusBalance > 0) {
      
          Transaction.create({
            accountIDFrom,
            accountIDTo,
            totalAmount,
            reference,
            endPoint,
            category,
            schedule,
            status
          })
          .then((transaction) => {
            Account.findByIdAndUpdate({'_id' : accountIDFrom}, {'balance': minusBalance} )
            .then((account) => console.log(account.balance))
            .catch(error => {
              console.log(error);
            });
      
            Account.findByIdAndUpdate({'_id' : accountIDTo}, {'balance':  addBalance} )
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
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/received', (req, res, next) => {
  const transactions = req.body.map(value => value.accountID);

  Transaction.find({ accountIDTo: { $in: transactions }, status: 'Executed'})
    .populate('accountIDTo')
    .populate('accountIDFrom')
    .then(transactionsTo => {
      res.json({ transactionsTo });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sent', (req, res, next) => {
  const transactions = req.body.map(value => value.accountID);

  Transaction.find({ accountIDFrom: { $in: transactions }, status: 'Executed'})
    .populate('accountIDTo')
    .populate('accountIDFrom')
    .then(transactionsFrom => {
      res.json({ transactionsFrom });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/all', (req, res, next) => {
  const transactions = req.body.map(value => value.accountID);

  Transaction.find({
    $or: [{ accountIDFrom: { $in: transactions } }, { accountIDTo: { $in: transactions } }],
    status: 'Executed'
  })
    .populate('accountIDTo')
    .populate('accountIDFrom')
    .then(allTransactions => {
      res.json({ allTransactions });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/add-list-transactions', (req, res, next) => {

  const all = req.body;

  all.map(transaction => {
    const { accountIDFrom, accountNumber, totalAmount, reference, endPoint, category, schedule, status, dateTransaction } = transaction;

    Account.findOne({ 'accountNumber': accountNumber })
      .then((accountTo) => {
        const accountIDTo = accountTo._id;

        Transaction.create({
          accountIDFrom,
          accountIDTo,
          totalAmount,
          reference,
          endPoint,
          category,
          schedule,
          status,
          dateTransaction
        })
        .then(() => {
        })
        .catch((error) => {
          next(error);
        });
      })
      .catch(error => {
        next(error);
      });
  });

});

router.get('/:id', (req, res, next) => {
  const _id = req.params.id;

  Transaction.findById({ _id })
    .then(transaction => {
      res.json({ transaction });
    })
    .catch(error => {
      next(error);
    });
});


module.exports = router;
