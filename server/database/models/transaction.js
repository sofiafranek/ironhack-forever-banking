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
  creditFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Credit'
  },
  creditTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Credit'
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
      'Childcare and School Costs',
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
    enum: ['Week', 'Month', 'Year', 'None']
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
  accFrom,
  accTo,
  totalAmount,
  reference,
  endPoint,
  category,
  schedule,
  status,
  dateTransaction,
  colorCategory,
  typeAccFrom,
  typeAccTo,
  schedulePeriod
) {
  const Model = this;


  let creditFrom = null, creditTo = null, accountIDFrom = null, accountIDTo = null;
  (typeAccFrom === 'Credit') ? creditFrom = accFrom : accountIDFrom = accFrom;
  (typeAccTo === 'Credit') ? creditTo = accTo : accountIDTo = accTo;

  const transaction = await Model.create({
    creditTo,
    creditFrom,
    accountIDFrom,
    accountIDTo,
    totalAmount,
    reference,
    endPoint,
    category,
    schedule,
    status,
    dateTransaction,
    colorCategory,
    schedulePeriod
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
    .populate('creditFrom')
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
    .populate('creditFrom')
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
    .populate('creditFrom')
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
    .populate('creditFrom')
    .exec();

  return allTransactions;
};

module.exports = mongoose.model('Transaction', schema);
