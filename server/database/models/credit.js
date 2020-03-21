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
  limit: {
    type: Number
  },
  current: {
    type: Number
  },
  income: {
    type: Number
  },
  minimumPayment: {
    type: Number
  },
  type: {
    type: String
  },
  creditType: {
    type: String,
    enum: 'Regular Credit'
  },
  reason: {
    type: String,
    enum: ['Increase Credit Score', 'Better Protection for Payments']
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
  currentDate: {
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
  },
  option: {
    type: String,
    enum: ['minimum', 'total']

  }
});

schema.statics.getCreditAccounts = async function(userID) {
  const Model = this;
  const userAccount = await Model.find({ $and: [{ userID }, { status: 'Active' }] })
    // .populate('accountID')
    .exec();

  return userAccount;
};

schema.statics.getCreditAccountById = async function(id) {
  const Model = this;
  const card = await Model.findById(id).exec();
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
  reason
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
    reason
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
