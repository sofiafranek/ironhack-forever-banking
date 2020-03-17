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
  }
});

schema.statics.createUserAccount = async function(userID, accountID) {
  const Model = this;
  const userAccount = await Model.create({
    userID,
    accountID
  });

  return userAccount;
};

schema.statics.getUserAccounts = async function(userID) {
  const Model = this;
  const userAccount = await Model.find({
    userID
  }).populate('accountID').exec();

  return userAccount;
};

schema.statics.removeAccount = async function(accountID) {
  const Model = this;
  const removedAccount = await Model.findOneAndRemove({
    accountID
  }).exec();

  return removedAccount;
};

schema.statics.getUserAccount = async function(userID) {
  const Model = this;
  const account = await Model.findOne({
    userID
  }).populate('accountID').exec();

  return account;
};

module.exports = mongoose.model('userAccount', schema);
