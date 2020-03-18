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

schema.statics.getUserActiveAccounts = async function(userID) {
  const Model = this;
  const userAccount = await Model.find(
    { $and:[ { userID}, { status : 'Active' } ]}
    ).populate('accountID').exec();

  return userAccount;
};

schema.statics.getUserAllAccounts = async function(userID) {
  const Model = this;
  const userAccount = await Model.find({
    userID
  })
  .select({ accountID: 1, _id: 0 })
  .exec();

  return userAccount;
};

schema.statics.removeAccount = async function(accountID) {
  const Model = this;
  const filter = { accountID };
  const update = { status: 'NoActive' };
  const removedAccount = await Model.updateOne(filter, update).exec();
  console.log("removeddd", removedAccount);

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
