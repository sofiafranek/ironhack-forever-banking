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
  current: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  type: {
    type: String
  },
  minimumPayment: {
    type: Number
  },
  creditType: {
    type: String
  },
  reason: {
    type: String,
    enum: ['Increase Credit Score', 'Better Protection for Payments'],
    required: true
  },
  apr: {
    type: Number,
    default: 0.03
  },
  debt:{
    type: Number,
    default: 0
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
  datePayment: {
    type: Date,
    required: true
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'NoActive'],
    default: 'Active'
  },
  option: {
    type: String,
    enum: ['minimum', 'total'],
    required: true
  },
  currency: {
    type: String,
    enum: ['CAD',
    'HKD',
    'ISK',
    'PHP',
    'DKK',
    'HUF',
    'CZK',
    'GBP',
    'RON',
    'SEK',
    'IDR',
    'INR',
    'BRL',
    'RUB',
    'HRK',
    'JPY',
    'THB',
    'CHF',
    'EUR',
    'MYR',
    'BGN',
    'TRY',
    'CNY',
    'NOK',
    'NZD',
    'ZAR',
    'USD',
    'MXN',
    'SGD',
    'AUD',
    'ILS',
    'KRW',
    'PLN'],
    required: true
  }
});

schema.statics.getCreditAccounts = async function(userID) {
  const Model = this;
  const userAccount = await Model.find({ $and: [{ userID }, { status: 'Active' }] });

  return userAccount;
};

schema.statics.getCreditAccountById = async function(id) {
  const Model = this;
  const credit = await Model.findById(id);
  return credit;
};

schema.statics.getAccountById = async function(id) {
  const Model = this;
  const account = await Model.findById(id);
  return account;
};

schema.statics.getUser = async function(id) {
  const Model = this;
  const card = await Model.findById(id).populate('userID').select({ userID: 1});
  return card;
};

schema.statics.createCreditAccount = async function(
  accountNumber,
  type,
  current,
  limit,
  minimumPayment,
  userID,
  outstanding,
  otherCredit,
  finanacialSupport,
  children,
  maritalStatus,
  income,
  occupation,
  reason,
  option,
  datePayment,
  currency
) {
  const Model = this;
  const account = await Model.create({
    accountNumber,
    type,
    current,
    limit,
    minimumPayment,
    userID,
    outstanding,
    otherCredit,
    finanacialSupport,
    children,
    maritalStatus,
    income,
    occupation,
    reason,
    option,
    datePayment,
    currency
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
  });
  return account;
};

schema.statics.updateCurrent = async function(id, current) {
  const Model = this;
  await Model.findByIdAndUpdate(id, { current });
};

schema.statics.updateCredit = async function(id, datePayment, current, debt) {
  const Model = this;
  await Model.findByIdAndUpdate(id, { datePayment, current, debt });
};

schema.statics.getAccountByNumber = async function(accountNumber) {
  const Model = this;
  const account = await Model.findOne({ accountNumber });
  return account;
};


module.exports = mongoose.model('Credit', schema);
