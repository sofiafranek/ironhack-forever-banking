'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  usertype: {
    type: String,
    enum: ['Free', 'Premium']
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

schema.statics.getUserByPhoneNumber = async function(phoneNumber) {
  const Model = this;
  const user = await Model.findOne({ phoneNumber });

  return user;
};

schema.statics.getPremiumUsers = async function() {
  const Model = this;
  const usertype = 'Premium';
  const user = await Model.find({ usertype });
  return user;
};

schema.statics.updateToPremium = async function(userID) {
  const Model = this;
  const usertype = 'Premium';
  const user = await Model.findByIdAndUpdate(userID, { usertype });
  console.log(user);
  return user;
};

module.exports = mongoose.model('User', schema);
