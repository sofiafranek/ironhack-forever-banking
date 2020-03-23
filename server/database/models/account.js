'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountNumber: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['Savings', 'Current'],
    require: true
  },
  balance: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'NoActive'],
    default: 'Active'
  },
  shared: {
    type: Boolean
  },
  sharedName: {
    type: String
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

schema.statics.updateBalance = async function(id, balance) {
  const Model = this;
  await Model.findByIdAndUpdate(id, { balance }).exec();
};

schema.statics.getAccounts = async function() {
  const Model = this;
  const accounts = await Model.find({ status: 'Active' }).exec();
  return accounts;
};

schema.statics.getAccountById = async function(id) {
  const Model = this;
  const account = await Model.findById(id).exec();
  return account;
};

schema.statics.getAccountByNumber = async function(accountNumber) {
  const Model = this;
  const account = await Model.findOne({ accountNumber }).exec();
  return account;
};

schema.statics.createAccount = async function(accountNumber, type, balance, shared, currency, sharedName) {
  const Model = this;
  const account = await Model.create({
    accountNumber,
    type,
    balance,
    shared,
    currency,
    sharedName
  });
  return account;
};

schema.statics.removeAccount = async function(id) {
  const Model = this;
  const account = await Model.findByIdAndUpdate(id, {
    accountNumber: '',
    type: '',
    createdAt: null,
    status: 'NoActive'
  }).exec();
  return account;
};

schema.statics.updateShared = async function(id, sharedName) {
  const Model = this;
  const account = await Model.findByIdAndUpdate(id, {
    shared: true,
    sharedName
  }).exec();
  return account;
};

module.exports = mongoose.model('Account', schema);
