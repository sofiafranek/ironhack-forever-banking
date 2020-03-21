'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountIDTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  accountIDFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  totalAmount: {
    type: Number
  },
  reference: {
    type: String
  },
  endPoint: {
    type: String
  },
  category: {
    type: String,
    enum: [
      'Housing',
      'Transport',
      'Food & Dining',
      'Utility Bills',
      'Cell Phone',
      'Childcare and School costs',
      'Pet Food',
      'Pet Insurance',
      'Clothing',
      'Health Insurance',
      'Fitness',
      'Auto Insurance',
      'Life Insurance',
      'Fun Stuff',
      'Travel',
      'Student Loans',
      'Credit-card Debt',
      'Retirement',
      'Emergency Fund',
      'Large Purchases',
      'Other'
    ]
  },
  colorCategory: {
    type: String,
    enum: ['info', 'success', 'primary', 'secondary', 'danger', 'warning', 'light', 'dark']
  },
  schedule: {
    type: Boolean,
    required: true
  },
  schedulePeriod: {
    type: String,
    enum: ['Hour', 'Week', 'Month', 'Year']
  },
  status: {
    type: String,
    enum: ['Executed', 'Pending', 'Failed'],
    required: true
  },
  dateTransaction: {
    type: Date
  }
});

schema.statics.getTransactions = async function() {
  const Model = this;
  const transactions = await Model.find().exec();
  return transactions;
};

schema.statics.getTransactionById = async function(id) {
  const Model = this;
  const transaction = await Model.findById(id).exec();
  return transaction;
};

schema.statics.createTransaction = async function(
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
) {
  const Model = this;
  const transaction = await Model.create({
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
  });

  return transaction;
};

schema.statics.getReceivedTransactions = async function(accounts) {
  const Model = this;
  const transactionsTo = await Model.find({
    accountIDTo: { $in: accounts },
    status: 'Executed'
  })
    .populate('accountIDTo')
    .populate('accountIDFrom')
    .exec();

  return transactionsTo;
};

schema.statics.getSentTransactions = async function(accounts) {
  const Model = this;
  const transactionsFrom = await Model.find({
    accountIDFrom: { $in: accounts },
    status: 'Executed'
  })
    .populate('accountIDTo')
    .populate('accountIDFrom')
    .exec();

  return transactionsFrom;
};

schema.statics.getOutcomes = async function(accounts) {
  const Model = this;
  const transactionsFrom = await Model.find({
    accountIDFrom: { $in: accounts },
    status: 'Executed'
  }).exec();

  return transactionsFrom;
};

schema.statics.getAllTransactions = async function(accounts) {
  const Model = this;
  const allTransactions = await Model.find({
    $or: [{ accountIDFrom: { $in: accounts } }, { accountIDTo: { $in: accounts } }],
    status: 'Executed'
  })
    .populate('accountIDTo')
    .populate('accountIDFrom')
    .exec();
  return allTransactions;
};

schema.statics.getAllTransactionsAccount = async function(idAccount) {
  const Model = this;
  const allTransactions = await Model.find({
    $or: [{ accountIDFrom: idAccount }, { accountIDTo: idAccount }],
    status: 'Executed'
  })
    .populate('accountIDTo')
    .populate('accountIDFrom')
    .exec();

  return allTransactions;
};

/*
schema.statics.getSentTransactionsMonth = async function(accounts) {
  const Model = this;
  console.log(accounts);
  const transactionsFrom = await Model.aggregate([
    {$addFields: {  "month" : {$month: '$dateTransaction'}}},
    {$match: { month: 8}}
  ]).exec();

  console.log(transactionsFrom);

  return transactionsFrom;
};*/

module.exports = mongoose.model('Transaction', schema);
