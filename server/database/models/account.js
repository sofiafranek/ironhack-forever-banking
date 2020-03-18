'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountNumber: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['Savings', 'Current', 'Credit']
  },
  balance: {
    type: Number
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
  }
});

schema.statics.updateBalance = async function(id, balance) {
  const Model = this;
  await Model.findByIdAndUpdate(id, { balance }).exec();
};

schema.statics.getAccounts = async function() {
  const Model = this;
  const accounts = await Model.find({ status : 'Active' }).exec();
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

schema.statics.createAccount = async function(accountNumber, type, balance, shared) {
  const Model = this;
  const account = await Model.create({
    accountNumber,
    type,
    balance,
    shared
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

module.exports = mongoose.model('Account', schema);
