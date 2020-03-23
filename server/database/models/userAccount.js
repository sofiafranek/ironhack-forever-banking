'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  status: {
    type: String,
    enum: ['Active', 'NoActive'],
    default: 'Active'
  },
  primary: {
    type: Boolean,
    required: true
  }
});

schema.statics.createUserAccount = async function(userID, accountID, primary) {
  const Model = this;
  const userAccount = await Model.create({
    userID,
    accountID,
    primary
  });

  return userAccount;
};

schema.statics.getUserActiveAccounts = async function(userID) {
  const Model = this;
  const userAccount = await Model.find({ $and: [{ userID }, { status: 'Active' }] })
    .populate('accountID');

  return userAccount;
};

schema.statics.getUserAllAccounts = async function(userID) {
  const Model = this;
  const userAccount = await Model.find({
    userID
  })
    .select({ accountID: 1, _id: 0 });

  return userAccount;
};

schema.statics.removeAccount = async function(accountID) {
  const Model = this;
  const filter = { accountID };
  const update = { status: 'NoActive' };
  const removedAccount = await Model.updateOne(filter, update);

  return removedAccount;
};

schema.statics.getUserAccount = async function(userID) {
  const Model = this;
  const account = await Model.findOne({
    userID
  })
    .populate('accountID');

  return account;
};

schema.statics.getUser = async function(accountID) {
  const Model = this;
  const user = await Model.findOne({
    accountID
  })
    .populate('userID')
    .select({ userID: 1});

  return user;
};

schema.statics.getUserPrimaryAccount = async function(userID) {
  const Model = this;
  const account = await Model.findOne({
    $and: [{ userID }, { primary: true }]
  })
    .populate('accountID');

  return account.accountID;
};

schema.statics.updatePrimaryAccount = async function(_id, primary) {
  const Model = this;
  const update = { primary };
  const account = await Model.findByIdAndUpdate(_id, update);
  return account;
};

module.exports = mongoose.model('userAccount', schema);
