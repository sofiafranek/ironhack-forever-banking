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
  reference:{
    type: String
  },
  endPoint: {
    type: String
  },
  category: {
    type: String,
    enum: ['Housing', 'Transport', 'Food & Dining', 'Utility bills', 'Cell phone', 'Childcare and school costs', 'Pet food', 'Pet insurance', 'Clothing', 'Health insurance', 'Fitness', 'Auto insurance', 'Life insurance', 'Fun stuff', 'Travel', 'Student loans', 'Credit-card debt', 'Retirement', 'Emergency fund', 'Large purchases', 'Other']
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
  dateTransaction) 
  {
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
    dateTransaction
  });

  return transaction;
};

schema.statics.getReceivedTransactions = async function(transactions) {
  const Model = this;
  const transactionsTo = await Model.find({ accountIDTo: { $in: transactions }, status: 'Executed' })
  .populate('accountIDTo')
  .populate('accountIDFrom')
  .exec();

  return transactionsTo;
};

schema.statics.getSentTransactions = async function(transactions) {
  const Model = this;
  const transactionsFrom = await Model.find({ accountIDFrom: { $in: transactions }, status: 'Executed' })
  .populate('accountIDTo')
  .populate('accountIDFrom')
  .exec();

  return transactionsFrom;
};

schema.statics.getAllTransactions = async function(accounts) {
  const Model = this;
  const allTransactions = await Model.find({$or: [{ accountIDFrom: { $in: accounts } }, { accountIDTo: { $in: accounts } }], status: 'Executed' })
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


module.exports = mongoose.model('Transaction', schema);
