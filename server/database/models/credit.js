'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accountNumber: {
    type: String,
    trim: true
  },
  balance: {
    type: Number
  },
  income: {
    type: Number
  },
  type: {
    type: String
  },
  Credittype: {
    type: String,
    enum: ['Investment', 'Mortgage', 'Car', 'Buying Goods']
  },
  apr: {
    type: Number
  },
  occupation: {
    type: String,
    enum: [
      'Computers & Technology',
      'Health Care & Allied Health',
      'Education & Social Services',
      'Art & Communications',
      'Trade & Transportation',
      'Management, Business & Finance',
      'Architecture & Civial Engineering',
      'Science',
      'Hospitality, Tourism & Service Industry',
      'Law & Law Enforcement',
      'Other'
    ]
  },
  financialSupport: {
    type: Boolean
  },
  outstandingLoans: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed']
  },
  status: {
    type: String,
    enum: ['Active', 'NoActive'],
    default: 'Active'
  }
});

schema.statics.updateBalance = async function(id, balance) {
  const Model = this;
  await Model.findByIdAndUpdate(id, { balance }).exec();
};

schema.statics.getCreditAccounts = async function(userID) {
  const Model = this;
  const accounts = await Model.find(userID, { status: 'Active' }).exec();
  return accounts;
};

schema.statics.getCreditAccountById = async function(id) {
  const Model = this;
  const account = await Model.findById(id).exec();
  return account;
};

schema.statics.getCreditAccountByNumber = async function(accountNumber) {
  const Model = this;
  const account = await Model.findOne({ accountNumber }).exec();
  return account;
};

schema.statics.createCreditAccount = async function(accountNumber, type, balance) {
  const Model = this;
  const account = await Model.create({
    accountNumber,
    type,
    balance
  });
  return account;
};

schema.statics.removeCreditAccount = async function(id) {
  const Model = this;
  const account = await Model.findByIdAndUpdate(id, {
    accountNumber: '',
    type: '',
    createdAt: null,
    status: 'NoActive'
  }).exec();
  return account;
};

module.exports = mongoose.model('Credit', schema);
